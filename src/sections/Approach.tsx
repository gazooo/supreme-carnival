import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const PRINCIPLES = [
  {
    number: '01',
    title: 'Das Modell klassifiziert, der Code entscheidet.',
    body: 'LLMs übernehmen, was sie gut können: verstehen, einordnen, vorschlagen. Kritische Entscheidungen laufen durch deterministischen, testbaren Kontrollfluss.',
  },
  {
    number: '02',
    title: 'Betriebsblick statt Prototyp.',
    body: 'Monitoring, Backups und Rollbacks sind Teil des Designs, nicht ein Nachtrag. Gebaut wird, was den Alltag übersteht – nicht, was in der Demo glänzt.',
  },
  {
    number: '03',
    title: 'Dokumentation ist Teil der Arbeit.',
    body: '195 Doku-Dateien in einem einzigen Projekt: Architektur, Runbooks, Entscheidungen. Übergabe ohne Kopfmonopol.',
  },
]

export default function Approach() {
  return (
    <section id="arbeitsweise" className="bg-ink py-20 text-paper md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            number="02"
            eyebrow="Arbeitsweise"
            onDark
            title="Drei Prinzipien, keine Floskeln"
            description="Was Sie von der Zusammenarbeit erwarten können – abgeleitet aus realen Projekten, nicht aus einem Leitbild."
          />
        </Reveal>

        <div className="mt-14 grid gap-px bg-ink-line md:mt-20 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.number} delay={index * 0.07} className="bg-ink">
              <article className="flex h-full flex-col py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <span aria-hidden="true" className="font-mono text-xs text-ink-2-on-dark">
                  {principle.number}
                </span>
                <h3 className="mt-4 text-title text-paper">{principle.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2-on-dark">{principle.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
