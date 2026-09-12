import { useState, type FormEvent } from 'react'
import { Button } from './Button'
import { ArrowRight } from './doodles'
import { RouteLink } from '../lib/router'
import { useCopy } from '../lib/i18n'
import { CONTACT_ENDPOINT, EMAIL } from '../content/site'

type Status = 'idle' | 'sending' | 'success' | 'error'

const FIELD_CLASSES =
  'mt-2 w-full rounded-md border border-line-strong bg-raise px-3 py-3 text-sm leading-relaxed text-fg placeholder:text-fg-3 focus:border-accent'

/**
 * Posts to the same-origin contact endpoint (server/site-server.mjs behind
 * Caddy), which forwards to the private mailserver API. Includes a honeypot
 * field; on failure it falls back to offering the plain e-mail address.
 */
export default function ContactForm() {
  const t = useCopy()
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
    <form onSubmit={onSubmit} className="text-left">
      <div className="grid gap-y-6">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">
            {t.contact.form.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            placeholder={t.contact.form.namePlaceholder}
            className={FIELD_CLASSES}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium">
            {t.contact.form.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={320}
            autoComplete="email"
            placeholder={t.contact.form.emailPlaceholder}
            className={FIELD_CLASSES}
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-medium">
            {t.contact.form.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={5000}
            rows={5}
            placeholder={t.contact.form.messagePlaceholder}
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
          size="lg"
          disabled={status === 'sending'}
          className="group disabled:opacity-60"
        >
          {status === 'sending' ? t.contact.form.sending : t.contact.form.submit}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
        <div aria-live="polite" className="text-sm">
          {status === 'success' ? (
            <p className="flex items-center gap-2 text-fg">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-signal ring-3 ring-signal/20"
              />
              {t.contact.form.success}
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="text-fg-2">
              {t.contact.form.errorPrefix}{' '}
              <a href={`mailto:${EMAIL}`} className="link-accent">
                {EMAIL}
              </a>
            </p>
          ) : null}
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-fg-3">
        {t.contact.form.privacyPrefix}
        <RouteLink to="/datenschutz" className="underline underline-offset-2 hover:text-fg">
          {t.contact.form.privacyLink}
        </RouteLink>
        {t.contact.form.privacySuffix}
      </p>
    </form>
  )
}
