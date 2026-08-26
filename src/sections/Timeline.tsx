import { useRef, type RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip from '../components/Chip'
import Reveal from '../components/Reveal'
import { useCopy } from '../lib/i18n'

export default function Timeline() {
  const t = useCopy()
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
            eyebrow={t.career.eyebrow}
            title={t.career.title}
            description={t.career.description}
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
            {t.career.stations.map((station, index) => (
              <li
                key={station.org + station.period}
                className="group relative border-b border-line py-7 pl-8 transition-colors duration-300 last:border-b-0 hover:bg-base-2/70 md:grid md:grid-cols-[11rem_1fr] md:gap-10 md:pl-10"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-[2.35rem] -left-[3.5px] h-2 w-2 rounded-full border transition-all duration-300 ${
                    station.final
                      ? 'border-accent bg-accent'
                      : 'border-line-strong bg-base group-hover:scale-125 group-hover:border-accent group-hover:bg-accent'
                  }`}
                />
                <Reveal delay={index * 0.04}>
                  <p className="font-mono text-xs text-fg-3 transition-colors duration-300 group-hover:text-fg">
                    {station.period}
                  </p>
                </Reveal>
                <Reveal delay={index * 0.04}>
                  <div className="mt-2 max-w-2xl md:mt-0">
                    <h3 className="flex flex-wrap items-center gap-3 text-title text-fg">
                      {station.org}
                      {station.final ? <Chip tone="accent">{t.career.availableChip}</Chip> : null}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] font-medium text-fg-2">{station.role}</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-3">
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
