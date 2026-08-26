import type { ReactNode } from 'react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip from '../components/Chip'
import Reveal from '../components/Reveal'
import { useCopy } from '../lib/i18n'

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

const ICONS: readonly ReactNode[] = [
  <IconAI key="ai" className="h-5 w-5" />,
  <IconApp key="app" className="h-5 w-5" />,
  <IconPipeline key="pipeline" className="h-5 w-5" />,
  <IconServer key="server" className="h-5 w-5" />,
]

export default function Services() {
  const t = useCopy()
  return (
    <section id="leistungen" className="border-t border-line py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            description={t.services.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-y-10 md:mt-20 md:grid-cols-2 md:gap-x-12 md:gap-y-14 xl:grid-cols-4 xl:gap-x-0 xl:divide-x xl:divide-line">
          {t.services.items.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 0.06}
              className={`group h-full border-t border-line pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:pt-0 xl:px-9 ${
                index === 0 ? 'xl:pl-0' : ''
              } ${index === t.services.items.length - 1 ? 'xl:pr-0' : ''}`}
            >
              <article className="flex h-full flex-col">
                <div className="flex items-center gap-3 text-fg transition-colors duration-300 group-hover:text-accent">
                  {ICONS[index]}
                  <span className="font-mono text-xs text-fg-3 transition-colors duration-300 group-hover:text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-4 text-title text-fg">{service.title}</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-2"
                    >
                      {/* Fixed-width marker box: the dash grows inside it, so the
                          text column never reflows on hover */}
                      <span aria-hidden="true" className="mt-2.5 w-5 shrink-0">
                        <span className="block h-px w-3 bg-line-strong transition-all duration-300 group-hover:w-5 group-hover:bg-accent/60" />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                {service.footnote ? (
                  <p className="mt-5 text-[0.9375rem] font-medium text-fg">{service.footnote}</p>
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
