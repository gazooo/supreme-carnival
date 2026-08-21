import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Chip from '../components/Chip'
import { ArrowRight } from '../components/doodles'

/** Decorative mini "triage inbox". */
function TriageVisual() {
  const rows = [
    { subject: 'Rückfrage Depotübertrag', chip: 'beantworten', tone: 'bg-mint' },
    { subject: 'Newsletter Q3', chip: 'Ablage', tone: 'bg-lavender' },
    { subject: 'Unterlagen fehlen', chip: 'weiterleiten', tone: 'bg-sky' },
  ]
  return (
    <div aria-hidden="true" className="relative w-full max-w-sm">
      <div className="rounded-3xl border-2 border-ink bg-white p-4 shadow-pop">
        <p className="font-display text-xs font-semibold text-ink-soft">inbox · triage</p>
        <div className="mt-3 flex flex-col gap-2">
          {rows.map((row) => (
            <div
              key={row.subject}
              className="flex items-center justify-between gap-3 rounded-xl bg-cream-deep px-3 py-2"
            >
              <span className="truncate text-xs font-medium text-ink">{row.subject}</span>
              <span
                className={`shrink-0 rounded-full border border-ink/30 px-2 py-0.5 font-display text-[0.6rem] font-bold text-ink ${row.tone}`}
              >
                {row.chip}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -top-5 -right-4 rotate-2 rounded-2xl border-2 border-ink bg-peach px-3 py-1.5 font-display text-xs font-bold text-ink shadow-pop-sm">
        deterministisch entschieden
      </div>
    </div>
  )
}

export default function Insights() {
  return (
    <section id="insights" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            number="06"
            eyebrow="Insights"
            tone="lavender"
            title="Aus dem Maschinenraum"
            description="Erfahrungen aus echten Systemen – aufgeschrieben, damit andere sie nutzen können."
          />
        </Reveal>
        <Reveal className="mt-14 md:mt-16">
          <article className="grid items-center gap-10 rounded-[2rem] border-2 border-ink bg-white p-7 shadow-pop-sm sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip variant="sticker" tone="butter">
                  Essay
                </Chip>
                <Chip tone="cream">Englisch</Chip>
              </div>
              <h3 className="mt-4 font-display text-title text-ink">
                Running an LLM email triage in production
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Was passiert, wenn ein LLM echte E-Mails eines Finanzdienstleisters sortiert? Ein
                Erfahrungsbericht aus dem Produktivbetrieb: Architektur, Fehlerfälle – und warum
                deterministischer Kontrollfluss den Unterschied macht.
              </p>
              {/* TODO: Publikations-URL eintragen, sobald Malte entschieden hat, wo der
                  Essay erscheint. Bis dahin bewusst ohne Ziel. */}
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-disabled="true"
                title="Veröffentlichung folgt"
                className="group mt-5 inline-flex items-center gap-2 font-display font-semibold text-ink"
              >
                <span className="underline decoration-butter-strong decoration-4 underline-offset-4">
                  Zum Essay
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                <span className="font-body text-sm font-medium text-ink-soft">
                  (Veröffentlichung folgt)
                </span>
              </a>
            </div>
            <div className="flex justify-center px-2 py-4 lg:justify-end">
              <TriageVisual />
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  )
}
