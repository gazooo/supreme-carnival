import { useRef, type ReactNode, type RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip, { type ChipTone } from '../components/Chip'
import Reveal from '../components/Reveal'

/* ---------- Abstract, hand-built illustrations (decorative) ---------- */

function AgentVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
      <div
        className="absolute -top-10 -left-8 h-56 w-56 rounded-full"
        style={{ background: 'radial-gradient(closest-side, var(--color-lavender), transparent 72%)' }}
      />
      <div
        className="absolute -right-6 -bottom-8 h-48 w-48 rounded-full"
        style={{ background: 'radial-gradient(closest-side, var(--color-mint), transparent 72%)' }}
      />
      {/* Chat/agent window */}
      <div className="relative rounded-3xl border-2 border-ink bg-white p-5 shadow-pop">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-peach-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-butter-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint-strong" />
          <span className="ml-2 font-display text-xs font-semibold text-ink-soft">
            Assistent · produktiv
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-cream-deep px-3.5 py-2 text-xs text-ink">
            Fasse die offenen Vorgänge aus dem CRM zusammen.
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-lavender px-3.5 py-2 text-xs text-ink">
            3 Vorgänge gefunden. Der älteste wartet auf ein Dokument aus SharePoint – hier ist der
            Entwurf für die Antwort.
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {['Microsoft 365', 'SharePoint', 'CRM'].map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-ink/25 bg-white px-2.5 py-0.5 font-display text-[0.65rem] font-semibold text-ink-soft"
            >
              ⚙ {tool}
            </span>
          ))}
        </div>
      </div>
      {/* Gateway badge */}
      <div className="absolute -right-4 -top-6 rotate-3 rounded-2xl border-2 border-ink bg-butter px-3.5 py-2 font-display text-xs font-bold text-ink shadow-pop-sm">
        LLM-Gateway · self-hosted
      </div>
      <div className="absolute -bottom-5 -left-3 -rotate-2 rounded-2xl border-2 border-ink bg-mint px-3.5 py-2 font-display text-xs font-bold text-ink shadow-pop-sm">
        8 Dienste · Docker Compose
      </div>
    </div>
  )
}

