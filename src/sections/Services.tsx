import type { ReactNode } from 'react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip, { type ChipTone } from '../components/Chip'
import Reveal from '../components/Reveal'

function IconAI({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="4" y="7" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7V3m0 0h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="13" r="1.4" fill="currentColor" />
      <circle cx="15" cy="13" r="1.4" fill="currentColor" />
      <path d="M9.5 16.5c.8.6 4.2.6 5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconPipeline({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <circle cx="5" cy="6" r="2.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="19" cy="18" r="2.2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 7.5 10 10.5M14 13.5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14.2 6H20M4 18h5.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" />
    </svg>
  )
}

function IconServer({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="4" y="4" width="16" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="13" width="16" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="7.5" r="1.2" fill="currentColor" />
      <circle cx="8" cy="16.5" r="1.2" fill="currentColor" />
      <path d="M12 7.5h5M12 16.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

interface Service {
  title: string
  tone: ChipTone
  icon: ReactNode
  bullets: string[]
  chips: string[]
  footnote?: string
}

const SERVICES: Service[] = [
  {
    title: 'Applied AI Engineering',
    tone: 'mint',
    icon: <IconAI className="h-6 w-6" />,
    bullets: [
      'LLM-Integration in bestehende Geschäftsprozesse',
      'Agentische Assistenten mit Tool-Zugriff auf Microsoft 365, SharePoint und CRM',
      'KI-Automatisierung mit n8n',
      'RAG-Pipelines und MCP-Tooling',
    ],
    chips: ['LLM-Integration', 'n8n', 'RAG', 'MCP'],
  },
  {
    title: 'CI/CD & Platform Engineering',
    tone: 'sky',
    icon: <IconPipeline className="h-6 w-6" />,
    bullets: [
      'CI/CD-Plattformen: Konzeption, Aufbau und Migration',
      'Pipeline-Performance durch Parallelisierung und Caching',
      'Release-Automatisierung: Tagging, Changelogs, Rollbacks',
      'Docker- und Kubernetes-Workloads',
    ],
    chips: ['GitLab CI', 'Jenkins', 'GitHub Actions', 'Kubernetes'],
  },
  {
    title: 'Betrieb & Infrastruktur',
    tone: 'peach',
    icon: <IconServer className="h-6 w-6" />,
    bullets: [
      'Docker-Stacks im Produktivbetrieb – auf eigenem Server oder in AWS',
      'Monitoring und Alerting mit Grafana, Prometheus und ELK',
      'Verschlüsselte Offsite-Backups (AWS S3)',
      'Incident Management und SRE-Praktiken',
    ],
    chips: ['Docker', 'AWS', 'Linux', 'Grafana'],
    footnote: 'Ich betreibe, was ich baue.',
  },
]

const toneIconBg: Record<string, string> = {
  mint: 'bg-mint',
  sky: 'bg-sky',
  peach: 'bg-peach',
}

export default function Services() {
  return (
    <section id="leistungen" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            number="01"
            eyebrow="Leistungen"
            tone="mint"
            title="Was Sie bei mir bekommen"
            description="Zwei Schwerpunkte, ein Anspruch: Systeme, die produktiv laufen – nicht nur in der Demo."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.1} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl border-2 border-ink bg-white p-7 shadow-pop-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:-rotate-[0.4deg] hover:shadow-pop">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink text-ink ${toneIconBg[service.tone]}`}
                >
                  {service.icon}
                </div>
                <h3 className="mt-5 font-display text-title text-ink">{service.title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-ink"
                        aria-hidden="true"
                        fill="none"
                      >
                        <path
                          d="m2.5 8.5 3.5 3.5 7.5-8"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
                {service.footnote ? (
                  <p className="mt-4 font-display font-semibold text-ink">
                    „{service.footnote}“
                  </p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {service.chips.map((chip) => (
                    <Chip key={chip} tone={service.tone}>
                      {chip}
                    </Chip>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
