#!/usr/bin/env node
/**
 * lohrer.dev — Node-Dienst hinter dem Caddy-Container.
 *
 * Er macht zwei Dinge:
 *   1. liefert die gebaute Website aus (STATIC_DIR), und
 *   2. nimmt Kontaktformular-Anfragen entgegen (POST /api/contact) und reicht
 *      sie serverseitig an die private Mailserver-API weiter.
 *
 * Warum überhaupt ein eigener Dienst?
 *   - Der Browser darf die Mailserver-API nie direkt aufrufen: der Bearer-Token
 *     wäre öffentlich und Besucher könnten beliebige Empfänger setzen. Deshalb
 *     bleibt die API loopback-only und nur dieser Prozess kennt Token und
 *     festen Empfänger.
 *   - Der Caddy-Container hat kein Volume für statische Dateien. Statt sein
 *     Compose-Setup zu ändern (Neustart, fremdes Projekt), liefert dieser
 *     Dienst die Dateien aus; Caddy bleibt reiner Reverse-Proxy davor.
 *
 * Bind-Adresse: In Produktion 172.18.0.1 (Gateway des Docker-Netzes, in dem
 * Caddy läuft) — der Container kann das Loopback des Hosts nicht erreichen.
 * Diese Adresse ist privat und nicht aus dem Internet routbar.
 *
 * Env:
 *   STATIC_DIR      Verzeichnis mit der gebauten Website (leer = kein Ausliefern)
 *   MAIL_API_TOKEN  Token der Mailserver-API
 *   CONTACT_TO      Zieladresse der Anfragen
 *   MAIL_API_URL    Default: http://127.0.0.1:3080/v1/send
 *   RELAY_HOST      Default: 127.0.0.1
 *   RELAY_PORT      Default: 3081
 *   MAIL_DRY_RUN=1  Lokaler Test: loggt statt zu senden
 */
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'

const DRY_RUN = process.env.MAIL_DRY_RUN === '1'
const MAIL_API_URL = process.env.MAIL_API_URL ?? 'http://127.0.0.1:3080/v1/send'
const MAIL_API_TOKEN = process.env.MAIL_API_TOKEN
const CONTACT_TO = process.env.CONTACT_TO
const STATIC_DIR = process.env.STATIC_DIR ? resolve(process.env.STATIC_DIR) : null
const HOST = process.env.RELAY_HOST ?? '127.0.0.1'
const PORT = Number(process.env.RELAY_PORT ?? 3081)

// Fehlende Mail-Konfiguration legt den Dienst nicht lahm: die Website bleibt
// erreichbar, nur /api/contact antwortet dann mit 503 (das Formular zeigt
// daraufhin den E-Mail-Fallback).
const contactReady = DRY_RUN || Boolean(MAIL_API_TOKEN && CONTACT_TO)
if (!contactReady) {
  console.warn('WARNUNG: MAIL_API_TOKEN/CONTACT_TO fehlen — /api/contact antwortet mit 503.')
}

/* ---------------------------------- Kontakt --------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_BODY_BYTES = 20_000

// Naives In-Memory-Rate-Limit: max. 5 Anfragen pro IP in 10 Minuten
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 10_000) hits.clear() // Speicher-Backstop
  return recent.length > MAX_PER_WINDOW
}

function json(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

function handleContact(req, res) {
  if (!contactReady) return json(res, 503, { error: 'contact not configured' })

  const ip =
    (req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || req.socket.remoteAddress || '?'
  if (isRateLimited(ip)) return json(res, 429, { error: 'too many requests' })

  let raw = ''
  req.on('data', (chunk) => {
    raw += chunk
    if (raw.length > MAX_BODY_BYTES) req.destroy()
  })
  req.on('end', async () => {
    let payload
    try {
      payload = JSON.parse(raw)
    } catch {
      return json(res, 400, { error: 'invalid json' })
    }

    const name = typeof payload.name === 'string' ? payload.name.trim() : ''
    const email = typeof payload.email === 'string' ? payload.email.trim() : ''
    const message = typeof payload.message === 'string' ? payload.message.trim() : ''

    if (
      !name ||
      name.length > 200 ||
      !EMAIL_RE.test(email) ||
      email.length > 320 ||
      !message ||
      message.length > 5000
    ) {
      return json(res, 400, { error: 'invalid fields' })
    }

    if (DRY_RUN) {
      console.log('[dry-run] Anfrage NICHT versendet:', { name, email, message })
      res.writeHead(204)
      return res.end()
    }

    try {
      const response = await fetch(MAIL_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${MAIL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: CONTACT_TO,
          subject: `Projektanfrage über die Website von ${name}`,
          text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
          // EMAIL_RE lässt keine Whitespaces/Zeilenumbrüche zu — Header-sicher.
          replyTo: email,
        }),
      })
      if (!response.ok) throw new Error(`mail api answered ${response.status}`)
      res.writeHead(204)
      res.end()
    } catch (error) {
      console.error('site-server: send failed —', error.message ?? error)
      json(res, 502, { error: 'send failed' })
    }
  })
}

/* -------------------------------- Statisches -------------------------------- */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}

