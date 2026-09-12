import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { ArrowRight } from '../components/doodles'
import { RouteLink } from '../lib/router'
import { useCopy } from '../lib/i18n'
export default function Services({ preview = false }: { preview?: boolean }) {
  const t = useCopy()
  return (
    <section className={preview ? 'section-space' : 'page-space'}>
      <Container size="wide">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
          level={preview ? 2 : 1}
        />
        <div
          className={
            preview
              ? 'mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'
              : 'mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2'
          }
        >
          {t.services.items.map((service, index) => (
            <article key={service.title} className="border-t border-line pt-6">
              <span aria-hidden="true" className="text-sm font-medium text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-title">{service.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">
                {service.description}
              </p>
              {!preview ? (
                <ul className="mt-6 space-y-3">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
        {preview ? (
          <RouteLink to="/services" className="text-link mt-8">
            {t.services.more}
            <ArrowRight className="h-4 w-4" />
          </RouteLink>
        ) : (
          <p className="mt-12 max-w-3xl border-l-2 border-accent pl-5 text-base leading-relaxed text-fg-2">
            {t.services.note}
          </p>
        )}
      </Container>
    </section>
  )
}
