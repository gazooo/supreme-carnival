#!/usr/bin/env bash
#
# Einmalige Einrichtung von lohrer.dev auf dem VPS (Ubuntu 24.04):
#   - Caddy installieren (falls nicht vorhanden) und Site-Config aktivieren
#   - Contact-Relay als systemd-Dienst einrichten
#
# Aufruf als root aus dem Repo-Checkout auf dem VPS:
#   sudo bash deploy/setup-vps.sh
#
# Idempotent: mehrfaches Ausführen ist sicher (aktualisiert Config + Relay).
set -euo pipefail

DOMAIN="lohrer.dev"
WEBROOT="/var/www/${DOMAIN}"
APPDIR="/opt/${DOMAIN}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

[[ $EUID -eq 0 ]] || { echo "Bitte als root ausführen: sudo bash deploy/setup-vps.sh"; exit 1; }

echo "== 1/4 Caddy =="
if ! command -v caddy >/dev/null 2>&1; then
  # Warnen, falls ein anderer Dienst 80/443 belegt
  if ss -ltn 'sport = :80' | grep -q LISTEN || ss -ltn 'sport = :443' | grep -q LISTEN; then
    echo "WARNUNG: Port 80 oder 443 ist bereits belegt:"
    ss -ltnp 'sport = :80' 'sport = :443' || true
    echo "Caddy wird trotzdem installiert, kann aber ggf. nicht starten."
  fi
  apt-get update
  apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' |
    gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    >/etc/apt/sources.list.d/caddy-stable.list
  apt-get update
  apt-get install -y caddy
fi

echo "== 2/4 Site-Konfiguration =="
mkdir -p /etc/caddy/sites "${WEBROOT}/dist" "${APPDIR}"
install -m 0644 "${SCRIPT_DIR}/Caddyfile" "/etc/caddy/sites/${DOMAIN}.caddy"
if ! grep -qs 'import sites/\*.caddy' /etc/caddy/Caddyfile; then
  if [[ -f /etc/caddy/Caddyfile ]]; then
    cp /etc/caddy/Caddyfile "/etc/caddy/Caddyfile.bak.$(date +%s)"
    # Debian-Default-Caddyfile (Beispielseite auf :80) ersetzen, alles andere ergänzen
    if grep -qs '/usr/share/caddy' /etc/caddy/Caddyfile; then
      printf 'import sites/*.caddy\n' >/etc/caddy/Caddyfile
    else
      printf '\nimport sites/*.caddy\n' >>/etc/caddy/Caddyfile
    fi
  else
    printf 'import sites/*.caddy\n' >/etc/caddy/Caddyfile
  fi
fi
caddy validate --config /etc/caddy/Caddyfile
systemctl enable --now caddy
systemctl reload caddy
echo "Caddy aktiv. Zertifikate holt Caddy automatisch, sobald DNS auf diesen Server zeigt."

echo "== 3/4 Contact-Relay =="
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
  echo "ANGELEGT: /etc/contact-relay.env — bitte MAIL_API_TOKEN eintragen!"
fi
systemctl daemon-reload
systemctl enable --now contact-relay
systemctl restart contact-relay

echo "== 4/4 Status =="
systemctl --no-pager --lines=0 status caddy contact-relay || true
echo
echo "Fertig. Nächste Schritte:"
echo "  1. Falls noch nicht geschehen: MAIL_API_TOKEN in /etc/contact-relay.env eintragen,"
echo "     dann: systemctl restart contact-relay"
echo "  2. Website hochladen (vom Entwicklerrechner): bash deploy/publish.sh"
echo "  3. Test: curl -I https://lohrer.dev"
