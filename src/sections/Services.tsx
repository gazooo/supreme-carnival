import type { ReactNode } from 'react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip from '../components/Chip'
import Reveal from '../components/Reveal'

function IconAI({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="4" y="7.5" width="16" height="11" stroke="currentColor" strokeWidth="1.25" />
      <path d="M12 7.5V4h3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9 12.5v1.5M15 12.5v1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1.5 11v4M22.5 11v4" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function IconApp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="3.5" y="4.5" width="17" height="15" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="6.2" cy="6.75" r="0.8" fill="currentColor" />
      <circle cx="8.8" cy="6.75" r="0.8" fill="currentColor" />
      <path
        d="M6.5 13h7M6.5 16h4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconPipeline({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <circle cx="4.5" cy="6" r="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="19.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6.2 7.6 10.3 10.6M13.7 13.4l4.1 3" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function IconServer({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="3.5" y="4.5" width="17" height="6" stroke="currentColor" strokeWidth="1.25" />
      <rect x="3.5" y="13.5" width="17" height="6" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 7.5h.01M7 16.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 7.5H17M10.5 16.5H17" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

interface Service {
  index: string
  title: string
  icon: ReactNode
  bullets: string[]
  chips: string[]
  footnote?: string
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Applied AI Engineering',
    icon: <IconAI className="h-5 w-5" />,
    bullets: [
      'LLM-Integration in bestehende Geschäftsprozesse',
      'Agentische Assistenten mit Tool-Zugriff auf Microsoft 365, SharePoint und CRM',
      'KI-Automatisierung mit n8n',
      'RAG-Pipelines und MCP-Tooling',
    ],
    chips: ['LLM-Integration', 'n8n', 'RAG', 'MCP'],
  },
  {
    index: '02',
    title: 'Business-Plattformen',
    icon: <IconApp className="h-5 w-5" />,
    bullets: [
      'Interne Plattformen und Web-Apps: React, Node.js, PostgreSQL',
      'Frontend, Backend und Datenbank aus einer Hand – ein Ansprechpartner',
      'Integrationen: Microsoft 365, SharePoint, CRM, E-Mail',
      'Acht Dienste im Produktivbetrieb bei Aremus Finance',
    ],
    chips: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    index: '03',
    title: 'CI/CD & Platform Engineering',
    icon: <IconPipeline className="h-5 w-5" />,
    bullets: [
      'CI/CD-Plattformen: Konzeption, Aufbau und Migration',
      'Pipeline-Performance durch Parallelisierung und Caching',
      'Release-Automatisierung: Tagging, Changelogs, Rollbacks',
      'Docker- und Kubernetes-Workloads',
    ],
    chips: ['GitLab CI', 'Jenkins', 'GitHub Actions', 'Kubernetes'],
  },
  {
    index: '04',
    title: 'Betrieb & Infrastruktur',
    icon: <IconServer className="h-5 w-5" />,
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

export default function Services() {
  return (
    <section id="leistungen" className="border-t border-line py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            number="01"
            eyebrow="Leistungen"
            title="Was Sie bei mir bekommen"
            description="Vier Bereiche, ein Anspruch: Systeme, die produktiv laufen – nicht nur in der Demo."
          />
        </Reveal>

        <div className="mt-14 grid gap-y-10 md:mt-20 md:grid-cols-2 md:gap-x-12 md:gap-y-14 xl:grid-cols-4 xl:gap-x-0 xl:divide-x xl:divide-line">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 0.06}
              className={`group h-full border-t border-line pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:pt-0 xl:px-9 ${
                index === 0 ? 'xl:pl-0' : ''
              } ${index === SERVICES.length - 1 ? 'xl:pr-0' : ''}`}
            >
              <article className="flex h-full flex-col">
                <div className="flex items-center gap-3 text-ink transition-colors duration-300 group-hover:text-accent">
                  {service.icon}
                  <span className="font-mono text-xs text-ink-3 transition-colors duration-300 group-hover:text-accent">
                    {service.index}
                  </span>
                </div>
                <h3 className="mt-4 text-title text-ink">{service.title}</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-3 shrink-0 bg-line-strong transition-all duration-300 group-hover:w-5 group-hover:bg-accent/60"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                {service.footnote ? (
                  <p className="mt-5 text-[0.9375rem] font-medium text-ink">{service.footnote}</p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-1.5 pt-7">
                  {service.chips.map((chip) => (
                    <Chip key={chip}>{chip}</Chip>
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
