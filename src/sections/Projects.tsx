import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { ArrowRight } from '../components/doodles'
import { useCopy } from '../lib/i18n'

export default function Projects({ preview = false }: { preview?: boolean }) {
  const t = useCopy()
  return (
    <section className={preview ? 'section-space border-t border-line' : 'page-space'}>
      <Container size="wide">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
          level={preview ? 2 : 1}
        />
        <div className={preview ? 'mt-10 grid gap-6 md:grid-cols-2' : 'mt-12 space-y-14'}>
          {t.projects.cases.map((study) => (
            <article
              id={preview ? undefined : study.id}
              key={study.id}
              className={
                preview
                  ? 'flex flex-col rounded-lg border border-line bg-raise p-6 sm:p-8'
                  : 'grid gap-6 border-t border-line pt-10 lg:grid-cols-[15rem_1fr] lg:gap-12'
              }
            >
              <div>
                <p className="text-base font-semibold">{study.client}</p>
                <p className="mt-1 text-xs text-fg-3">{study.period}</p>
              </div>
              <div className={preview ? 'flex flex-1 flex-col' : 'max-w-3xl'}>
                <p className={preview ? 'eyebrow mt-8' : 'eyebrow'}>{study.category}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight">
                  {study.title}
                </h3>
                {preview ? (
                  <>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-2">
                      {study.summary}
                    </p>
                    <a
                      href={'/projects#' + study.id}
                      className="text-link mt-auto pt-6"
                      aria-label={t.projects.more + ': ' + study.client}
                    >
                      {t.projects.more}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </>
                ) : (
                  <>
                    <h4 className="mt-7 text-sm font-semibold">{t.projects.labels.context}</h4>
                    <p className="mt-2 leading-relaxed text-fg-2">{study.context}</p>
                    <h4 className="mt-6 text-sm font-semibold">{t.projects.labels.role}</h4>
                    <p className="mt-2 leading-relaxed text-fg-2">{study.role}</p>
                    <h4 className="mt-6 text-sm font-semibold">{t.projects.labels.built}</h4>
                    <ul className="mt-3 space-y-3">
                      {study.built.map((item) => (
                        <li key={item} className="flex gap-3 leading-relaxed text-fg-2">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 rounded-md bg-accent-soft p-5 sm:p-6">
                      <h4 className="text-sm font-semibold text-accent">
                        {t.projects.labels.result}
                      </h4>
                      <p className="mt-2 leading-relaxed">{study.result}</p>
                    </div>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
