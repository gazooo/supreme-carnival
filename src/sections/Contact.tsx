import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'
import { useCopy } from '../lib/i18n'
import { EMAIL } from '../content/site'
export default function Contact() {
  const t = useCopy()
  return (
    <section className="page-space">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
              description={t.contact.lead}
              level={1}
            />
            <div className="mt-8">
              <p className="text-sm text-fg-2">{t.contact.direct}</p>
              <a href={'mailto:' + EMAIL} className="text-link break-all">
                {EMAIL}
              </a>
            </div>
            <dl className="mt-8 space-y-5 border-t border-line pt-7">
              {t.contact.facts.map((fact) => (
                <div key={fact.title}>
                  <dt className="text-sm font-semibold">{fact.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg-2">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-lg border border-line bg-raise p-6 sm:p-8">
            <ContactForm />
            <div className="mt-8 border-t border-line pt-6">
              <h2 className="text-sm font-semibold">{t.contact.nextTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{t.contact.nextBody}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
