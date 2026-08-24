# Deployment — lohrer.dev

## Wie es aufgebaut ist (und warum so)

Auf dem VPS `178.104.124.207` (Ubuntu 24.04) laufen bereits mehrere Dienste.
Die Ports 80/443 gehören dem **Caddy-Container `lol-stats-caddy-1`**, der
zoinkr.com und chat.zoinkr.com ausliefert. Ein zweiter Webserver auf dem Host
ist damit ausgeschlossen. Außerdem hat dieser Container kein Volume für
statische Dateien — ein neues Volume würde ein Neuanlegen des Containers und
damit eine kurze Unterbrechung für zoinkr.com bedeuten.

Daraus folgt die Aufteilung:

```
Browser ──► Caddy-Container (80/443, TLS, HTTP/3)
              └── lohrer.dev  ──reverse_proxy──►  172.18.0.1:3081
                                                   (Docker-Gateway = Host)
                                                        │
                                            systemd-Dienst „lohrer-site"
                                            ├── liefert /var/www/lohrer.dev/dist
                                            └── POST /api/contact
                                                     │
                                            Mailserver-API 127.0.0.1:3080
```

- **Kein neuer Webserver, kein Container-Neustart.** Der lohrer.dev-Block wird
  in das vom Host gemountete Caddyfile geschrieben und mit `caddy reload`
  aktiviert — laufende Sites bleiben ununterbrochen online.
- **Der Node-Dienst liefert die Dateien aus**, weil Caddy sie im Container
  nicht sehen könnte. Caddy bleibt Reverse-Proxy und behält TLS, HTTP/3 und
  Kompression.
- **Bind-Adresse `172.18.0.1`** (Gateway des Caddy-Netzes): Der Container kann
  das Loopback des Hosts nicht erreichen. Die Adresse ist privat und nicht aus
  dem Internet routbar — wichtig, weil auf dem Server keine Firewall aktiv
  ist. Postfix nutzt auf derselben Maschine schon dasselbe Muster.
- **Der Browser erreicht die Mailserver-API nie direkt.** Sonst wäre der
  Bearer-Token öffentlich und Besucher könnten beliebige Empfänger setzen.

## 1. DNS bei netcup

Erledigt — `lohrer.dev` löst bereits auf `178.104.124.207` auf:

| Host  | Typ | Ziel              |
| ----- | --- | ----------------- |
| `@`   | A   | `178.104.124.207` |
| `www` | A   | `178.104.124.207` |

Das Zertifikat holt der Caddy-Container automatisch, sobald der Site-Block
aktiv ist. `.dev` ist HSTS-preloaded, also ohnehin nur HTTPS.

## 2. Einmalige Einrichtung auf dem VPS

```bash
git clone -b claude/new-session-m8e15a https://github.com/gazooo/supreme-carnival ~/lohrer.dev-repo
cd ~/lohrer.dev-repo
bash deploy/inspect-vps.sh              # rein lesend, Lagebild
bash deploy/inspect-caddy-container.sh  # rein lesend, Proxy-Details
sudo bash deploy/setup-vps.sh
```

`setup-vps.sh` ist idempotent und geht defensiv vor:

1. prüft Container, Node, freien Port 3081 und liest Caddyfile-Pfad sowie
   Gateway-IP aus der Docker-Konfiguration (statt sie zu raten),
2. installiert `server/site-server.mjs` nach `/opt/lohrer.dev/`, legt
   `/etc/lohrer-site.env` an (chmod 600) und startet den Dienst `lohrer-site`,
3. prüft, ob der Container den Dienst erreicht,
4. **sichert das Caddyfile**, ersetzt nur den eigenen Block zwischen zwei
   Markern und lässt den Rest unangetastet,
5. **validiert** die Konfiguration im Container — schlägt das fehl, wird die
   Sicherung sofort zurückgespielt und abgebrochen,
6. lädt Caddy neu (`reload`, kein `restart`).

Danach den API-Token eintragen:

```bash
sudo nano /etc/lohrer-site.env     # MAIL_API_TOKEN=… (Wert aus der .env des Mailservers)
sudo systemctl restart lohrer-site
```

Ohne Token bleibt die Website erreichbar; nur `/api/contact` antwortet mit
503, das Formular zeigt dann den E-Mail-Fallback.

## 3. Website veröffentlichen

Vom Entwicklerrechner aus. **Unter Windows/PowerShell:**

```powershell
.\deploy\publish.ps1
```

