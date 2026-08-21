import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const PRINCIPLES = [
  {
    number: '01',
    accent: 'text-mint',
    border: 'hover:border-mint/60',
    title: 'Das Modell klassifiziert, der Code entscheidet.',
    body: 'LLMs übernehmen, was sie gut können: verstehen, einordnen, vorschlagen. Kritische Entscheidungen laufen durch deterministischen, testbaren Kontrollfluss.',
  },
  {
    number: '02',
    accent: 'text-lavender',
    border: 'hover:border-lavender/60',
    title: 'Betriebsblick statt Prototyp.',
    body: 'Monitoring, Backups und Rollbacks sind Teil des Designs, nicht ein Nachtrag. Gebaut wird, was den Alltag übersteht – nicht, was in der Demo glänzt.',
  },
  {
    number: '03',
    accent: 'text-peach',
    border: 'hover:border-peach/60',
    title: 'Dokumentation ist Teil der Arbeit.',
    body: '195 Doku-Dateien in einem einzigen Projekt: Architektur, Runbooks, Entscheidungen. Übergabe ohne Kopfmonopol.',
  },
]

export default function Approach() {
  return (
    <section id="arbeitsweise" className="scroll-mt-20 bg-ink py-24 text-cream md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            number="02"
            eyebrow="Arbeitsweise"
            tone="lavender"
            onDark
            title="Drei Prinzipien, keine Floskeln"
            description="Was Sie von der Zusammenarbeit erwarten können – abgeleitet aus realen Projekten, nicht aus einem Leitbild."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.number} delay={index * 0.12} className="h-full">
              <article
                className={`flex h-full flex-col rounded-3xl border-2 border-cream/15 p-7 transition-colors duration-300 ${principle.border}`}
              >
                <span
                  aria-hidden="true"
                  className={`font-display text-6xl font-bold tracking-tight ${principle.accent}`}
                >
                  {principle.number}
                </span>
                <h3 className="mt-5 font-display text-title text-cream">„{principle.title}“</h3>
                <p className="mt-3 leading-relaxed text-cream/70">{principle.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