/** Löst einen URL-Pfad auf eine Datei im Webroot auf — ohne Ausbruch nach oben. */
async function resolveFile(urlPath) {
  if (!STATIC_DIR) return null
  let rel = decodeURIComponent(urlPath.split('?')[0])
  if (rel.endsWith('/')) rel += 'index.html'
  const candidate = resolve(join(STATIC_DIR, rel))
  // Path-Traversal-Schutz: das Ergebnis muss im Webroot liegen
  if (candidate !== STATIC_DIR && !candidate.startsWith(STATIC_DIR + sep)) return null

  try {
    const info = await stat(candidate)
    if (info.isFile()) return { path: candidate, info }
    if (info.isDirectory()) {
      const index = join(candidate, 'index.html')
      const indexInfo = await stat(index)
      if (indexInfo.isFile()) return { path: index, info: indexInfo }
    }
  } catch {
    // existiert nicht — die Routen /impressum und /datenschutz liegen als
    // eigene index.html im Build, deshalb greift oben bereits der Ordnerfall
  }
  return null
}

function cacheControl(path) {
  if (path.includes(`${sep}assets${sep}`)) return 'public, max-age=31536000, immutable'
  if (path.endsWith('.html')) return 'no-cache'
  return 'public, max-age=3600'
}

function sendFile(req, res, file, statusCode = 200) {
  const etag = `W/"${file.info.size.toString(16)}-${file.info.mtimeMs.toString(16)}"`
  const headers = {
    'Content-Type': MIME[extname(file.path).toLowerCase()] ?? 'application/octet-stream',
    'Content-Length': file.info.size,
    'Cache-Control': cacheControl(file.path),
    ETag: etag,
    'Last-Modified': file.info.mtime.toUTCString(),
  }
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, { ETag: etag, 'Cache-Control': headers['Cache-Control'] })
    return res.end()
  }
  res.writeHead(statusCode, headers)
  if (req.method === 'HEAD') return res.end()
  createReadStream(file.path).pipe(res)
}

async function handleStatic(req, res) {
  const file = await resolveFile(req.url ?? '/')
  if (file) return sendFile(req, res, file)

  // Unbekannter Pfad: die Seite ausliefern, aber ehrlich mit 404 —
  // sonst entstehen Soft-404s, die Suchmaschinen als Duplikate werten.
  const fallback = await resolveFile('/')
  if (fallback) return sendFile(req, res, fallback, 404)

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('404')
}

/* ---------------------------------- Server ---------------------------------- */

createServer((req, res) => {
  const path = (req.url ?? '/').split('?')[0]

  if (path === '/api/contact') {
    if (req.method !== 'POST') {
      res.writeHead(405, { Allow: 'POST' })
      return res.end()
    }
    return handleContact(req, res)
  }

  if (req.method === 'GET' || req.method === 'HEAD') return handleStatic(req, res)

  res.writeHead(405, { Allow: 'GET, HEAD' })
  res.end()
}).listen(PORT, HOST, () => {
  console.log(`site-server: http://${HOST}:${PORT}`)
  console.log(`  statisch : ${STATIC_DIR ?? '(deaktiviert)'}`)
  console.log(
    `  kontakt  : ${DRY_RUN ? 'DRY-RUN (kein Versand)' : contactReady ? MAIL_API_URL : 'nicht konfiguriert (503)'}`,
  )
})
