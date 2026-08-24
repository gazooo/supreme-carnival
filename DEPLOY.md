# Deployment — lohrer.dev

Zielbild: Der Hetzner-VPS (`178.104.124.207`, Ubuntu 24.04, dort läuft schon
der Send-only-Mailserver) serviert die Website über Caddy; das Kontaktformular
läuft über den Contact-Relay auf demselben Server. Alle nötigen Dateien liegen
in diesem Repo unter `deploy/`.

## 1. DNS bei netcup

Im netcup-CCP unter Domains → lohrer.dev → DNS diese Records anlegen:

| Host  | Typ | Ziel/Wert         |
| ----- | --- | ----------------- |
| `@`   | A   | `178.104.124.207` |
| `www` | A   | `178.104.124.207` |

Hat der VPS auch eine IPv6-Adresse (Hetzner-Konsole oder `ip -6 addr` auf dem
Server), zusätzlich:

| Host  | Typ  | Ziel/Wert        |
| ----- | ---- | ---------------- |
| `@`   | AAAA | `<IPv6 des VPS>` |
| `www` | AAAA | `<IPv6 des VPS>` |

Mehr braucht die Website nicht. Hinweise:

- `.dev` steht auf der HSTS-Preload-Liste: Browser erzwingen HTTPS. Caddy
  besorgt die Zertifikate automatisch — es muss nichts weiter konfiguriert
  werden, die DNS-Records müssen nur zeigen und die Ports 80 + 443 offen sein
  (Hetzner-Firewall prüfen).
- Mail-Records (SPF/DKIM/DMARC) für lohrer.dev sind erst nötig, wenn der
  Formular-Absender auf eine @lohrer.dev-Adresse umgestellt wird — siehe
  Abschnitt 5.

## 2. Einmalige VPS-Einrichtung

Auf dem VPS (als root):

```bash
git clone https://github.com/gazooo/supreme-carnival /opt/lohrer.dev-repo
cd /opt/lohrer.dev-repo
sudo bash deploy/setup-vps.sh
```

Das Skript ist idempotent und

- installiert Caddy (offizielles apt-Repo), falls nicht vorhanden,
- aktiviert `deploy/Caddyfile` als `/etc/caddy/sites/lohrer.dev.caddy`
  (Website + `/api/contact`-Proxy + Security-Header, www→Apex-Redirect),
- installiert den Contact-Relay nach `/opt/lohrer.dev/` als systemd-Dienst
  `contact-relay`,
- legt `/etc/contact-relay.env` an (chmod 600).

Danach einmalig den API-Token eintragen (derselbe Wert wie `MAIL_API_TOKEN`
in der `.env` des Mailserver-Repos auf dem Server):

```bash
sudo nano /etc/contact-relay.env     # MAIL_API_TOKEN=… eintragen
sudo systemctl restart contact-relay
```

## 3. Website veröffentlichen

Vom Entwicklerrechner (Git Bash unter Windows funktioniert — nur ssh + tar
nötig, kein rsync):

```bash
bash deploy/publish.sh
# oder mit anderem SSH-Ziel:
SSH_TARGET=user@178.104.124.207 bash deploy/publish.sh
```

Baut das Projekt und tauscht `/var/www/lohrer.dev/dist` atomar aus; die
vorherige Version bleibt als `dist.prev` liegen.

## 4. Nach dem Deploy prüfen

```bash
curl -I https://lohrer.dev              # 200, Security-Header sichtbar
curl -I https://lohrer.dev/impressum    # 200
curl -I https://www.lohrer.dev          # 308 -> https://lohrer.dev
curl -X POST https://lohrer.dev/api/contact \
  -H 'Content-Type: application/json' \
  --data '{"name":"Test","email":"test@example.com","message":"Probelauf"}'
# -> HTTP 204, Mail landet bei CONTACT_TO; Antwort an Absender via replyTo testen
```

Zusätzlich: DevTools → Network (keine Requests an fremde Hosts) und ein
Lighthouse-Lauf.

## 5. Absenderadresse des Formulars

Die Mailserver-API erlaubt bewusst **kein** Absender-Override pro Request —
der Absender kommt aus `MAIL_FROM` in der Mailserver-`.env` und muss wegen
SPF/DKIM/DMARC-Alignment zur signierten Domain passen.

**Stand jetzt (funktioniert sofort, ohne weitere DNS-Arbeit):** Der Versand
läuft mit dem bestehenden Absender `noreply@zoinkr.com` — SPF/DKIM/DMARC für
zoinkr.com sind auf dem Server bereits fertig eingerichtet.

**Späterer Wechsel auf z. B. `kontaktanfrage@lohrer.dev`** (naheliegender als
eine dritte Domain, weil lohrer.dev ohnehin existiert — bangum.com ginge nach
demselben Muster):

1. DNS bei netcup für lohrer.dev ergänzen:
   - `@ TXT "v=spf1 ip4:178.104.124.207 -all"`
   - `mail._domainkey TXT <DKIM-Public-Key>` (OpenDKIM auf dem VPS um die
     Domain erweitern, z. B. Installer des Mailserver-Repos mit
     `MAIL_DOMAIN=lohrer.dev` — er erhält bestehende Keys)
   - `_dmarc TXT "v=DMARC1; p=none; adkim=s; aspf=s; pct=100"`
2. Im Mailserver `MAIL_FROM=kontaktanfrage@lohrer.dev` setzen, Container neu
   starten. Achtung: `MAIL_FROM` gilt global für alle Nutzer dieser
   API-Instanz — falls andere Dienste den zoinkr-Absender brauchen, eine
   zweite Instanz mit eigenem Port betreiben.

## Alternative Hosts (ohne Kontaktformular-Backend)

GitHub Pages / Cloudflare Pages servieren `dist/` ebenfalls (Build:
`npm run build`, Output: `dist`), aber dort gibt es kein `/api/contact` auf
derselben Origin — das Formular zeigt dann den E-Mail-Fallback. Für das
Formular ist der eigene VPS der vorgesehene Weg; alternativ den Relay separat
hosten und `CONTACT_ENDPOINT` in `src/content/site.ts` auf dessen URL stellen
(dann CORS im Relay ergänzen).

## Offene Platzhalter im Code

`grep -rn "TODO" src/ index.html` — aktuell: GitHub-/LinkedIn-URLs
(`sameAs`/Social-Icons), USt-IdNr. im Impressum, Publikations-URL des Essays,
E-Mail-Adresse auf ein @lohrer.dev-Postfach umstellen, sobald eines existiert.
