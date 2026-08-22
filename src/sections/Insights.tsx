import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { ArrowRight } from '../components/doodles'

export default function Insights() {
  return (
    <section id="insights" className="py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            number="06"
            eyebrow="Insights"
            title="Aus dem Maschinenraum"
            description="Erfahrungen aus echten Systemen – aufgeschrieben, damit andere sie nutzen können."
          />
        </Reveal>

        <Reveal className="mt-14 md:mt-20">
          <article className="grid gap-x-10 gap-y-4 border-y border-line py-9 lg:grid-cols-[10rem_1fr]">
            <p className="mono-label pt-1">
              Essay
              <span className="mx-2 opacity-40" aria-hidden="true">
                /
              </span>
              EN
            </p>
            <div className="max-w-3xl">
              <h3 lang="en" className="text-2xl font-semibold tracking-tight text-ink">
                Running an LLM email triage in production
              </h3>
              <p className="mt-3 leading-relaxed text-ink-2">
                Was passiert, wenn ein LLM echte E-Mails eines Finanzdienstleisters sortiert? Ein
                Erfahrungsbericht aus dem Produktivbetrieb: Architektur, Fehlerfälle – und warum
                deterministischer Kontrollfluss den Unterschied macht.
              </p>
              {/* TODO: Publikations-URL eintragen, sobald Malte entschieden hat, wo der
                  Essay erscheint. Bis dahin bewusst ohne Ziel. */}
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  aria-disabled="true"
                  title="Veröffentlichung folgt"
                  className="link-accent inline-flex items-center gap-1.5 text-[0.9375rem] font-medium"
                >
                  Zum Essay
                  <ArrowRight className="h-4 w-4" />
                </a>
                <span className="font-mono text-xs text-ink-3">Veröffentlichung folgt</span>
              </p>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  )
}
