# malte-lohrer-website

Persönliche Freelancer-Website von Malte Lohrer — moderner One-Pager (Deutsch) im
editorialen, technischen Design: neutraler Grund, Haarlinien, Mono-Metadaten, eine
Akzentfarbe, zurückhaltende Scroll-Animationen. Plus Impressum und
Datenschutzerklärung.

## Stack

| Bereich   | Technologie                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------- |
| Build     | [Vite 7](https://vite.dev) (statisches SPA-Build, kein SSR)                                           |
| UI        | React 19 + TypeScript (strict)                                                                        |
| Styling   | Tailwind CSS v4 (`@theme`-Design-Tokens in `src/styles/global.css`)                                   |
| Animation | [Motion](https://motion.dev) (`motion/react`) — Reveals, Parallax, Count-ups                          |
| Scrolling | [Lenis](https://lenis.darkroom.engineering) (Smooth Scroll, bei `prefers-reduced-motion` deaktiviert) |
| Fonts     | Self-hosted via `@fontsource-variable` (Inter, JetBrains Mono) — keine externen Requests              |
| Tests     | Vitest + Testing Library (Smoke-Tests: Render, Anker, Legal-Routen)                                   |
| Qualität  | ESLint (flat config) + Prettier                                                                       |

**Datenschutz by design:** Die Seite macht null Third-Party-Requests — keine CDNs,
keine Google Fonts, kein Tracking, keine Cookies. Das Kontaktformular postet
same-origin an `server/contact-relay.mjs`, der die private Mailserver-API
(github.com/gazooo/mailserver) aufruft — Setup in [DEPLOY.md](DEPLOY.md).

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
  App.tsx               MotionConfig, Router, Smooth-Scroll-Provider, Skip-Link
  styles/global.css     Design-Tokens (@theme), Basisstile, Reduced-Motion-Killswitch
  lib/
    router.tsx          Mini-Router (History API): /, /impressum, /datenschutz
    scroll.tsx          Lenis-Integration + Anker-Scrolling mit Nav-Offset
  components/           Button, Chip, Container, SectionHeading, Reveal, Marquee,
                        CountUp, AvailabilityBadge, ScrollProgress, LegalLayout, …
  sections/             Nav, Hero, TrustBar, TechMarquee, Services, Approach,
                        Projects, Stats, Timeline, Skills, Insights, About,
                        Contact, Footer
  pages/                OnePager (+ lazy BelowFold-Chunk), Impressum, Datenschutz
  content/site.ts       Kontaktdaten, Verfügbarkeit, Nav-Links, Primär-Skills
```

Die Legal-Routen funktionieren auf jedem statischen Host ohne Rewrites: ein
Vite-Plugin (`vite.config.ts`) legt `dist/impressum/index.html` und
`dist/datenschutz/index.html` als Kopien der `index.html` an.

**Performance-Architektur:** `index.html` enthält einen statischen Hero-Shell,
der vor der JS-Ausführung malt (FCP/LCP); React ersetzt ihn nahtlos. Alles
unterhalb des Folds lädt als eigener Lazy-Chunk (`BelowFold`), Platzhalter-
Sektionen halten die Anker-IDs sofort bereit. Lighthouse: 100/100/100/100
(Mobile und Desktop, `npm run build && npm run preview`).

## Barrierefreiheit & Motion

- `prefers-reduced-motion` deaktiviert sämtliche nicht-essenzielle Bewegung
  (JS-seitig über `useReducedMotion`, CSS-seitig über einen globalen Killswitch;
  Lenis wird gar nicht erst initialisiert).
- Skip-Link, sichtbare Fokus-Stile, Dialog-Semantik + Fokus-Falle im mobilen Menü,
  ein `h1`, semantische Landmarken, `lang="de"` (Essay-Titel `lang="en"`).
- Alle Farbkombinationen erfüllen WCAG AA (geprüft; die meisten Paarungen AAA).

## Deployment

Statisches `dist/`-Verzeichnis, überall deploybar — Optionen und Schritte in
[DEPLOY.md](DEPLOY.md). Offene Platzhalter (Domain, Social-Links, USt-IdNr.,
Essay-URL) sind im Code als `TODO` markiert.
