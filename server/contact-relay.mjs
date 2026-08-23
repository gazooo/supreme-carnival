/**
 * Minimaler Contact-Relay für das Kontaktformular.
 *
 * Der Browser darf die private Mailserver-API (github.com/gazooo/mailserver)
 * nie direkt aufrufen: der Bearer-Token wäre öffentlich und Besucher könnten
 * beliebige Empfänger setzen. Dieser Relay nimmt {name, email, message}
 * entgegen, validiert und limitiert, und ruft dann serverseitig
 * POST /v1/send mit festem Empfänger auf. Läuft loopback-only hinter Caddy
 * (siehe DEPLOY.md). Nur Node-Standardbibliothek, Node >= 18.
 *
 * Env:
 *   MAIL_API_TOKEN  (Pflicht)  Token der Mailserver-API
 *   CONTACT_TO      (Pflicht)  Zieladresse der Anfragen
 *   MAIL_API_URL    (optional) Default: http://127.0.0.1:3080/v1/send
 *   RELAY_HOST      (optional) Default: 127.0.0.1
 *   RELAY_PORT      (optional) Default: 3081
 */
import { createServer } from 'node:http'

const MAIL_API_URL = process.env.MAIL_API_URL ?? 'http://127.0.0.1:3080/v1/send'
const MAIL_API_TOKEN = process.env.MAIL_API_TOKEN
const CONTACT_TO = process.env.CONTACT_TO
const HOST = process.env.RELAY_HOST ?? '127.0.0.1'
const PORT = Number(process.env.RELAY_PORT ?? 3081)

if (!MAIL_API_TOKEN || !CONTACT_TO) {
  console.error('contact-relay: MAIL_API_TOKEN und CONTACT_TO müssen gesetzt sein')
  process.exit(1)
}

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

createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/api/contact') {
    return json(res, 404, { error: 'not found' })
  }

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
      console.error('contact-relay: send failed —', error.message ?? error)
      json(res, 502, { error: 'send failed' })
    }
  })
}).listen(PORT, HOST, () => {
  console.log(`contact-relay listening on http://${HOST}:${PORT}/api/contact → ${MAIL_API_URL}`)
})
