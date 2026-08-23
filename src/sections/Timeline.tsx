import { useRef, type RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip from '../components/Chip'
import Reveal from '../components/Reveal'

const STATIONS = [
  {
    period: '2015 – 2020',
    org: 'Daimler',
    role: 'Werkstudent & Masterand',
    desc: 'ELK-Monitoring der CI-Infrastruktur.',
  },
  {
    period: 'Abschluss',
    org: 'Hochschule der Medien Stuttgart',
    role: 'M.Sc. Computer Science & Media',
    desc: 'Abschlussnote 1,5.',
  },
  {
    period: '02 – 07/2021',
    org: 'Innenministerium Baden-Württemberg',
    role: 'Mitaufbau der Cybersicherheitsagentur (CSBW)',
    desc: 'Aufbau der neuen Cybersicherheitsagentur des Landes Baden-Württemberg.',
  },
  {
    period: '11/2021 – 06/2025',
    org: 'Mercedes-Benz',
    role: 'CI/CD-Plattform der In-Car-UI-Entwicklung',
    desc: 'GitLab CI und Jenkins inklusive Migration, Release-Automatisierung, Monitoring mit Grafana, Prometheus und ELK, Incident Management, Aufbau des SRE-Teams.',
  },
  {
    period: '07/2025 – 06/2026',
    org: 'Aremus Finance',
    role: 'Betriebsplattform & agentischer KI-Assistent',
    desc: 'Interne Betriebsplattform als einziger Entwickler – acht Dienste im Produktivbetrieb, KI-Assistent mit Tool-Zugriff auf Microsoft 365, SharePoint und CRM.',
  },
  {
    period: 'ab 10/2026',
    org: 'Ihr Projekt',
    role: 'Verfügbar für neue Vorhaben',
    desc: '100 % remote, einmaliger Kick-off im Raum Stuttgart möglich.',
    final: true,
  },
]

export default function Timeline() {
  const reduced = useReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: listRef as RefObject<HTMLElement>,
    offset: ['start 0.8', 'end 0.55'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section id="werdegang" className="border-t border-line py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            number="04"
            eyebrow="Werdegang"
            title="Stationen seit 2015"
            description="Vom Werkstudenten am CI-Monitoring bis zum agentischen KI-Assistenten in Produktion."
          />
        </Reveal>

        <div ref={listRef} className="relative mt-14 md:mt-20">
          {/* Rail + scroll-drawn accent line */}
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={reduced ? undefined : { scaleY }}
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-accent"
          />

          <ol className="flex flex-col">
            {STATIONS.map((station, index) => (
              <li
                key={station.org + station.period}
                className="group relative border-b border-line py-7 pl-8 transition-colors duration-300 last:border-b-0 hover:bg-surface/70 md:grid md:grid-cols-[11rem_1fr] md:gap-10 md:pl-10"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-[2.35rem] -left-[3.5px] h-2 w-2 rounded-full border transition-all duration-300 ${
                    station.final
                      ? 'border-accent bg-accent'
                      : 'border-line-strong bg-paper group-hover:scale-125 group-hover:border-accent group-hover:bg-accent'
                  }`}
                />
                <Reveal delay={index * 0.04}>
                  <p className="font-mono text-xs text-ink-3 transition-colors duration-300 group-hover:text-ink">
                    {station.period}
                  </p>
                </Reveal>
                <Reveal delay={index * 0.04}>
                  <div className="mt-2 max-w-2xl md:mt-0">
                    <h3 className="flex flex-wrap items-center gap-3 text-title text-ink">
                      {station.org}
                      {station.final ? <Chip tone="accent">verfügbar</Chip> : null}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] font-medium text-ink-2">{station.role}</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-3">
                      {station.desc}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
