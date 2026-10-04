# Malte Lohrer — persönliche Website

Website für die Vorstellung von Leistungen, Projekterfahrung und die erste
Kontaktaufnahme. Deutsche Standardsprache, vollständige englische Fassung und
gespeicherte Sprachwahl. Ruhige, helle Gestaltung mit Porträt, blauer Akzentfarbe,
Abschnittsnavigation und direktem Kontaktweg.

Die redaktionellen Entscheidungen, Quellen und Regeln zur Pflege stehen in
[CONTENT.md](CONTENT.md).

## Lokal starten

Empfohlen: Node.js 22 ab 22.12 (wie in CI) oder Node.js 24. Vite 7 und
Vitest 4 laufen mit diesen Versionen. `npm ci` installiert den geprüften Stand
aus `package-lock.json` reproduzierbar.

```bash
npm ci
npm run dev
```

Die Vorschau läuft standardmäßig auf http://localhost:5173.

## Kontaktformular lokal testen

Das Formular sendet an den eigenen Endpunkt `/api/contact`. Vite leitet ihn an
den lokalen Dienst auf Port 3081 weiter. Ohne Dienst erscheint der E-Mail-Fallback.

In einem zweiten Terminal den Dienst ohne echten Mailversand starten:

```powershell
$env:MAIL_DRY_RUN='1'
node server/site-server.mjs
```

Unter bash: `MAIL_DRY_RUN=1 node server/site-server.mjs`.
Testdaten werden in diesem Modus ausschließlich lokal protokolliert. Tokens
sind dafür nicht notwendig. Einrichtung und echter Versand: [DEPLOY.md](DEPLOY.md).

## Prüfungen

```bash
npm audit
npm audit --omit=dev
npm run build
npm run lint
npm test
npm run format:check
npm run preview
```

Die Tests prüfen Navigation, Seiteneinstiege, Sprachwechsel und gespeicherte
Sprachwahl sowie Erfolg und Fehler des Kontaktformulars. Bei Änderungen am
Layout zusätzlich im Browser prüfen: Desktop und Mobil, beide Sprachen,
Menü per Tastatur, Projektlinks und Formular.

