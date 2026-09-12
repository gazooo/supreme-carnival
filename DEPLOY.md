# Deployment — lohrer-digital.de

## Domains und bestehender Betrieb

Die Hauptadresse ist `https://lohrer-digital.de`. Die Adressen
`www.lohrer-digital.de`, `lohrer.dev` und `www.lohrer.dev` werden mit HTTP 308
auf die Hauptadresse weitergeleitet. Pfad und
Query-Parameter bleiben erhalten, etwa `/projects#mercedes` oder
`/contact?source=referral` (URL-Fragmente verarbeitet der Browser).

Auf dem VPS `178.104.124.207` bedient der Caddy-Container `lol-stats-caddy-1`
weiterhin TLS und die öffentlichen Ports 80/443. Der bestehende Node-Dienst
`lohrer-site` liefert die Website und den Kontakt-Endpunkt aus:

```text
lohrer-digital.de → Caddy → 172.18.0.1:3081 → lohrer-site
                                            ├─ /var/www/lohrer.dev/dist
                                            └─ POST /api/contact → private Mailserver-API
```

Die internen Pfade `/var/www/lohrer.dev`, `/opt/lohrer.dev`, der Dienstname
`lohrer-site` und die Caddy-Marker mit `lohrer.dev` bleiben bewusst bestehen.
Der Domainwechsel erfordert keine Verlagerung der Dateien. Die Umstellung des
Kontakt-Empfängers erfolgt separat, sobald das neue Proton-Domainpostfach
empfangsbereit ist. Andere Sites des VPS werden nicht verändert.

## DNS bei netcup

Für `lohrer-digital.de` sind diese Einträge vorgesehen:

| Host  | Typ | Ziel              |
| ----- | --- | ----------------- |
| `@`   | A   | `178.104.124.207` |
| `www` | A   | `178.104.124.207` |

Die Domain muss registriert und öffentlich delegiert sein; Einträge auf den
netcup-Nameservern allein reichen nicht. Vor dem Umschalten A-Einträge sowohl
auf den autoritativen Nameservern als auch über öffentliche Resolver prüfen.
Die DNS-Einträge von `lohrer.dev` bleiben für die Weiterleitung auf dem VPS.

Laut vorgelegtem CCP-Stand wurde die Kündigung von `lohrer.dev` zum 23.08.2027
entgegengenommen. Die Weiterleitung und deren TLS-Erneuerung benötigen die alte
Domain weiterhin; nach ihrer Freigabe kann die Weiterleitung nicht zugesichert
werden. Die Domainregistrierung wird durch die Website-Konfiguration nicht
verlängert oder gekündigt.

## Website veröffentlichen

Windows/PowerShell:

```powershell
.\deploy\publish.ps1
```

Linux/macOS oder Git Bash:

```bash
bash deploy/publish.sh
```

Beide Skripte bauen das Projekt und veröffentlichen weiterhin nach
`/var/www/lohrer.dev/dist`. Die vorherige Fassung liegt anschließend in
`dist.prev`. Das PowerShell-Skript veröffentlicht ausschließlich die Dateien;
das Bash-Skript kann zusätzlich einen geänderten `site-server.mjs` installieren.
Für reine Website-Änderungen ist kein Dienstneustart erforderlich.

`npm run build` erzeugt für jede öffentliche Route ein eigenes `index.html`
mit deutschem Inhalt und passenden Metadaten. Die englische Fassung wird im
Browser umgeschaltet. Es ist kein zusätzlicher Rendering-Dienst erforderlich.

## Domain-Konfiguration ändern

`deploy/Caddyfile` enthält den endgültigen Site-Block mit Hauptadresse und
Weiterleitungen. `__UPSTREAM__` wird durch `172.18.0.1:3081` ersetzt.
Der Host-Pfad des gemounteten Caddyfiles ist aktuell
`/opt/lol-stats/deploy/Caddyfile`.

1. Caddyfile sichern und ausschließlich den eigenen Bereich zwischen
   `# >>> lohrer.dev — verwaltet von supreme-carnival/deploy >>>` und
   `# <<< lohrer.dev <<<` bearbeiten.
2. Während der Registrierung die neue Hauptdomain zusätzlich im bisherigen
   Website-Block bedienen. Die bisherige Domain noch nicht weiterleiten.
3. Caddy-Konfiguration im Container validieren und mit `caddy reload` neu laden.
   Inhalt der bestehenden gemounteten Datei ändern, nicht deren Inode ersetzen.
4. Öffentliche DNS-Auflösung und gültiges HTTPS auf beiden neuen Hostnamen prüfen.
5. Neue Website-Dateien veröffentlichen und dann die endgültigen Weiterleitungen
   aus `deploy/Caddyfile` aktivieren. Bei einem Fehler die Sicherung zurückspielen.

```bash
docker exec lol-stats-caddy-1 caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
docker exec lol-stats-caddy-1 caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
```

`setup-vps.sh` dient der Ersteinrichtung und prüft Port 3081 auf freie Belegung.
Es wird für einen Domainwechsel auf dem bereits eingerichteten VPS nicht erneut
ausgeführt. Die stabilen Verzeichnisse und Marker sind im Skript separat von
der öffentlichen Domain benannt. nginx bleibt inaktiv; Ports 80/443 gehören Caddy.

