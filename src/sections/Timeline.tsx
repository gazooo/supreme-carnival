import { useRef, type RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const STATIONS = [
  {
    period: '2015 – 2020',
    org: 'Daimler',
    role: 'Werkstudent & Masterand',
    desc: 'ELK-Monitoring der CI-Infrastruktur.',
    dot: 'bg-sky',
  },
  {
    period: 'Abschluss',
    org: 'Hochschule der Medien Stuttgart',
    role: 'M.Sc. Computer Science & Media',
    desc: 'Abschlussnote 1,5.',
    dot: 'bg-lavender',
  },
  {
    period: '02 – 07/2021',
    org: 'Innenministerium Baden-Württemberg',
    role: 'Mitaufbau der Cybersicherheitsagentur (CSBW)',
    desc: 'Aufbau der neuen Cybersicherheitsagentur des Landes Baden-Württemberg.',
    dot: 'bg-peach',
  },
  {
    period: '11/2021 – 06/2025',
    org: 'Mercedes-Benz',
    role: 'CI/CD-Plattform der In-Car-UI-Entwicklung',
    desc: 'GitLab CI und Jenkins inklusive Migration, Release-Automatisierung, Monitoring mit Grafana, Prometheus und ELK, Incident Management, Aufbau des SRE-Teams.',
    dot: 'bg-mint',
  },
  {
    period: '07/2025 – 06/2026',
    org: 'Aremus Finance',
    role: 'Betriebsplattform & agentischer KI-Assistent',
    desc: 'Interne Betriebsplattform als einziger Entwickler – acht Dienste im Produktivbetrieb, KI-Assistent mit Tool-Zugriff auf Microsoft 365, SharePoint und CRM.',
    dot: 'bg-butter',
  },
  {
    period: 'ab 10/2026',
    org: 'Ihr Projekt',
    role: 'Verfügbar für neue Vorhaben',
    desc: '100 % remote, einmaliger Kick-off im Raum Stuttgart möglich.',
    dot: 'bg-mint-strong',
    final: true,
  },
]

export default function Timeline() {
  const reduced = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: listRef as RefObject<HTMLElement>,
    offset: ['start 0.8', 'end 0.55'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section id="werdegang" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            number="04"
            eyebrow="Werdegang"
            tone="sky"
            title="Stationen seit 2015"
            description="Vom Werkstudenten am CI-Monitoring bis zum agentischen KI-Assistenten in Produktion."
          />
        </Reveal>

        <ol ref={listRef} className="relative mt-14 flex flex-col gap-12 md:mt-16 md:gap-14">
          {/* Track + scroll-drawn line */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[13px] w-1 rounded-full bg-ink/10"
          />
          <motion.span
            aria-hidden="true"
            style={reduced ? undefined : { scaleY }}
            className="absolute top-2 bottom-2 left-[13px] w-1 origin-top rounded-full"
          >
            <span
              className="block h-full w-full rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, var(--color-sky-strong), var(--color-lavender-strong), var(--color-peach-strong), var(--color-mint-strong))',
              }}
            />
          </motion.span>

          {STATIONS.map((station, index) => (
            <Reveal key={station.org + station.period} delay={index * 0.05}>
              <li className="relative pl-12 sm:pl-16">
                <span
                  aria-hidden="true"
                  className={`absolute top-1 left-[2px] h-6 w-6 rounded-full border-2 border-ink shadow-pop-sm ${station.dot}`}
                />
                <div
                  className={
                    station.final
                      ? 'inline-block rounded-3xl border-2 border-ink bg-mint p-6 shadow-pop-sm'
                      : ''
                  }
                >
                  <p className="font-display text-sm font-bold tracking-wide text-ink-soft uppercase">
                    {station.period}
                  </p>
                  <h3 className="mt-1 font-display text-title text-ink">
                    {station.org}
                    {station.final ? <span aria-hidden="true"> ✦</span> : null}
                  </h3>
                  <p className="mt-0.5 font-semibold text-ink">{station.role}</p>
                  <p className="mt-1.5 max-w-2xl leading-relaxed text-ink-soft">{station.desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
