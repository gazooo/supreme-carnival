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
echo "-> Website aktualisiert (der Dienst liest die Dateien pro Anfrage neu,"
echo "   ein Neustart ist dafür nicht nötig)."

# site-server.mjs nur nachziehen, wenn es sich geändert hat und sudo ohne
# Passwort verfügbar ist. Die Website ist davon unabhängig bereits live.
echo "== Dienst (nur bei Änderung an site-server.mjs nötig) =="
if ssh "${SSH_TARGET}" 'sudo -n true' 2>/dev/null; then
  scp -q server/site-server.mjs "${SSH_TARGET}:/tmp/site-server.mjs"
  ssh "${SSH_TARGET}" '
    if ! sudo -n cmp -s /tmp/site-server.mjs /opt/lohrer.dev/site-server.mjs; then
      sudo -n install -m 0755 /tmp/site-server.mjs /opt/lohrer.dev/site-server.mjs
      sudo -n systemctl restart lohrer-site
      echo "   site-server.mjs aktualisiert, Dienst neu gestartet."
    else
      echo "   unverändert — kein Neustart."
    fi
    rm -f /tmp/site-server.mjs
  '
else
  echo "   Übersprungen (kein passwortloses sudo)."
fi

echo "Fertig: https://lohrer-digital.de"
