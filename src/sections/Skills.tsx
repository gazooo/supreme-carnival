import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip, { type ChipTone } from '../components/Chip'
import Reveal from '../components/Reveal'
import { PRIMARY_SKILLS } from '../content/site'

const TONE_CYCLE: ChipTone[] = ['mint', 'peach', 'lavender', 'sky', 'butter']

const SECONDARY_GROUPS = [
  {
    label: 'Cloud & Infra',
    items: ['AWS S3', 'Docker Compose', 'Grafana', 'Prometheus', 'ELK', 'Linux-Server-Betrieb'],
  },
  {
    label: 'CI & Tooling',
    items: [
      'Pipeline-Optimierung',
      'Release-Automatisierung',
      'Rollback-Strategien',
      'Incident Management',
      'SRE',
    ],
  },
  {
    label: 'AI & Automation',
    items: [
      'RAG',
      'MCP',
      'LLM-Gateways',
      'E-Mail-Triage',
      'Agenten-Tooling',
      'Microsoft-365-Integration',
    ],
  },
  {
    label: 'Web',
    items: ['React', 'Node.js', 'PostgreSQL'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-cream-deep py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            number="05"
            eyebrow="Skills"
            tone="butter"
            title="Womit ich arbeite"
            description="Elf Werkzeuge im Kern – der Rest gruppiert sich darum."
          />
        </Reveal>

        <Reveal className="mt-12 md:mt-14">
          <ul className="flex max-w-4xl flex-wrap gap-3 sm:gap-4">
            {PRIMARY_SKILLS.map((skill, index) => (
              <li key={skill}>
                <Chip
                  variant="sticker"
                  tone={TONE_CYCLE[index % TONE_CYCLE.length]}
                  rotate={index % 3 === 0 ? -1.5 : index % 3 === 1 ? 1 : 0}
                  className="transition-transform duration-200 hover:-translate-y-0.5 hover:rotate-0"
                >
                  {skill}
                </Chip>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECONDARY_GROUPS.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.08} className="h-full">
              <div className="h-full rounded-3xl border-2 border-ink/15 bg-white p-6">
                <h3 className="font-display text-sm font-bold tracking-widest text-ink uppercase">
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Chip tone="cream">{item}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
