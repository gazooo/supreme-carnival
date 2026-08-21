# Deployment

Das Build-Ergebnis ist ein rein statisches Verzeichnis:

```bash
npm ci
npm run build   # erzeugt dist/
```

`dist/` kann auf jedem statischen Host liegen. Die Legal-Routen
(`/impressum`, `/datenschutz`) funktionieren ohne Server-Rewrites, weil der
Build eigene `index.html`-Kopien für diese Pfade anlegt.

## Vor dem ersten Deploy: Platzhalter ersetzen

1. **Domain** — `https://example.invalid` ersetzen in:
   - `index.html` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`)
   - `public/robots.txt` (Sitemap-URL)
   - `public/sitemap.xml` (alle `<loc>`)
2. **E-Mail** — sobald ein Domain-Postfach existiert: `src/content/site.ts`
3. Weitere `TODO`-Marker: `grep -rn "TODO" src/ index.html public/`

## Option A — Eigener Server (Hetzner) mit Caddy

```caddyfile
malte-lohrer.example {
    root * /var/www/malte-lohrer-website/dist
    file_server
    encode zstd gzip
    header /assets/* Cache-Control "public, max-age=31536000, immutable"
}
```

Deploy z. B. per `rsync -avz --delete dist/ server:/var/www/malte-lohrer-website/dist/`.
Caddy besorgt TLS automatisch (Let's Encrypt).

## Option B — GitHub Pages

1. Repo-Einstellung: Pages → Source „GitHub Actions".
2. Workflow: Build-Job (`npm ci && npm run build`) + `actions/upload-pages-artifact`
   mit `path: dist` + `actions/deploy-pages`.
3. Eigene Domain in den Pages-Einstellungen hinterlegen (CNAME).

## Option C — Cloudflare Pages

1. Projekt anlegen, Repo verbinden.
2. Build command: `npm run build`, Output directory: `dist`.
3. Eigene Domain im Dashboard verbinden.

## Nach dem Deploy prüfen

- `curl -I https://<domain>/impressum` → 200
- DevTools → Network: **keine** Requests an fremde Hosts
- Lighthouse (Performance/Accessibility/Best Practices/SEO)