Nutzt nur Bordmittel (tar.exe, scp.exe, ssh.exe) — kein bash, kein WSL.
Achtung: `bash deploy/publish.sh` in PowerShell landet bei WSL, nicht bei
Git Bash; ist WSL kaputt, schlägt es mit `execvpe(/bin/bash) failed` fehl.

**Unter Linux/macOS oder in Git Bash:**

```bash
bash deploy/publish.sh
```

Baut das Projekt, tauscht `/var/www/lohrer.dev/dist` atomar aus (vorherige
Version bleibt als `dist.prev`) und zieht `site-server.mjs` nur nach, wenn es
sich geändert hat. Für reine Inhaltsänderungen ist kein Neustart nötig.

## 4. Nach dem Deploy prüfen

```bash
curl -I https://lohrer.dev              # 200
curl -I https://lohrer.dev/impressum    # 200
curl -I https://www.lohrer.dev          # 308 -> https://lohrer.dev
curl -I https://zoinkr.com              # unverändert erreichbar
curl -X POST https://lohrer.dev/api/contact \
  -H 'Content-Type: application/json' \
  --data '{"name":"Test","email":"test@example.com","message":"Probelauf"}'
# -> 204, Mail kommt an; Antwort geht per replyTo an die Absenderadresse
```

In PowerShell (Zeilenfortsetzung ist dort der Backtick, nicht `\`) einfacher:

```powershell
Invoke-RestMethod -Uri https://lohrer.dev/api/contact -Method Post `
  -ContentType 'application/json' `
  -Body '{"name":"Test","email":"test@example.com","message":"Probelauf"}'
```

Dienststatus: `systemctl status lohrer-site`, Logs: `journalctl -u lohrer-site -f`.

## 5. Zurückrollen

```bash
# Caddyfile: jede Änderung liegt als Sicherung daneben
ls /opt/lol-stats/deploy/Caddyfile.bak.*
cp /opt/lol-stats/deploy/Caddyfile.bak.<zeitstempel> /opt/lol-stats/deploy/Caddyfile
docker exec lol-stats-caddy-1 caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile

# Website: vorherige Version wiederherstellen
mv /var/www/lohrer.dev/dist /var/www/lohrer.dev/dist.broken
mv /var/www/lohrer.dev/dist.prev /var/www/lohrer.dev/dist

# Dienst komplett entfernen
sudo systemctl disable --now lohrer-site && sudo rm /etc/systemd/system/lohrer-site.service
```

## 6. Absenderadresse des Formulars

Die Mailserver-API erlaubt bewusst **kein** Absender-Override pro Request —
der Absender kommt aus `MAIL_FROM` in dessen `.env` und muss wegen
SPF/DKIM/DMARC-Alignment zur signierten Domain passen.

**Stand jetzt:** Versand läuft mit dem bestehenden `noreply@zoinkr.com`; die
DNS-Einträge dafür sind fertig. Funktioniert ohne weitere Arbeit.

**Wechsel auf `kontaktanfrage@lohrer.dev`:**

1. DNS bei netcup für lohrer.dev ergänzen:
   - `@ TXT "v=spf1 ip4:178.104.124.207 -all"`
   - `mail._domainkey TXT <DKIM-Public-Key>` (OpenDKIM auf dem VPS um die
     Domain erweitern; der Installer des Mailserver-Repos erhält bestehende
     Keys)
   - `_dmarc TXT "v=DMARC1; p=none; adkim=s; aspf=s; pct=100"`
2. `MAIL_FROM=kontaktanfrage@lohrer.dev` setzen, Mail-Container neu starten.
   Achtung: gilt global für alle Nutzer dieser API-Instanz — brauchen andere
   Dienste den zoinkr-Absender, eine zweite Instanz auf eigenem Port fahren.

## Wichtig: nginx nicht starten

nginx ist installiert (Konfiguration für zoinkr.com aus einer früheren
certbot-Ära), aber `inactive` und `disabled`. Ein Start würde mit dem
Caddy-Container um Port 80/443 konkurrieren. Der Zustand ist korrekt so.

## Offene Platzhalter im Code

`grep -rn "TODO" src/ index.html` — GitHub-/LinkedIn-URLs (`sameAs` und
Social-Icons), USt-IdNr. im Impressum, Publikations-URL des Essays, sowie die
E-Mail-Adresse, sobald ein @lohrer.dev-Postfach existiert.
