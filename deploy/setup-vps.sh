#!/usr/bin/env bash
#
# Richtet lohrer.dev auf dem VPS ein — OHNE den laufenden Betrieb zu stören.
#
# Ausgangslage (per deploy/inspect-*.sh ermittelt): Ports 80/443 gehören einem
# Caddy-Container eines fremden Projekts. Dieses Skript installiert deshalb
# KEINEN eigenen Webserver, sondern
#   1. startet einen Node-Dienst auf dem Host (Website + /api/contact) und
#   2. ergänzt das Caddyfile dieses Containers um einen lohrer.dev-Block,
#      der dorthin proxied — anschließend `caddy reload`, also ohne Neustart
#      und ohne Ausfall für die bereits laufenden Sites.
#
# Aufruf auf dem VPS aus dem Repo-Checkout:
#   sudo bash deploy/setup-vps.sh
#
# Optional:
#   CADDY_CONTAINER=lol-stats-caddy-1   anderer Container
#   DEPLOY_USER=deploy                  Besitzer des Webroots
#
# Idempotent: mehrfaches Ausführen aktualisiert nur.
set -euo pipefail

DOMAIN="lohrer.dev"
WEBROOT="/var/www/${DOMAIN}"
APPDIR="/opt/${DOMAIN}"
ENVFILE="/etc/lohrer-site.env"
PORT=3081
CONTAINER="${CADDY_CONTAINER:-lol-stats-caddy-1}"
DEPLOY_USER="${DEPLOY_USER:-${SUDO_USER:-root}}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BEGIN_MARK="# >>> ${DOMAIN} — verwaltet von supreme-carnival/deploy >>>"
END_MARK="# <<< ${DOMAIN} <<<"

die() { echo "FEHLER: $*" >&2; exit 1; }

[[ $EUID -eq 0 ]] || die "Bitte als root ausführen: sudo bash deploy/setup-vps.sh"

echo "== 1/6 Vorprüfung =="
command -v docker >/dev/null || die "docker nicht gefunden."
docker inspect "${CONTAINER}" >/dev/null 2>&1 || die "Container '${CONTAINER}' existiert nicht."
[[ "$(docker inspect -f '{{.State.Running}}' "${CONTAINER}")" == "true" ]] ||
  die "Container '${CONTAINER}' läuft nicht."
command -v node >/dev/null || die "node nicht gefunden."

# Host-Pfad des Caddyfiles aus den Mounts des Containers lesen
CADDYFILE="$(docker inspect "${CONTAINER}" \
  --format '{{range .Mounts}}{{if eq .Destination "/etc/caddy/Caddyfile"}}{{.Source}}{{end}}{{end}}')"
[[ -n "${CADDYFILE}" && -f "${CADDYFILE}" ]] ||
  die "Caddyfile-Mount des Containers nicht gefunden — bitte manuell ergänzen (Vorlage: deploy/Caddyfile)."

# Gateway-IP des Netzes, in dem Caddy hängt — darüber erreicht der Container den Host
GATEWAY="$(docker inspect "${CONTAINER}" \
  --format '{{range .NetworkSettings.Networks}}{{.Gateway}}{{break}}{{end}}')"
[[ -n "${GATEWAY}" ]] || die "Gateway-IP des Container-Netzes nicht ermittelbar."

if ss -ltnH "( sport = :${PORT} )" | grep -q .; then
  ss -ltnp "( sport = :${PORT} )"
  die "Port ${PORT} ist bereits belegt."
fi

echo "  Container : ${CONTAINER}"
echo "  Caddyfile : ${CADDYFILE}"
echo "  Upstream  : ${GATEWAY}:${PORT}"
echo "  Webroot   : ${WEBROOT} (Besitzer: ${DEPLOY_USER})"

echo "== 2/6 Node-Dienst installieren =="
mkdir -p "${APPDIR}" "${WEBROOT}/dist"
install -m 0755 "${SCRIPT_DIR}/../server/site-server.mjs" "${APPDIR}/site-server.mjs"
id -u "${DEPLOY_USER}" >/dev/null 2>&1 && chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "${WEBROOT}"

if [[ ! -f "${ENVFILE}" ]]; then
  cat >"${ENVFILE}" <<ENV
