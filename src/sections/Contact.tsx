import Container from '../components/Container'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import { useCopy } from '../lib/i18n'
import { EMAIL } from '../content/site'

export default function Contact() {
  const t = useCopy()
  return (
    <section id="kontakt" className="py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[10rem_1fr]">
            <p className="mono-comment pt-3">
              <span aria-hidden="true" className="text-accent">
                {'// '}
              </span>
              {t.contact.eyebrow}
            </p>
            <div>
              <h2 className="max-w-3xl text-hero text-fg">
                {t.contact.titleA}{' '}
                <span className="border-b-2 border-accent pb-0.5">{t.contact.titleMark}</span>
                {t.contact.titleB}
              </h2>
              <p className="mt-7 max-w-2xl text-lead text-fg-2">{t.contact.lead}</p>

              <ContactForm />

              <p className="mt-8 font-mono text-sm text-fg-2">
                {t.contact.direct}{' '}
                <a href={`mailto:${EMAIL}`} className="link-accent">
                  {EMAIL}
                </a>
              </p>

              <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {t.contact.facts.map((fact, index) => (
                  <Reveal key={fact.title} delay={index * 0.06} className="h-full">
                    <div className="group h-full border-t border-line pt-4 transition-colors duration-300 hover:border-accent/50">
                      <p className="text-[0.9375rem] font-medium text-fg">{fact.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-fg-2">{fact.detail}</p>
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