Die Sicherheitsaktualisierung vom 04.10.2026 hebt Vitest und `@vitest/mocker`
auf 4.1.11 an. Das Lockfile enthält außerdem `brace-expansion` 1.1.21/5.0.12
und `js-yaml` 4.3.2 innerhalb der bestehenden ESLint-/typescript-eslint-Abhängigkeiten.
Diese Versionen beheben die gemeldeten Entwicklungsschwachstellen ohne Overrides:
[Vitest-Advisory](https://github.com/advisories/GHSA-82fw-gwwq-j7x9),
[brace-expansion-Advisories](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr),
[js-yaml-Advisory](https://github.com/advisories/GHSA-2883-xcg3-v3hh).
Der Prerender-Test lädt seine Node-Typen ausdrücklich; die bisherigen Testumgebungen
und Mocks bleiben mit Vitest 4 kompatibel.

## Technik und Struktur

React 19, TypeScript, Vite und Tailwind CSS. Inter wird lokal ausgeliefert.
Die Seite verwendet native Browserfunktionen für Scrollen und das mobile
Dialogmenü; keine Animations- oder Scroll-Bibliothek.

| Pfad                     | Aufgabe                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `src/content/i18n.ts`    | Alle Marketingtexte, Beschriftungen und Metadaten in DE und EN |
| `src/content/site.ts`    | Kontaktadresse und Formular-Endpunkt                           |
| `src/pages/`             | Onepager und rechtliche Dokumente; frühere Seitenbausteine     |
| `src/sections/`          | Wiederverwendbare Inhaltsabschnitte und Navigation             |
| `src/components/`        | Layout, Porträt, Formularelemente, Buttons                     |
| `src/styles/global.css`  | Farben, Typografie, Abstände, Fokus und reduzierte Bewegung    |
| `src/lib/router.tsx`     | Abschnittslinks, History API und Umleitung alter Seitenpfade   |
| `src/lib/i18n.tsx`       | Sprachwahl; DE als Standard, Speicherung in localStorage       |
| `src/prerender.tsx`      | Statisches HTML aus denselben React-Komponenten und Texten     |
| `vite.config.ts`         | Build, lokale Formular-Weiterleitung und Ausgabe aller Routen  |
| `index.html`             | Gemeinsame HTML-Vorlage und strukturierte Personendaten        |
| `server/site-server.mjs` | Statische Auslieferung und Kontaktformular                     |
| `public/`                | Porträt, Favicons, Linkvorschau, Sitemap und robots.txt        |

Der Onepager enthält alle Leistungen, Projekte, Zusammenarbeit, Vorstellung,
Werdegang und das Kontaktformular ohne doppelte Vorschauen. Navbar-Links scrollen
zu `/#home`, `/#services`, `/#projects`, `/#career` und `/#contact`. Die aktive
Markierung folgt auch manuellem Scrollen und gleitet horizontal zwischen den
Desktop-Links. Reduzierte Bewegung wird berücksichtigt. Rechtliches bleibt separat.
Alte Seitenpfade führen im Browser zum passenden Anker; vorhandene Projektfragmente
und Suchparameter bleiben erhalten.

## Statische Seiten und Metadaten

Beim Build entstehen der Onepager und die rechtlichen Seiten als statisches
HTML. Alte Seitenpfade liefern ebenfalls den Onepager mit Canonical `/`.
Die Sitemap listet nur Hauptseite, Impressum und Datenschutz.
React aktiviert das deutsche HTML; eine gespeicherte englische Sprachwahl
rendert direkt Englisch. Rechtliche Seiten werden bei Bedarf nachgeladen.
Sprachwechsel aktualisieren die Metadaten.

## Zugänglichkeit und Datenschutz

Jede Seite hat genau eine Hauptüberschrift. Die Website bietet sichtbare
Tastaturfokusse, einen Sprunglink zum Inhalt, beschriftete Formularfelder und
Statusmeldungen. Das mobile Menü nutzt einen nativen modalen Dialog mit
Fokusbegrenzung und Escape zum Schließen. Reduzierte Bewegung wird respektiert.

Keine externen Schriften, Tracking-Skripte oder Drittanbieter-Anfragen aus der
Website. Kontaktanfragen gehen an den eigenen Server. Impressum und
Datenschutzerklärung sind auf Deutsch verfügbar.

## Veröffentlichung

Die lokale Überarbeitung veröffentlicht keine Änderungen. Build und
Veröffentlichung auf lohrer-digital.de sind in [DEPLOY.md](DEPLOY.md) beschrieben.

Die Kontaktadresse `malte@lohrer-digital.de` steht in `src/content/site.ts`
und in den strukturierten Personendaten in `index.html`. Das Kontaktformular
stellt ebenfalls an diese Proton-Adresse zu. Betriebsdetails und Prüfungen
stehen in [DEPLOY.md](DEPLOY.md). Eine USt-IdNr. erst nach Erteilung ergänzen.

Aktueller VPS: Quelle `/opt/lohrer.dev/repository`, private Konfiguration und Backups nach [DEPLOY.md](DEPLOY.md#private-vps-pfade-seit-2026-10-03).

## Bildmarken und Linkvorschau

Die bearbeitbaren Vorlagen liegen in `public/favicon.svg` und `public/og.svg`.
Die PNG-Dateien werden daraus gerendert: Favicon 32 × 32, Apple-Touch-Icon
180 × 180, weitere Icons 192 × 192 und 512 × 512, Linkvorschau 1200 × 630.
Bei einer Änderung der Vorlagen die entsprechenden PNG-Dateien ebenfalls
aktualisieren. Das vorhandene Porträt wird ausschließlich per CSS dargestellt.

Das Hero verwendet das unveränderte transparente PNG
`assets/portrait/portrait-no-bg.png`, als unveränderte Kopie unter
`public/portrait-no-bg.png` ausgeliefert; „Über mich“ verwendet weiter `public/portrait.webp`.
Der weiche, rechts nach oben gebogene Fade entsteht ausschließlich durch eine elliptische CSS-Maske in
`src/styles/global.css`: `.hero-portrait` enthält `--portrait-width` (Mobil/Desktop),
`--portrait-offset-y` (positiv = tiefer), `--portrait-caption-gap` und
`--portrait-fade-start`. `--portrait-fade-center` verschiebt das Zentrum;
`--portrait-fade-radius` steuert Breite und Höhe des Bogens. Die weiteren Stopps in `--portrait-fade` steuern die
Weichheit; bei einem späteren Start die nachfolgenden Stopps ebenfalls nach hinten
verschieben. `.hero-portrait-image` wendet die Maske an, `.hero-portrait-caption`
steuert den Abstand zur unveränderten Beschriftung. Es gibt nur eine breite
elliptische Maske, ohne überlagerte lineare Verläufe. Ihr Zentrum liegt oberhalb
des Bildes; der äußere Radius endet kurz vor der unteren Bildkante, sodass auch
diese weich verschwindet. Das PNG wird nicht bearbeitet.
