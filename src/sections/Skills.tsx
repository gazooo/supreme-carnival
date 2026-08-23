import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip from '../components/Chip'
import Reveal from '../components/Reveal'
import { PRIMARY_SKILLS } from '../content/site'

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
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="skills" className="border-t border-line bg-paper-alt py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            number="05"
            eyebrow="Skills"
            title="Womit ich arbeite"
            description="Elf Werkzeuge im Kern – der Rest gruppiert sich darum."
          />
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <ul className="flex max-w-4xl flex-wrap gap-2">
            {PRIMARY_SKILLS.map((skill) => (
              <li key={skill}>
                <Chip className="bg-surface px-3.5 py-1.5 text-[0.8125rem]">{skill}</Chip>
              </li>
            ))}
          </ul>
        </Reveal>

        {/*
          Magic underline: one shared highlight travels between the group
          labels as the pointer moves across the columns.
        */}
        <div
          className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          onMouseLeave={() => setHovered(null)}
        >
          {SECONDARY_GROUPS.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.06} className="h-full">
              <div
                className="group h-full border-t border-line-strong pt-4 transition-colors duration-300"
                onMouseEnter={() => setHovered(index)}
              >
                <h3 className="relative inline-flex flex-col">
                  <span className="mono-label transition-colors duration-200 group-hover:text-ink">
                    {group.label}
                  </span>
                  <span className="relative mt-1.5 block h-0.5 w-full">
                    <AnimatePresence>
                      {hovered === index && (
                        <motion.span
                          layoutId="skills-underline"
                          initial={reduced ? { opacity: 0 } : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            layout: { type: 'spring', stiffness: 420, damping: 38 },
                            opacity: { duration: 0.18 },
                          }}
                          className="absolute inset-0 bg-accent"
                        />
                      )}
                    </AnimatePresence>
                  </span>
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-ink-2 transition-[color,translate] duration-200 hover:translate-x-1 hover:text-ink"
                    >
                      {item}
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
