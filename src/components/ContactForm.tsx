import { useState, type FormEvent } from 'react'
import { Button } from './Button'
import { ArrowRight } from './doodles'
import { RouteLink } from '../lib/router'
import { CONTACT_ENDPOINT, EMAIL } from '../content/site'

type Status = 'idle' | 'sending' | 'success' | 'error'

const FIELD_CLASSES =
  'w-full border-b border-ink-line bg-transparent px-0 py-2.5 text-paper placeholder:text-ink-2-on-dark/50 transition-colors duration-200 focus:border-accent-on-dark focus:outline-none'

/**
 * Posts to the same-origin contact relay (server/contact-relay.mjs behind
 * Caddy), which forwards to the private mailserver API. Includes a honeypot
 * field; on failure it falls back to offering the plain e-mail address.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: humans never see or fill this field
    if (String(data.get('website') ?? '').trim() !== '') {
      form.reset()
      setStatus('success')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-2xl text-left">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mono-label text-ink-2-on-dark">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            placeholder="Ihr Name"
            className={FIELD_CLASSES}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mono-label text-ink-2-on-dark">
            E-Mail
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={320}
            autoComplete="email"
            placeholder="name@firma.de"
            className={FIELD_CLASSES}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mono-label text-ink-2-on-dark">
            Nachricht
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={5000}
            rows={5}
            placeholder="Worum geht es? Ein paar Sätze genügen."
            className={`${FIELD_CLASSES} resize-y`}
          />
        </div>
        {/* Honeypot — visually hidden, ignored by humans */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button
          type="submit"
          variant="onInk"
          size="lg"
          disabled={status === 'sending'}
          className="group disabled:opacity-60"
        >
          {status === 'sending' ? 'Wird gesendet …' : 'Nachricht senden'}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
        <div aria-live="polite" className="text-sm">
          {status === 'success' ? (
            <p className="flex items-center gap-2 text-paper">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-signal ring-3 ring-signal/20"
              />
              Danke für Ihre Nachricht – ich melde mich innerhalb von 24 Stunden.
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="text-ink-2-on-dark">
              Senden hat nicht geklappt. Schreiben Sie mir direkt:{' '}
              <a
                href={`mailto:${EMAIL}`}
                className="on-ink text-paper underline decoration-accent-on-dark underline-offset-4"
              >
                {EMAIL}
              </a>
            </p>
          ) : null}
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-ink-2-on-dark">
        Ihre Angaben werden ausschließlich zur Bearbeitung der Anfrage verarbeitet – Details in der{' '}
        <RouteLink
          to="/datenschutz"
          className="on-ink underline underline-offset-2 hover:text-paper"
        >
          Datenschutzerklärung
        </RouteLink>
        .
      </p>
    </form>
  )
}
