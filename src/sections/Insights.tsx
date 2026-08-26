import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { ArrowRight } from '../components/doodles'
import { useCopy } from '../lib/i18n'

export default function Insights() {
  const t = useCopy()
  return (
    <section id="insights" className="border-t border-line py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            eyebrow={t.insights.eyebrow}
            title={t.insights.title}
            description={t.insights.description}
          />
        </Reveal>

        <Reveal className="mt-14 md:mt-20">
          <article className="grid gap-x-10 gap-y-4 border-y border-line py-9 lg:grid-cols-[10rem_1fr]">
            <p className="mono-label pt-1">
              {t.insights.essay.tag}
              <span className="mx-2 opacity-40" aria-hidden="true">
                /
              </span>
              EN
            </p>
            <div className="max-w-3xl">
              <h3 lang="en" className="text-2xl font-semibold tracking-tight text-fg">
                {t.insights.essay.title}
              </h3>
              <p className="mt-3 leading-relaxed text-fg-2">{t.insights.essay.teaser}</p>
              {/* TODO: Publikations-URL eintragen, sobald Malte entschieden hat, wo der
                  Essay erscheint. Bis dahin bewusst ohne Ziel. */}
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  aria-disabled="true"
                  title={t.insights.essay.pending}
                  className="link-accent group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium"
                >
                  {t.insights.essay.linkLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <span className="font-mono text-xs text-fg-3">{t.insights.essay.pending}</span>
              </p>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  )
}
