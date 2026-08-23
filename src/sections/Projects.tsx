import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip from '../components/Chip'
import Reveal from '../components/Reveal'

interface Metric {
  value: string
  label: string
}

interface CaseStudy {
  id: string
  client: string
  period: string
  title: string
  context: string
  built: string[]
  result: string
  metrics: Metric[]
  chips: string[]
}

const CASES: CaseStudy[] = [
  {
    id: 'aremus',
    client: 'Aremus Finance',
    period: '07/2025 – 06/2026',
    title: 'Agentischer KI-Assistent & Betriebsplattform',
    context:
      'Interne Betriebsplattform für einen Finanzdienstleister – als einziger Entwickler verantwortlich, von der ersten Zeile bis zum Produktivbetrieb.',
    built: [
      'Agentischer KI-Assistent in Produktion, mit Tool-Zugriff auf Microsoft 365, SharePoint und CRM',
      'Selbst betriebener LLM-Gateway und LLM-E-Mail-Triage mit deterministischem Kontrollfluss',
      'React + Node + PostgreSQL, 8-Dienste-Docker-Compose-Stack auf eigenem Server',
      '7 CI-Workflows und verschlüsselte Offsite-Backups (AWS S3)',
    ],
    result:
      'Rund 172.000 Zeilen Code als Solo-Entwickler – dokumentiert, getestet und im täglichen Betrieb.',
    metrics: [
      { value: '≈ 172.000', label: 'Zeilen Code' },
      { value: '79', label: 'Testdateien' },
      { value: '195', label: 'Doku-Dateien' },
      { value: '1.956', label: 'Commits in 10 Wochen' },
    ],
    chips: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS S3', 'LLM-Integration'],
  },
  {
    id: 'mercedes',
    client: 'Mercedes-Benz',
    period: '11/2021 – 06/2025',
    title: 'CI/CD-Plattform für die In-Car-UI-Entwicklung',
    context:
      'Die zentrale CI/CD-Plattform, auf der die gesamte In-Car-UI-Entwicklung von Mercedes-Benz baut, testet und ausliefert.',
    built: [
      'GitLab-CI- und Jenkins-Pipelines, inklusive Migration zwischen den Systemen',
      'Pipeline-Performance: Parallelisierung und Caching',
      'Release-Automatisierung: Tagging, Changelogs, Rollbacks',
      'Monitoring mit Grafana, Prometheus und ELK; Incident Management und Aufbau des SRE-Teams',
    ],
    result:
      'Vier Jahre Plattformverantwortung für die gesamte In-Car-UI-Entwicklung – vom Commit bis zum Release.',
    metrics: [
      { value: '4', label: 'Jahre Plattformverantwortung' },
      { value: 'GitLab CI ← Jenkins', label: 'Migration verantwortet' },
      { value: 'SRE-Team', label: 'mit aufgebaut' },
    ],
    chips: ['GitLab CI', 'Jenkins', 'Docker', 'Kubernetes', 'Grafana', 'Prometheus'],
  },
]

function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article className="grid gap-x-10 gap-y-6 border-t border-line py-10 md:py-14 lg:grid-cols-[10rem_1fr]">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 lg:flex-col">
        <p className="mono-label">{study.client}</p>
        <p className="font-mono text-xs text-ink-3">{study.period}</p>
      </div>

      <div className="max-w-3xl">
        <h3 className="text-2xl font-semibold tracking-tight text-ink">{study.title}</h3>

        <p className="mono-label mt-7">Kontext</p>
        <p className="mt-2 leading-relaxed text-ink-2">{study.context}</p>

        <p className="mono-label mt-6">Was ich gebaut habe</p>
        <ul className="mt-2 flex flex-col gap-2.5">
          {study.built.map((item) => (
            <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mono-label mt-6">Ergebnis</p>
        <p className="mt-2 leading-relaxed font-medium text-ink">{study.result}</p>

        <div
          className={`mt-5 grid grid-cols-2 gap-px border border-line bg-line ${
            study.metrics.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
          }`}
        >
          {study.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`group/metric bg-surface px-4 py-3.5 transition-colors duration-300 hover:bg-accent-soft ${
                study.metrics.length % 2 === 1 && index === study.metrics.length - 1
                  ? 'col-span-2 sm:col-span-1'
                  : ''
              }`}
            >
              <p className="text-lg font-semibold tracking-tight text-ink tabular-nums transition-colors duration-300 group-hover/metric:text-accent">
                {metric.value}
              </p>
              <p className="mt-0.5 font-mono text-[0.6875rem] text-ink-3">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {study.chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projekte" className="py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            number="03"
            eyebrow="Ausgewählte Projekte"
            title="Zwei Projekte, die zeigen, wie ich arbeite"
            description="Kontext, Umsetzung, Ergebnis – mit echten Zahlen statt Adjektiven."
          />
        </Reveal>
        <div className="mt-14 md:mt-20">
          {CASES.map((study) => (
            <Reveal key={study.id} amount={0.1}>
              <CaseCard study={study} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
