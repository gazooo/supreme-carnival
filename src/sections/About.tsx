import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Portrait from '../components/Portrait'
import { ArrowRight } from '../components/doodles'
import { useCopy } from '../lib/i18n'
import { RouteLink } from '../lib/router'
export default function About({ preview = false }: { preview?: boolean }) {
  const t = useCopy()
  return (
    <section className={preview ? 'section-space' : 'page-space'}>
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={t.about.eyebrow}
              title={preview ? t.about.homeTitle : t.about.title}
              level={preview ? 2 : 1}
            />
            {!preview ? <Portrait className="mt-8 max-w-[260px]" /> : null}
          </div>
          <div className="space-y-5 text-base leading-relaxed text-fg-2">
            {preview ? (
              <p>{t.about.homeBody}</p>
            ) : (
              t.about.paragraphs.map((p) => <p key={p}>{p}</p>)
            )}
            {preview ? (
              <RouteLink to="/career" className="text-link">
                {t.about.more}
                <ArrowRight className="h-4 w-4" />
              </RouteLink>
            ) : null}
          </div>
        </div>
        {!preview ? (
          <dl className="mt-12 grid gap-6 border-t border-line pt-8 md:grid-cols-3">
            {t.about.facts.map((fact) => (
              <div key={fact.title}>
                <dt className="font-semibold">{fact.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-fg-2">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </section>
  )
}
