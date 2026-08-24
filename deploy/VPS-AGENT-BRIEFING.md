# Auftrag für einen Agenten auf dem VPS (lohrer.dev ausliefern)

Auf dem Server liegt bereits Claude Code (`~/.claude`, `CLAUDE.md`). Diesen
Text dort als Auftrag einfügen — er ist so geschrieben, dass der laufende
Betrieb nicht angetastet wird.

---

Du arbeitest auf dem produktiven VPS `178.104.124.207` (Ubuntu 24.04). Auf
dieser Maschine laufen bereits ein Send-only-Mailserver, ein Docker-Stack und
PM2-Prozesse. **Diese dürfen unter keinen Umständen gestört werden.**

**Ziel:** Die statische Website aus dem Repo
`https://github.com/gazooo/supreme-carnival` (Branch
`claude/new-session-m8e15a`) unter `https://lohrer.dev` ausliefern, inklusive
des Endpunkts `POST /api/contact` für das Kontaktformular.

## Regeln

1. **Erst lesen, dann handeln.** Führe zuerst `bash deploy/inspect-vps.sh` aus
   und werte die Ausgabe aus. Ändere nichts, bevor klar ist, wer Port 80/443
   bedient.
2. **Nichts Bestehendes ersetzen.** Läuft dort bereits ein Reverse-Proxy
   (nginx, Traefik, Caddy, ein Docker-Container), wird lohrer.dev **dort als
   zusätzliche Site ergänzt** — kein zweiter Webserver, keine Übernahme der
   Ports, keine Deinstallation.
3. **Jede Konfigurationsdatei vor Änderung sichern** (`cp datei datei.bak.$(date +%s)`)
   und die Config **validieren**, bevor ein Dienst neu geladen wird
   (`caddy validate` / `nginx -t`). Bei Fehler: zurückrollen und melden.
4. **Reload statt Restart**, wo möglich — laufende Verbindungen nicht kappen.
5. Melde am Ende exakt, welche Dateien du angelegt oder geändert hast.

## Umsetzung

```bash
git clone -b claude/new-session-m8e15a https://github.com/gazooo/supreme-carnival ~/lohrer.dev-repo
cd ~/lohrer.dev-repo
bash deploy/inspect-vps.sh          # rein lesend
```

**Fall A — 80/443 sind frei oder es läuft bereits Caddy:**

```bash
sudo bash deploy/setup-vps.sh
```

Das Skript bricht von selbst ab, wenn ein fremder Webserver lauscht.

**Fall B — es läuft nginx/Traefik/anderes:** `deploy/Caddyfile` ist die
Vorlage. Übertrage sie in die vorhandene Proxy-Konfiguration. Gebraucht wird
nur:

- statisches Verzeichnis `/var/www/lohrer.dev/dist` unter `lohrer.dev`
  ausliefern (SPA: `/impressum` und `/datenschutz` existieren als eigene
  `index.html`, es braucht **keine** Catch-all-Rewrite-Regel),
- `location /api/contact` → `proxy_pass http://127.0.0.1:3081;`,
- `www.lohrer.dev` → Redirect auf `https://lohrer.dev`,
- Zertifikat für lohrer.dev über den bestehenden Mechanismus (certbot o. ä.).

Zusätzlich in beiden Fällen den Contact-Relay einrichten (nur wenn Port 3081
frei ist — sonst melden und stoppen):

```bash
sudo install -m 0755 server/contact-relay.mjs /opt/lohrer.dev/contact-relay.mjs
sudo install -m 0644 deploy/contact-relay.service /etc/systemd/system/
# /etc/contact-relay.env anlegen (chmod 600), NICHT überschreiben falls vorhanden:
#   MAIL_API_TOKEN=<derselbe Wert wie MAIL_API_TOKEN in der .env des Mailservers>
#   CONTACT_TO=maltelohrer1990@hotmail.de
sudo systemctl daemon-reload && sudo systemctl enable --now contact-relay
```

## Abnahme

```bash
curl -I https://lohrer.dev                 # 200
curl -I https://lohrer.dev/impressum       # 200
curl -I https://www.lohrer.dev             # 308 -> https://lohrer.dev
curl -X POST https://lohrer.dev/api/contact -H 'Content-Type: application/json' \
  --data '{"name":"Test","email":"test@example.com","message":"Probelauf"}'
                                           # 204, Mail kommt an
```

Danach prüfen, dass die vorher laufenden Dienste **unverändert** laufen
(`docker ps`, `pm2 list`, Mailserver-Health auf 127.0.0.1:3080).

Die Website selbst wird vom Entwicklerrechner aus hochgeladen
(`bash deploy/publish.sh`) — auf dem Server muss dafür nur
`/var/www/lohrer.dev` dem Benutzer `deploy` gehören.
