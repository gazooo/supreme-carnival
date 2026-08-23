import Container from '../components/Container'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import { AVAILABILITY_DATE, EMAIL } from '../content/site'

const FACTS = [
  { title: `Verfügbar ab ${AVAILABILITY_DATE}`, detail: 'Projektstart planbar ab Oktober 2026.' },
  { title: '100 % remote', detail: 'Einmaliger Kick-off im Raum Stuttgart möglich.' },
  { title: 'Deutsch & Englisch', detail: 'Muttersprache bzw. verhandlungssicher.' },
  { title: 'Freiberuflich', detail: 'Dienst- oder Werkvertrag – Konditionen auf Anfrage.' },
]

export default function Contact() {
  return (
    <section id="kontakt" className="bg-ink py-24 text-paper md:py-32">
      <Container size="wide">
        <Reveal>
          <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[10rem_1fr]">
            <p className="mono-label pt-2 text-ink-2-on-dark">
              08
              <span className="mx-2 opacity-40" aria-hidden="true">
                /
              </span>
              Kontakt
            </p>
            <div>
              <h2 className="max-w-3xl text-hero text-paper">
                Projekt im <span className="border-b-2 border-accent-on-dark pb-0.5">Kopf</span>?
              </h2>
              <p className="mt-7 max-w-2xl text-lead text-ink-2-on-dark">
                Erzählen Sie mir, was Sie bauen wollen – eine kurze Nachricht genügt. Antwort
                innerhalb von 24 Stunden.
              </p>

              <ContactForm />

              <p className="mt-8 font-mono text-sm text-ink-2-on-dark">
                Oder direkt an{' '}
                <a
                  href={`mailto:${EMAIL}`}
                  className="on-ink text-paper underline decoration-accent-on-dark underline-offset-4"
                >
                  {EMAIL}
                </a>
              </p>

              <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {FACTS.map((fact, index) => (
                  <Reveal key={fact.title} delay={index * 0.06} className="h-full">
                    <div className="group h-full border-t border-ink-line pt-4 transition-colors duration-300 hover:border-accent-on-dark/50">
                      <p className="text-[0.9375rem] font-medium text-paper">{fact.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-2-on-dark">
                        {fact.detail}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