# Bind-Adresse: Gateway des Docker-Netzes, in dem Caddy läuft (privat, nicht
# aus dem Internet routbar). Ändert sich die Docker-Netz-Konfiguration, muss
# dieser Wert angepasst werden.
RELAY_HOST=${GATEWAY}
RELAY_PORT=${PORT}
STATIC_DIR=${WEBROOT}/dist
MAIL_API_URL=http://127.0.0.1:3080/v1/send
# Token der Mailserver-API — derselbe Wert wie MAIL_API_TOKEN in dessen .env:
MAIL_API_TOKEN=HIER_EINTRAGEN
CONTACT_TO=maltelohrer1990@hotmail.de
ENV
  chmod 600 "${ENVFILE}"
  echo "  ANGELEGT: ${ENVFILE} — MAIL_API_TOKEN muss noch eingetragen werden."
else
  # Bind-Adresse nachziehen, falls sich das Docker-Netz geändert hat
  sed -i "s|^RELAY_HOST=.*|RELAY_HOST=${GATEWAY}|" "${ENVFILE}"
  echo "  ${ENVFILE} existiert bereits — nur RELAY_HOST aktualisiert."
fi

install -m 0644 "${SCRIPT_DIR}/lohrer-site.service" /etc/systemd/system/lohrer-site.service
systemctl daemon-reload
systemctl enable --now lohrer-site
systemctl restart lohrer-site
sleep 1
systemctl is-active --quiet lohrer-site || {
  journalctl -u lohrer-site -n 20 --no-pager
  die "lohrer-site startet nicht."
}
echo "  lohrer-site läuft auf ${GATEWAY}:${PORT}."

echo "== 3/6 Erreichbarkeit aus dem Container prüfen =="
# wget-Exitcode 0 = OK, 8 = HTTP-Fehlerstatus (z. B. 404 bei noch leerem Webroot).
# Beides beweist, dass die TCP-Verbindung steht; alles andere ist ein Netzproblem.
if docker exec "${CONTAINER}" sh -c \
  "wget -q -O /dev/null --timeout=5 --tries=1 http://${GATEWAY}:${PORT}/ 2>/dev/null; rc=\$?; [ \$rc -eq 0 ] || [ \$rc -eq 8 ]"; then
  echo "  Container erreicht den Dienst."
else
  echo "  WARNUNG: Container erreicht ${GATEWAY}:${PORT} nicht — Caddy könnte lohrer.dev"
  echo "  nicht ausliefern. Docker-Netz/Routing prüfen, bevor es weitergeht."
fi

echo "== 4/6 Caddyfile ergänzen =="
BACKUP="${CADDYFILE}.bak.$(date +%s)"
cp -a "${CADDYFILE}" "${BACKUP}"
echo "  Sicherung: ${BACKUP}"

# vorhandenen Block zwischen den Markern entfernen (idempotent), dann neu anhängen
TMP="$(mktemp)"
awk -v b="${BEGIN_MARK}" -v e="${END_MARK}" '
  $0 == b { skip = 1 } !skip { print } $0 == e { skip = 0 }
' "${CADDYFILE}" >"${TMP}"
{
  printf '\n%s\n' "${BEGIN_MARK}"
  sed "s|__UPSTREAM__|${GATEWAY}:${PORT}|" "${SCRIPT_DIR}/Caddyfile" | grep -v '^#' || true
  printf '%s\n' "${END_MARK}"
} >>"${TMP}"
cat "${TMP}" >"${CADDYFILE}"   # Inhalt ersetzen, Besitzer/Rechte des Mounts bleiben
rm -f "${TMP}"

echo "== 5/6 Konfiguration validieren =="
if ! VALIDATE_OUT="$(docker exec "${CONTAINER}" caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile 2>&1)"; then
  echo "${VALIDATE_OUT}" | tail -15
  cat "${BACKUP}" >"${CADDYFILE}"
  die "Caddy-Konfiguration ungültig — Sicherung wurde zurückgespielt, nichts geändert."
fi
echo "  Konfiguration gültig."

echo "== 6/6 Caddy neu laden (ohne Neustart, ohne Ausfall) =="
if ! docker exec "${CONTAINER}" caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile; then
  cat "${BACKUP}" >"${CADDYFILE}"
  docker exec "${CONTAINER}" caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile || true
  die "Reload fehlgeschlagen — Sicherung zurückgespielt."
fi

cat <<DONE

Fertig. Bereits laufende Sites (zoinkr.com, chat.zoinkr.com) wurden nicht
angefasst — es gab keinen Neustart, nur ein Reload.

Nächste Schritte:
  1. MAIL_API_TOKEN in ${ENVFILE} eintragen, dann:
     sudo systemctl restart lohrer-site
  2. Website hochladen (vom Entwicklerrechner, im Repo-Ordner):
     bash deploy/publish.sh
  3. Prüfen:
     curl -I https://${DOMAIN}
DONE
