#!/usr/bin/env bash
#
# NUR LESEN — ändert nichts. Untersucht den Caddy-Container, der auf diesem
# Server 80/443 bedient, damit lohrer.dev dort sauber ergänzt werden kann.
#
#   bash deploy/inspect-caddy-container.sh
#
# Ausgabe komplett zurückgeben.
set -uo pipefail

C="${CADDY_CONTAINER:-lol-stats-caddy-1}"
hr() { printf '\n=== %s ===\n' "$1"; }

hr "Container-Basis: ${C}"
docker inspect "$C" --format 'Image:       {{.Config.Image}}
Compose-Prj: {{index .Config.Labels "com.docker.compose.project"}}
Workdir:     {{index .Config.Labels "com.docker.compose.project.working_dir"}}
Config-File: {{index .Config.Labels "com.docker.compose.project.config_files"}}
Restart:     {{.HostConfig.RestartPolicy.Name}}' 2>&1

hr "Mounts (Host -> Container)"
docker inspect "$C" --format '{{range .Mounts}}{{.Type}}  {{.Source}}  ->  {{.Destination}}  (rw={{.RW}})
{{end}}' 2>&1

hr "Netzwerke + Gateway-IP (die braucht Caddy, um den Host zu erreichen)"
docker inspect "$C" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}   ContainerIP={{$v.IPAddress}}   Gateway={{$v.Gateway}}
{{end}}' 2>&1
docker inspect "$C" --format 'ExtraHosts: {{.HostConfig.ExtraHosts}}' 2>&1

hr "Caddyfile im Container"
docker exec "$C" sh -c 'cat /etc/caddy/Caddyfile 2>/dev/null' 2>&1 |
  sed 's/\(password\|token\|secret\|key\)[[:space:]]*=*[[:space:]]*[^[:space:]]*/\1 ***REDIGIERT***/Ig'

hr "Zusätzliche Caddy-Configs im Container"
docker exec "$C" sh -c 'ls -la /etc/caddy/ 2>/dev/null' 2>&1

hr "Statische Verzeichnisse im Container"
docker exec "$C" sh -c 'ls -la /srv /var/www /usr/share/caddy 2>/dev/null' 2>&1

hr "Caddy-Version"
docker exec "$C" caddy version 2>&1

hr "Erreicht der Container den Host? (Gateway-IPs testen)"
for gw in 172.17.0.1 172.18.0.1 host.docker.internal; do
  out=$(docker exec "$C" sh -c "wget -qO- --timeout=3 http://${gw}:3080/health 2>/dev/null" 2>/dev/null)
  echo "  ${gw}:3080  -> ${out:-keine Antwort}"
done

hr "Compose-Datei auf dem Host (falls auffindbar)"
wd=$(docker inspect "$C" --format '{{index .Config.Labels "com.docker.compose.project.working_dir"}}' 2>/dev/null)
if [[ -n "${wd}" && -d "${wd}" ]]; then
  echo "--- ${wd}"
  ls -la "${wd}"
  cf=$(docker inspect "$C" --format '{{index .Config.Labels "com.docker.compose.project.config_files"}}' 2>/dev/null)
  [[ -f "${cf}" ]] && { echo "--- ${cf}"; sed 's/\(password\|token\|secret\|key\)[[:space:]]*[:=][[:space:]]*.*/\1: ***REDIGIERT***/Ig' "${cf}"; }
fi

hr "nginx-Status (darf NICHT gestartet werden — Portkonflikt)"
echo "aktiv:     $(systemctl is-active nginx 2>/dev/null)"
echo "beim Boot: $(systemctl is-enabled nginx 2>/dev/null)"

hr "Port 3081 (für den Contact-Relay)"
ss -ltn '( sport = :3081 )' | tail -n +2 | grep -q . && echo "BELEGT!" || echo "frei"

printf '\n=== ENDE — bitte komplette Ausgabe zurückgeben ===\n'
