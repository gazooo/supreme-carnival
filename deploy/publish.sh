#!/usr/bin/env bash
#
# Baut die Website und lädt sie auf den VPS — nur mit ssh + tar, damit es
# auch unter Git Bash (Windows) ohne rsync funktioniert. Der Wechsel ist
# atomar (dist.new -> dist), die vorherige Version bleibt als dist.prev.
#
# Aufruf aus dem Repo-Root:
#   bash deploy/publish.sh                        # nutzt Default-Ziel
#   SSH_TARGET=user@178.104.124.207 bash deploy/publish.sh
set -euo pipefail

SSH_TARGET="${SSH_TARGET:-root@178.104.124.207}"
WEBROOT="/var/www/lohrer.dev"

echo "== Build =="
npm run build

echo "== Upload nach ${SSH_TARGET}:${WEBROOT} =="
tar czf - -C dist . | ssh "${SSH_TARGET}" "
  set -e
  mkdir -p '${WEBROOT}/dist.new'
  rm -rf '${WEBROOT}/dist.new'/*
  tar xzf - -C '${WEBROOT}/dist.new'
  rm -rf '${WEBROOT}/dist.prev'
  if [ -d '${WEBROOT}/dist' ]; then mv '${WEBROOT}/dist' '${WEBROOT}/dist.prev'; fi
  mv '${WEBROOT}/dist.new' '${WEBROOT}/dist'
"

echo "== Relay aktualisieren (falls geändert) =="
scp -q server/contact-relay.mjs "${SSH_TARGET}:/opt/lohrer.dev/contact-relay.mjs" &&
  ssh "${SSH_TARGET}" 'systemctl restart contact-relay' ||
  echo "Hinweis: Relay nicht aktualisiert (Rechte/Dienst prüfen) — Website ist trotzdem live."

echo "Fertig: https://lohrer.dev"
