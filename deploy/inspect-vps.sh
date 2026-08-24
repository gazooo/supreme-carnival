#!/usr/bin/env bash
#
# NUR LESEN — dieses Skript ändert nichts. Es sammelt die Fakten, die für die
# Einrichtung von lohrer.dev nötig sind, ohne den laufenden Betrieb anzufassen.
#
#   bash deploy/inspect-vps.sh            # oder: sudo bash deploy/inspect-vps.sh
#
# Ausgabe komplett kopieren und zurückgeben.
set -uo pipefail

hr() { printf '\n=== %s ===\n' "$1"; }
have() { command -v "$1" >/dev/null 2>&1; }

hr "System"
. /etc/os-release 2>/dev/null && echo "OS: ${PRETTY_NAME:-unbekannt}"
echo "Kernel: $(uname -r)"
echo "Uptime: $(uptime -p 2>/dev/null)"
echo "User:   $(id -un) (sudo: $(sudo -n true 2>/dev/null && echo 'passwortlos' || echo 'Passwort nötig'))"
have node && echo "Node:   $(node --version)" || echo "Node:   NICHT installiert"

hr "Wer lauscht auf 80 / 443 / 3080 / 3081"
if have ss; then
  sudo ss -ltnp '( sport = :80 or sport = :443 or sport = :3080 or sport = :3081 )' 2>/dev/null ||
    ss -ltn '( sport = :80 or sport = :443 or sport = :3080 or sport = :3081 )'
else
  echo "ss nicht verfügbar"
fi

hr "Installierte Webserver / Proxies"
for p in caddy nginx apache2 traefik haproxy; do
  if have "$p"; then echo "$p: $(command -v $p)"; else echo "$p: —"; fi
done

hr "Laufende Web-/Proxy-Dienste"
systemctl list-units --type=service --state=running --no-pager --no-legend 2>/dev/null |
  grep -Ei 'caddy|nginx|apache|traefik|haproxy|mail|contact' || echo "(keine Treffer)"

hr "Docker-Container mit Portbindungen"
if have docker; then
  docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' 2>/dev/null ||
    sudo docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' 2>/dev/null ||
    echo "(docker nicht abfragbar)"
else
  echo "docker: —"
fi

hr "PM2-Prozesse"
have pm2 && pm2 list 2>/dev/null || echo "pm2: —"

hr "Vorhandene Webserver-Konfiguration"
for d in /etc/caddy /etc/nginx/sites-enabled /etc/nginx/conf.d /etc/apache2/sites-enabled; do
  [[ -d "$d" ]] && { echo "--- $d"; ls -la "$d" 2>/dev/null; }
done
if [[ -f /etc/caddy/Caddyfile ]]; then
  echo "--- Inhalt /etc/caddy/Caddyfile"
  sudo cat /etc/caddy/Caddyfile 2>/dev/null || cat /etc/caddy/Caddyfile
fi

hr "Bereits ausgelieferte Domains (Zertifikate)"
sudo find /var/lib/caddy -name '*.crt' -printf '%f\n' 2>/dev/null | head -20 || true
sudo ls /etc/letsencrypt/live 2>/dev/null || true

hr "Mailserver-API"
code=$(curl -s -o /dev/null -m 5 -w '%{http_code}' http://127.0.0.1:3080/health 2>/dev/null)
echo "GET http://127.0.0.1:3080/health -> ${code:-keine Antwort}"

hr "DNS-Auflösung von lohrer.dev (vom Server aus)"
if have dig; then
  echo "A:  $(dig +short A lohrer.dev)"
  echo "NS: $(dig +short NS lohrer.dev | tr '\n' ' ')"
elif have getent; then
  getent hosts lohrer.dev || echo "(keine Auflösung)"
fi
echo "Öffentliche IP dieses Servers: $(curl -s -m 5 https://api.ipify.org 2>/dev/null || echo unbekannt)"

hr "Firewall"
have ufw && sudo ufw status 2>/dev/null | head -10 || echo "ufw: —"

hr "Speicherplatz"
df -h / /var 2>/dev/null | grep -v tmpfs

printf '\n=== ENDE — bitte komplette Ausgabe zurückgeben ===\n'
