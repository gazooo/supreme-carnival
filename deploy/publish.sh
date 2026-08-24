#!/usr/bin/env bash
#
# Baut die Website und lädt sie auf den VPS — nur mit ssh + tar, damit es
# auch unter Git Bash (Windows) ohne rsync funktioniert. Der Wechsel ist
# atomar (dist.new -> dist), die vorherige Version bleibt als dist.prev.
#
# Aufruf aus dem Repo-Root:
#   bash deploy/publish.sh
#   SSH_TARGET=deploy@178.104.124.207 bash deploy/publish.sh
set -euo pipefail

SSH_TARGET="${SSH_TARGET:-deploy@178.104.124.207}"
WEBROOT="/var/www/lohrer.dev"

echo "== Build =="
npm run build

echo "== Upload nach ${SSH_TARGET}:${WEBROOT} =="
tar czf - -C dist . | ssh "${SSH_TARGET}" "
  set -e
  rm -rf '${WEBROOT}/dist.new'
  mkdir -p '${WEBROOT}/dist.new'
  tar xzf - -C '${WEBROOT}/dist.new'
  rm -rf '${WEBROOT}/dist.prev'
  if [ -d '${WEBROOT}/dist' ]; then mv '${WEBROOT}/dist' '${WEBROOT}/dist.prev'; fi
  mv '${WEBROOT}/dist.new' '${WEBROOT}/dist'
"
echo "-> Website aktualisiert."

# Relay nur aktualisieren, wenn passwortloses sudo verfügbar ist; sonst
# überspringen (die Website ist davon unabhängig bereits live).
echo "== Contact-Relay =="
if ssh "${SSH_TARGET}" 'sudo -n true' 2>/dev/null; then
  scp -q server/contact-relay.mjs "${SSH_TARGET}:/tmp/contact-relay.mjs"
  ssh "${SSH_TARGET}" '
    sudo -n install -m 0755 /tmp/contact-relay.mjs /opt/lohrer.dev/contact-relay.mjs
    rm -f /tmp/contact-relay.mjs
    sudo -n systemctl restart contact-relay
  '
  echo "-> Relay aktualisiert und neu gestartet."
else
  echo "-> Übersprungen (kein passwortloses sudo). Falls sich contact-relay.mjs"
  echo "   geändert hat, auf dem Server manuell nachziehen:"
  echo "   sudo install -m 0755 server/contact-relay.mjs /opt/lohrer.dev/contact-relay.mjs"
  echo "   sudo systemctl restart contact-relay"
fi

echo "Fertig: https://lohrer.dev"
