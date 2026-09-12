# Malte Lohrer — persönliche Website

Website für die Vorstellung von Leistungen, Projekterfahrung und die erste
Kontaktaufnahme. Deutsche Standardsprache, vollständige englische Fassung und
gespeicherte Sprachwahl. Ruhige, helle Gestaltung mit Porträt, grüner Akzentfarbe,
normaler Navigation und direktem Kontaktweg.

Die redaktionellen Entscheidungen, Quellen und Regeln zur Pflege stehen in
[CONTENT.md](CONTENT.md).

## Lokal starten

```bash
npm install
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

## Technik und Struktur

React 19, TypeScript, Vite und Tailwind CSS. Inter wird lokal ausgeliefert.
Die Seite verwendet native Browserfunktionen für Scrollen und das mobile
Dialogmenü; keine Animations- oder Scroll-Bibliothek.

| Pfad                     | Aufgabe                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| `src/content/i18n.ts`    | Alle Marketingtexte, Beschriftungen und Metadaten in DE und EN       |
| `src/content/site.ts`    | Kontaktadresse und Formular-Endpunkt                                 |
| `src/pages/`             | Startseite, Leistungen, Projekte, Über mich, Kontakt und Rechtliches |
| `src/sections/`          | Wiederverwendbare Inhaltsabschnitte und Navigation                   |
| `src/components/`        | Layout, Porträt, Formularelemente, Buttons                           |
| `src/styles/global.css`  | Farben, Typografie, Abstände, Fokus und reduzierte Bewegung          |
| `src/lib/router.tsx`     | Navigation mit History API; bestehende URLs bleiben erhalten         |
| `src/lib/i18n.tsx`       | Sprachwahl; DE als Standard, Speicherung in localStorage             |
| `src/prerender.tsx`      | Statisches HTML aus denselben React-Komponenten und Texten           |
| `vite.config.ts`         | Build, lokale Formular-Weiterleitung und Ausgabe aller Routen        |
| `index.html`             | Gemeinsame HTML-Vorlage und strukturierte Personendaten              |
| `server/site-server.mjs` | Statische Auslieferung und Kontaktformular                           |
| `public/`                | Porträt, Favicons, Linkvorschau, Sitemap und robots.txt              |

Die Startseite fasst Leistungen, Projekte, Zusammenarbeit und Person zusammen.
Die vorhandenen Routen `/services`, `/projects`, `/career` und `/contact`
führen zu den Details. `/career` wird als „Über mich“ angezeigt.

## Statische Seiten und Metadaten

Beim Build erhält jede Route eine eigene `dist/<route>/index.html` mit ihrem
vollständigen deutschen Inhalt, einem passenden Titel, einer Beschreibung und
der richtigen kanonischen URL. Es wird derselbe React-Code wie im Browser
verwendet; eine separat gepflegte Startseiten-Kopie entfällt.

Der Browser aktiviert das vorbereitete HTML mit React-Hydration. Bei zuvor
gewähltem Englisch rendert er die englische Fassung direkt. Weitere Seiten
werden bei Bedarf geladen. Navigation und Sprachwechsel aktualisieren Titel,
Beschreibung und Social-Metadaten. Die öffentlich abrufbaren statischen
Metadaten sind deutsch; Englisch hat keine separaten URLs.

Es wird kein Rendering-Dienst in Produktion benötigt. Der bestehende statische
Host und Kontaktformular-Dienst können die Ausgabe weiterhin ausliefern.

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

Die Kontaktadresse steht in `src/content/site.ts` und in den strukturierten
Personendaten in `index.html`. Ein Domain-Postfach sowie eine erteilte
USt-IdNr. dürfen erst nach Vorliegen der tatsächlichen Angaben ergänzt werden.

## Bildmarken und Linkvorschau

Die bearbeitbaren Vorlagen liegen in `public/favicon.svg` und `public/og.svg`.
Die PNG-Dateien werden daraus gerendert: Favicon 32 × 32, Apple-Touch-Icon
180 × 180, weitere Icons 192 × 192 und 512 × 512, Linkvorschau 1200 × 630.
Bei einer Änderung der Vorlagen die entsprechenden PNG-Dateien ebenfalls
aktualisieren. Das vorhandene Porträt wird ausschließlich per CSS dargestellt.
