# malte-lohrer-website

Persönliche Freelancer-Website von Malte Lohrer — dunkles, editorial-technisches
Design mit Coder-Flair: tiefblaugrauer Grund (bewusst nicht schwarz), Haarlinien,
Mono-Akzente, `$ whoami`-Intro mit rundem Porträt, eine Akzentfarbe, zurückhaltende
Animationen. Navigation über Tabs (whoami · services · projects · career · contact),
Englisch als Default mit Deutsch-Umschalter in der Navbar. Plus Impressum und
Datenschutzerklärung (deutsch).

## Stack

| Bereich   | Technologie                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------- |
| Build     | [Vite 7](https://vite.dev) (statisches SPA-Build, kein SSR)                                           |
| UI        | React 19 + TypeScript (strict)                                                                        |
| Styling   | Tailwind CSS v4 (`@theme`-Design-Tokens in `src/styles/global.css`)                                   |
| Animation | [Motion](https://motion.dev) (`motion/react`) — Reveals, Parallax, Count-ups                          |
| Scrolling | [Lenis](https://lenis.darkroom.engineering) (Smooth Scroll, bei `prefers-reduced-motion` deaktiviert) |
| Fonts     | Self-hosted via `@fontsource-variable` (Inter, JetBrains Mono) — keine externen Requests              |
| Tests     | Vitest + Testing Library (Smoke-Tests: Render, Tabs, Sprachwechsel, Legal-Routen)                     |
| Qualität  | ESLint (flat config) + Prettier                                                                       |

**Datenschutz by design:** Die Seite macht null Third-Party-Requests — keine CDNs,
keine Google Fonts, kein Tracking, keine Cookies. Das Kontaktformular postet
same-origin an `server/site-server.mjs`, der die private Mailserver-API
(github.com/gazooo/mailserver) aufruft — Setup in [DEPLOY.md](DEPLOY.md).

## Kontaktformular lokal testen

Das Formular postet an `/api/contact`. Lokal gibt es dahinter erst dann einen
Dienst, wenn `server/site-server.mjs` läuft — ohne ihn zeigt das Formular den
E-Mail-Fallback (erwartet, kein Bug). Test-Setup in zwei Terminals:

```bash
# Terminal 1: Dienst im Dry-Run (loggt statt zu senden, kein Token nötig)
MAIL_DRY_RUN=1 node server/site-server.mjs
# PowerShell:  $env:MAIL_DRY_RUN='1'; node server/site-server.mjs

# Terminal 2: Dev-Server (proxied /api automatisch dorthin)
npm run dev
```

Formular absenden → Erfolgsmeldung auf der Seite, geloggte Anfrage in
Terminal 1. Echter Versand passiert nur auf dem VPS neben dem Mailserver —
Produktions-Setup in [DEPLOY.md](DEPLOY.md).

## Befehle

```bash
npm install        # Abhängigkeiten installieren
npm run dev        # Dev-Server (http://localhost:5173)
npm run build      # Produktions-Build nach dist/
npm run preview    # Produktions-Build lokal serven (http://localhost:4173)
npm test           # Vitest-Smoke-Tests
npm run lint       # ESLint
npm run format     # Prettier (write)
```

## Struktur

```
index.html              Meta/SEO/OG/JSON-LD (Person-Schema)
public/                 robots.txt, sitemap.xml, Favicons, og.png
src/
  main.tsx              Einstieg (Fonts + CSS + App)
  App.tsx               MotionConfig, Sprach-Provider, Router (Tab-Seiten lazy),
                        Smooth-Scroll-Provider, Skip-Link, document.title
  styles/global.css     Design-Tokens (@theme, dunkle Palette), Basisstile,
                        Reduced-Motion-Killswitch
  lib/
    router.tsx          Mini-Router (History API): /, /services, /projects,
                        /career, /contact, /impressum, /datenschutz
    i18n.tsx            Sprachkontext: EN default, DE-Toggle, localStorage,
                        setzt document.lang
    scroll.tsx          Lenis-Integration + Anker-Scrolling mit Nav-Offset
  components/           Button, Chip, Container, SectionHeading, Reveal, Marquee,
                        Portrait, ContactForm, AvailabilityBadge, ScrollProgress,
                        LegalLayout, …
  sections/             Nav (Tabs + Sprach-Toggle), Hero ($ whoami), TrustBar,
                        TechMarquee, Services, Approach, Projects, Timeline,
                        Skills, Insights, Contact, Footer
  pages/                Home (whoami + about + $ ls), ServicesPage, ProjectsPage,
                        CareerPage, ContactPage, Impressum, Datenschutz
  content/site.ts       Sprachunabhängige Fakten: E-Mail, Endpoint, Primär-Skills
  content/i18n.ts       Gesamte UI-Copy EN + DE (ein Interface, beide Sprachen
                        typsicher vollständig)
server/site-server.mjs  Produktionsdienst: liefert dist/ aus + POST /api/contact
deploy/                 Caddy-Snippet, systemd-Unit, Setup-/Publish-/Inspektions-
                        skripte (publish.ps1 für Windows, publish.sh für bash)
```

Alle Client-Routen funktionieren auf jedem statischen Host ohne Rewrites: ein
Vite-Plugin (`vite.config.ts`) legt `dist/<route>/index.html` für jede Tab- und
Legal-Route als Kopie der `index.html` an.

**Performance-Architektur:** `index.html` enthält einen statischen Shell des
`$ whoami`-Heros (englisch, inkl. Porträt), der vor der JS-Ausführung malt
(FCP/LCP, CLS 0); React ersetzt ihn nahtlos. Jede weitere Tab-Seite lädt als
eigener kleiner Lazy-Chunk.

## Barrierefreiheit & Motion

- `prefers-reduced-motion` deaktiviert sämtliche nicht-essenzielle Bewegung
  (JS-seitig über `useReducedMotion`, CSS-seitig über einen globalen Killswitch;
  Lenis wird gar nicht erst initialisiert).
- Skip-Link, sichtbare Fokus-Stile, Dialog-Semantik + Fokus-Falle im mobilen Menü,
  ein `h1`, semantische Landmarken; Fokus wandert beim Tab-Wechsel auf den Inhalt.
- `lang` folgt der gewählten Sprache (EN default); die Legal-Dokumente bleiben
  `lang="de"`, der Sprach-Umschalter trägt `aria-pressed`.
- Alle Farbkombinationen erfüllen WCAG AA ≥ 4,5:1 (geprüft; die meisten Paarungen AAA).

## Deployment

Produktionsziel ist **https://lohrer.dev** auf dem eigenen VPS: ein
systemd-Dienst liefert Website und `/api/contact` aus, der dort bereits
laufende Caddy-Container proxied davor. Architektur, Einrichtung und Rollback
in [DEPLOY.md](DEPLOY.md). Offene Platzhalter (Social-Links, USt-IdNr.,
Essay-URL, Domain-Postfach) sind im Code als `TODO` markiert.