## Nach der Veröffentlichung prüfen

- Alle sieben Routen über `https://lohrer-digital.de` liefern HTTP 200 und die
  erwarteten Inhalte: `/`, `/services`, `/projects`, `/career`, `/contact`,
  `/impressum`, `/datenschutz`.
- Kanonische URLs, Open-Graph-URLs, strukturierte Daten, Sitemap und robots.txt
  nennen die neue Domain. Auch die gerenderte Linkvorschau ist aktualisiert.
- Alte Domains und `www.lohrer-digital.de` liefern HTTP 308 mit erhaltenem Pfad
  und Query. HTTPS muss vor jeder Weiterleitung gültig sein.
- Browser-Navigation und Sprachwechsel funktionieren ohne neue Konsolenfehler.
- `zoinkr.com` und die bestehenden Dienste bleiben erreichbar.
- Eine leere JSON-Anfrage an `/api/contact` liefert HTTP 400. Das prüft
  Konfiguration und Validierung, verschickt aber keine E-Mail.

Der Kontakt-Endpunkt nutzt weiterhin die bestehende private Mailserver-API.
Aktuell ist `CONTACT_TO=maltelohrer1990@hotmail.de` in `/etc/lohrer-site.env`
gesetzt. Die öffentlich sichtbare Kontaktadresse bleibt bis zur Einrichtung
des Domain-Postfachs ebenfalls bei dieser Adresse. Ziel ist
`malte@lohrer-digital.de` in Proton. Erst dessen Empfang prüfen, dann die
öffentlichen Angaben und `CONTACT_TO` gemeinsam umstellen. Vor der Änderung
die Env-Datei sichern, ausschließlich den Empfänger ändern und `lohrer-site`
neu starten. Zugangsdaten weder ausgeben noch ins Repository übernehmen.
Ein HTTP-Erfolg des Formulars bestätigt nur die Annahme durch die Mail-API;
ein Zustelltest erfordert zusätzlich den nachgewiesenen Eingang der Testmail.

## Rückwechsel

Vor einer Konfigurationsänderung entsteht eine datierte Caddyfile-Sicherung.
Den Inhalt dieser Sicherung in die bestehende gemountete Datei zurückschreiben,
validieren und Caddy neu laden. Die vorherigen Website-Dateien liegen in
`/var/www/lohrer.dev/dist.prev`; beim Wiederherstellen die aktuelle Fassung zuerst
unter einem neuen Sicherungsnamen erhalten. Keine Sicherung ungeprüft löschen.

## Veröffentlichungsstand

- 12.09.2026: Neugestaltung zunächst auf `lohrer.dev` veröffentlicht und geprüft.
  Die ältere Sicherung wurde als `dist.prev.20260912T111420Z` erhalten.
- 12.09.2026: Domainwechsel auf `lohrer-digital.de` vorbereitet. Die DNS-Einträge
  sind auf den netcup-Nameservern vorhanden; die öffentliche Delegierung und
  HTTPS-Prüfung stehen zum Zeitpunkt der Vorbereitung noch aus.
  Der neue Build liegt unter `/var/www/lohrer.dev/dist.pending.lohrer-digital.de`
  und wird noch nicht öffentlich ausgeliefert. `lohrer.dev` bleibt aktiv.
  Caddy bedient die neue Domain bereits zusätzlich und versucht das Zertifikat
  auszustellen; die Weiterleitung der alten Hauptdomain ist noch nicht aktiv.
  Sicherung vor dieser Vorbereitung:
  `/opt/lol-stats/deploy/Caddyfile.bak.domain-stage.20260912T165208Z`.
  Build, Lint, alle 21 Tests sowie Navigation und Metadaten in der lokalen
  Browservorschau wurden erfolgreich geprüft. Für den Abschluss zuerst DNS
  und HTTPS bestätigen, dann den vorbereiteten Build aktivieren und den
  endgültigen Caddy-Block aus `deploy/Caddyfile` übernehmen.
- 12.09.2026, 18:49 UTC: Domainwechsel abgeschlossen. Neue Hauptdomain und
  www-Adresse haben gültiges HTTPS. Der vorbereitete Build ist aktiv;
  `lohrer.dev`, `www.lohrer.dev` und `www.lohrer-digital.de` liefern HTTP 308
  auf die neue Hauptadresse mit unverändertem Pfad und Query.
  Alle sieben Routen und ihre Metadaten, Formularvalidierung sowie die
  unveränderte Erreichbarkeit von `zoinkr.com` wurden geprüft. Build, Lint und
  21 Tests sind erfolgreich. Sprachwechsel und Formularannahme wurden im
  Live-Browser geprüft.
  Sicherungen: `/var/www/lohrer.dev/dist.before-domain-cutover.20260912T184940Z`
  und `/opt/lol-stats/deploy/Caddyfile.bak.domain-cutover.20260912T184940Z`.
  Die früheren Sicherungen bleiben erhalten; fremde Caddy-Bereiche sind
  unverändert. Die Mail-Umstellung ist noch offen: Der Proton-TXT-Nachweis ist
  öffentlich vorhanden, Proton verlangt vor einer erneuten Prüfung eine
  Stunde Wartezeit. MX, DKIM und Domainadresse sind deshalb noch nicht aktiv.
