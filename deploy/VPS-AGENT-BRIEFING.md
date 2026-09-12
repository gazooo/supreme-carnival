# Betrieb der Website auf dem VPS

Die aktive Hauptadresse ist `lohrer-digital.de`. Die verbindliche Beschreibung
von DNS, Domainwechsel, Veröffentlichung, Prüfungen und Rückwechsel steht in
[../DEPLOY.md](../DEPLOY.md). Vor Änderungen dort den Veröffentlichungsstand prüfen.

Auf `178.104.124.207` teilen sich mehrere Projekte den Caddy-Container
`lol-stats-caddy-1`. Ausschließlich den markierten Website-Bereich des vorhandenen
Caddyfiles bearbeiten, vorher sichern, validieren und anschließend neu laden.
Container und fremde Dienste nicht neu starten.

Der bestehende Dienst `lohrer-site` bedient Website und `/api/contact` auf
`172.18.0.1:3081`. Seine Dateien liegen weiter unter `/opt/lohrer.dev`, die
Website unter `/var/www/lohrer.dev/dist`. Diese Pfade und die Marker mit
`lohrer.dev` sind stabile Betriebsnamen. Die Domainweiterleitungen sind aktiv.
Das Kontaktformular verwendet `CONTACT_TO=malte@lohrer-digital.de` in
`/etc/lohrer-site.env`. Das Proton-Postfach ist empfangsbereit; MX, SPF, DKIM
und DMARC sind eingerichtet. Öffentliche Kontaktangaben und Empfänger bei
künftigen Änderungen gemeinsam pflegen und tatsächliche Zustellung testen.
Private Zugangsdaten niemals ausgeben oder ins Repository übernehmen.

`setup-vps.sh` ist für die Ersteinrichtung vorgesehen. Auf dem bereits
betriebenen VPS erfolgt eine Domainänderung durch gezieltes Bearbeiten des
Caddy-Bereichs nach dem Verfahren in `DEPLOY.md`. Die endgültige Vorlage steht
in `Caddyfile`; die alte Domain erst nach erfolgreicher DNS- und HTTPS-Prüfung
der neuen Hauptdomain weiterleiten.