function PipelineVisual() {
  const stages = [
    { label: 'Build', tone: 'bg-mint' },
    { label: 'Test', tone: 'bg-sky' },
    { label: 'Package', tone: 'bg-lavender' },
    { label: 'Release', tone: 'bg-peach' },
  ]
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
      <div
        className="absolute -top-8 -right-10 h-52 w-52 rounded-full"
        style={{ background: 'radial-gradient(closest-side, var(--color-sky), transparent 72%)' }}
      />
      <div
        className="absolute -bottom-10 -left-8 h-56 w-56 rounded-full"
        style={{ background: 'radial-gradient(closest-side, var(--color-butter), transparent 72%)' }}
      />
      <div className="relative rounded-3xl border-2 border-ink bg-white p-5 shadow-pop">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs font-semibold text-ink-soft">
            pipeline · in-car-ui
          </span>
          <span className="rounded-full bg-mint px-2.5 py-0.5 font-display text-[0.65rem] font-bold text-ink">
            ✓ passed
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between gap-1">
          {stages.map((stage, index) => (
            <div key={stage.label} className="flex flex-1 items-center gap-1">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink font-display text-xs font-bold text-ink ${stage.tone}`}
                >
                  ✓
                </span>
                <span className="font-display text-[0.6rem] font-semibold text-ink-soft">
                  {stage.label}
                </span>
              </div>
              {index < stages.length - 1 ? (
                <span className="mb-5 h-0.5 flex-1 rounded bg-ink/20" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ['Parallelisierung', 'bg-cream-deep'],
            ['Caching', 'bg-cream-deep'],
            ['Rollbacks', 'bg-cream-deep'],
          ].map(([label, tone]) => (
            <span
              key={label}
              className={`rounded-lg px-2 py-1.5 text-center font-display text-[0.62rem] font-semibold text-ink-soft ${tone}`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute -top-6 -left-4 -rotate-3 rounded-2xl border-2 border-ink bg-sky px-3.5 py-2 font-display text-xs font-bold text-ink shadow-pop-sm">
        Grafana · Prometheus · ELK
      </div>
      <div className="absolute -right-3 -bottom-5 rotate-2 rounded-2xl border-2 border-ink bg-butter px-3.5 py-2 font-display text-xs font-bold text-ink shadow-pop-sm">
        GitLab CI ← Jenkins
      </div>
    </div>
  )
}

/* ---------- Case studies ---------- */

interface CaseStudy {
  id: string
  client: string
  period: string
  title: string
  context: string
  built: string[]
  result: string
  resultChips: string[]
  chips: string[]
  tone: ChipTone
  visual: ReactNode
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
      'Rund 172.000 Zeilen Code als Solo-Entwickler – mit 79 Testdateien, 195 Doku-Dateien und 1.956 Commits in 10 Wochen.',
    resultChips: ['8 Dienste produktiv', '7 CI-Workflows', '≈ 172.000 Zeilen Code'],
    chips: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS S3', 'LLM-Integration'],
    tone: 'lavender',
    visual: <AgentVisual />,
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
    resultChips: ['4 Jahre Plattform', 'SRE-Team mit aufgebaut', 'Migration GitLab CI'],
    chips: ['GitLab CI', 'Jenkins', 'Docker', 'Kubernetes', 'Grafana', 'Prometheus'],
    tone: 'sky',
    visual: <PipelineVisual />,
  },
]

function CaseCard({ study, flip }: { study: CaseStudy; flip: boolean }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  })
  const visualY = useTransform(scrollYProgress, [0, 1], [46, -46])

  return (
    <article
      ref={ref}
      className="grid items-center gap-10 rounded-[2rem] border-2 border-ink bg-white p-7 shadow-pop-sm sm:p-10 lg:grid-cols-2 lg:gap-14"
    >
      <motion.div
        style={reduced ? undefined : { y: visualY }}
        className={`px-2 py-6 sm:px-6 ${flip ? 'lg:order-2' : ''}`}
      >
        {study.visual}
      </motion.div>
      <div className={flip ? 'lg:order-1' : ''}>
        <div className="flex flex-wrap items-center gap-3">
          <Chip variant="sticker" tone={study.tone}>
            {study.client}
          </Chip>
          <span className="font-display text-sm font-semibold text-ink-soft">{study.period}</span>
        </div>
        <h3 className="mt-4 font-display text-title text-ink">{study.title}</h3>

        <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
          <span className="mr-2 font-display text-xs font-bold tracking-widest text-ink uppercase">
            Kontext
          </span>
          {study.context}
        </p>

        <p className="mt-5 font-display text-xs font-bold tracking-widest text-ink uppercase">
          Was ich gebaut habe
        </p>
        <ul className="mt-2 flex flex-col gap-2">
          {study.built.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
              <span
                aria-hidden="true"
                className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ink"
              />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-5 font-display text-xs font-bold tracking-widest text-ink uppercase">
          Ergebnis
        </p>
        <p className="mt-2 text-[0.95rem] leading-relaxed font-medium text-ink">{study.result}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {study.resultChips.map((chip) => (
            <Chip key={chip} tone={study.tone}>
              {chip}
            </Chip>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t-2 border-ink/10 pt-5">
          {study.chips.map((chip) => (
            <Chip key={chip} tone="cream">
              {chip}
            </Chip>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projekte" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            number="03"
            eyebrow="Ausgewählte Projekte"
            tone="peach"
            title="Zwei Projekte, die zeigen, wie ich arbeite"
            description="Kontext, Umsetzung, Ergebnis – mit echten Zahlen statt Adjektiven."
          />
        </Reveal>
        <div className="mt-14 flex flex-col gap-10 md:mt-16 md:gap-14">
          {CASES.map((study, index) => (
            <Reveal key={study.id} amount={0.15}>
              <CaseCard study={study} flip={index % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
