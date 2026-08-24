#!/usr/bin/env bash
#
# Einmalige Einrichtung von lohrer.dev auf dem VPS (Ubuntu 24.04):
#   - prüft, ob Port 80/443 bereits von einem anderen Dienst belegt sind
#   - Caddy installieren (falls nicht vorhanden) und Site-Config aktivieren
#   - Contact-Relay als systemd-Dienst einrichten
#
# Aufruf als root aus dem Repo-Checkout auf dem VPS:
#   sudo bash deploy/setup-vps.sh
#
# Optional:
#   DEPLOY_USER=deploy   Besitzer des Webroots (Default: der sudo-Aufrufer)
#   FORCE=1              Vorprüfung auf belegte Ports übergehen
#
# Idempotent: mehrfaches Ausführen ist sicher (aktualisiert Config + Relay).
set -euo pipefail

DOMAIN="lohrer.dev"
WEBROOT="/var/www/${DOMAIN}"
APPDIR="/opt/${DOMAIN}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_USER="${DEPLOY_USER:-${SUDO_USER:-root}}"

[[ $EUID -eq 0 ]] || { echo "Bitte als root ausführen: sudo bash deploy/setup-vps.sh"; exit 1; }

echo "== 0/5 Vorprüfung: Ports 80/443 =="
listeners="$(ss -ltnp '( sport = :80 or sport = :443 )' 2>/dev/null | tail -n +2 || true)"
if [[ -n "${listeners}" ]]; then
  echo "${listeners}"
  if grep -q 'caddy' <<<"${listeners}"; then
    echo "-> Caddy lauscht bereits. lohrer.dev wird als zusätzliche Site ergänzt."
  else
    cat <<'WARN'

ABBRUCH: Auf Port 80/443 lauscht ein anderer Dienst (nginx, Apache, Traefik
oder ein Docker-Container). Eine parallele Caddy-Installation könnte nicht
binden — und im schlimmsten Fall den laufenden Betrieb stören.

Bitte erst klären, wie ausgeliefert wird. Zwei saubere Wege:
  a) lohrer.dev im bereits laufenden Reverse-Proxy als weitere Site eintragen
     (deploy/Caddyfile zeigt, was gebraucht wird: statisches dist/ ausliefern
     plus /api/contact -> 127.0.0.1:3081 proxen), oder
  b) den bestehenden Proxy bewusst ablösen.

Wenn wirklich parallel gestartet werden soll: FORCE=1 sudo bash deploy/setup-vps.sh
WARN
    [[ "${FORCE:-0}" == "1" ]] || exit 2
  fi
else
  echo "-> 80/443 sind frei."
fi

echo "== 1/5 Caddy =="
if ! command -v caddy >/dev/null 2>&1; then
  apt-get update
  apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' |
    gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    >/etc/apt/sources.list.d/caddy-stable.list
  apt-get update
  apt-get install -y caddy
else
  echo "-> Caddy ist bereits installiert: $(caddy version | head -1)"
fi

echo "== 2/5 Site-Konfiguration =="
mkdir -p /etc/caddy/sites "${WEBROOT}/dist" "${APPDIR}"
install -m 0644 "${SCRIPT_DIR}/Caddyfile" "/etc/caddy/sites/${DOMAIN}.caddy"
if ! grep -qs 'import sites/\*.caddy' /etc/caddy/Caddyfile; then
  if [[ -f /etc/caddy/Caddyfile ]]; then
    backup="/etc/caddy/Caddyfile.bak.$(date +%s)"
    cp /etc/caddy/Caddyfile "${backup}"
    echo "-> Bestehende Caddyfile gesichert: ${backup}"
    # Debian-Default-Caddyfile (Beispielseite) ersetzen, echte Configs ergänzen
    if grep -qs '/usr/share/caddy' /etc/caddy/Caddyfile; then
      printf 'import sites/*.caddy\n' >/etc/caddy/Caddyfile
    else
      printf '\nimport sites/*.caddy\n' >>/etc/caddy/Caddyfile
    fi
  else
    printf 'import sites/*.caddy\n' >/etc/caddy/Caddyfile
  fi
fi
if ! caddy validate --config /etc/caddy/Caddyfile; then
  echo "FEHLER: Caddy-Konfiguration ist ungültig — bitte prüfen (Backup s. o.)." >&2
  exit 3
fi

# Webroot dem Deploy-User geben, damit publish.sh ohne sudo hochladen kann
if id -u "${DEPLOY_USER}" >/dev/null 2>&1; then
  chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "${WEBROOT}"
  echo "-> Webroot gehört ${DEPLOY_USER}: ${WEBROOT}"
fi

systemctl enable --now caddy
systemctl reload caddy
echo "-> Caddy aktiv. Zertifikate holt Caddy automatisch, sobald DNS zeigt."

echo "== 3/5 Contact-Relay =="
if ! command -v node >/dev/null 2>&1; then
  apt-get install -y nodejs
fi
install -m 0755 "${SCRIPT_DIR}/../server/contact-relay.mjs" "${APPDIR}/contact-relay.mjs"
install -m 0644 "${SCRIPT_DIR}/contact-relay.service" /etc/systemd/system/contact-relay.service
if [[ ! -f /etc/contact-relay.env ]]; then
  cat >/etc/contact-relay.env <<'ENV'
# Token der Mailserver-API — derselbe Wert wie MAIL_API_TOKEN in der .env
# des Mailserver-Repos auf diesem Server.
MAIL_API_TOKEN=HIER_EINTRAGEN
# Zieladresse, an die Kontaktanfragen zugestellt werden.
CONTACT_TO=maltelohrer1990@hotmail.de
ENV
  chmod 600 /etc/contact-relay.env
  echo "-> ANGELEGT: /etc/contact-relay.env — bitte MAIL_API_TOKEN eintragen!"
fi

echo "== 4/5 Dienste starten =="
systemctl daemon-reload
systemctl enable --now contact-relay
systemctl restart contact-relay

echo "== 5/5 Status =="
systemctl --no-pager --lines=0 status caddy contact-relay || true
echo
echo "Fertig. Nächste Schritte:"
echo "  1. Falls noch nicht geschehen: MAIL_API_TOKEN in /etc/contact-relay.env eintragen,"
echo "     dann: sudo systemctl restart contact-relay"
echo "  2. Website hochladen (vom Entwicklerrechner): bash deploy/publish.sh"
echo "  3. Test: curl -I https://lohrer.dev"
