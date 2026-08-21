import Container from '../components/Container'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import { ButtonLink } from '../components/Button'
import { ArrowRight, Asterisk, Sparkle, Squiggle } from '../components/doodles'
import { AVAILABILITY_DATE, EMAIL, MAILTO, PHONE_DISPLAY, PHONE_TEL } from '../content/site'

const FACTS = [
  { title: `Verfügbar ab ${AVAILABILITY_DATE}`, detail: 'Projektstart planbar ab Oktober 2026.' },
  { title: '100 % remote', detail: 'Einmaliger Kick-off im Raum Stuttgart möglich.' },
  { title: 'Deutsch & Englisch', detail: 'Muttersprache bzw. verhandlungssicher.' },
  { title: 'Freiberuflich', detail: 'Dienst- oder Werkvertrag – Konditionen auf Anfrage.' },
]

export default function Contact() {
  return (
    <section
      id="kontakt"
      className="relative scroll-mt-20 overflow-hidden bg-ink py-24 text-cream md:py-32"
    >
      {/* Floating pastel doodles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Sparkle className="absolute top-16 left-[12%] h-8 w-8 text-butter motion-safe:animate-float" />
        <Asterisk className="absolute top-24 right-[14%] h-10 w-10 text-mint motion-safe:animate-float-slow" />
        <Squiggle className="absolute bottom-24 left-[8%] h-6 w-32 text-lavender-strong" />
        <span
          className="absolute right-[8%] bottom-20 h-12 w-12 rounded-full border-2 border-cream/30 bg-peach/90 motion-safe:animate-float"
          style={{ animationDelay: '1.2s' }}
        />
        <div
          className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(closest-side, var(--color-lavender), transparent 72%)',
          }}
        />
      </div>

      <Container className="relative">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-4xl font-display text-hero text-cream">
            Projekt im{' '}
            <span className="inline-block rotate-1 rounded-2xl border-2 border-cream/20 bg-butter px-4 pb-1 text-ink shadow-pop-butter">
              Kopf
            </span>
            ?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lead text-cream/75">
            Erzählen Sie mir, was Sie bauen wollen – Sie erreichen mich direkt, ohne Umwege. Antwort
            innerhalb von 24 Stunden.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <ButtonLink href={MAILTO} variant="onInk" size="lg">
                E-Mail schreiben
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </Magnetic>
            <a
              href={`tel:${PHONE_TEL}`}
              className="on-ink inline-flex items-center justify-center gap-2 rounded-full border-2 border-cream/40 px-7 py-3.5 font-display text-lg font-semibold text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/10 sm:px-9 sm:py-4"
            >
              {PHONE_DISPLAY}
            </a>
          </div>

          <p className="mt-6 text-cream/60">
            Oder direkt an{' '}
            <a
              href={`mailto:${EMAIL}`}
              className="on-ink font-medium text-cream underline decoration-butter-strong decoration-2 underline-offset-4"
            >
              {EMAIL}
            </a>
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, index) => (
            <Reveal key={fact.title} delay={index * 0.08} className="h-full">
              <div className="h-full rounded-2xl border-2 border-cream/15 p-5 text-left">
                <p className="font-display font-semibold text-cream">{fact.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-cream/60">{fact.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
