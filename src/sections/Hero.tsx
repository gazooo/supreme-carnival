import { useEffect, useRef, useState, type PointerEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import Container from '../components/Container'
import AvailabilityBadge from '../components/AvailabilityBadge'
import { ButtonLink } from '../components/Button'
import { ArrowRight } from '../components/doodles'
import { MAILTO } from '../content/site'

const ROTATING = ['CI/CD-Plattformen', 'LLM-Agenten', 'KI-Automatisierung'] as const

function RotatingWord() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 3200)
    return () => window.clearInterval(id)
  }, [reduced])

  const word = ROTATING[index]
  return (
    <span className="inline-flex overflow-hidden border-b border-accent/40 pb-1 text-accent">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={reduced ? false : { opacity: 0, y: '0.4em' }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: '-0.4em' }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Mouse parallax, deliberately tiny (normalized -0.5 … 0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 44, damping: 16 })
  const smoothY = useSpring(mouseY, { stiffness: 44, damping: 16 })

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse') return
    mouseX.set(event.clientX / window.innerWidth - 0.5)
    mouseY.set(event.clientY / window.innerHeight - 0.5)
  }

  // Layered parallax: grid drifts one way, the rule and content another
  const gridScrollY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const gridY = useTransform<number, number>([gridScrollY, smoothY], ([s, m]) => s + m * 10)
  const gridX = useTransform(smoothX, (v) => v * 10)
  const ruleY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 56])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative flex min-h-svh flex-col overflow-hidden pt-24 md:pt-32"
    >
      {/* Technical grid backdrop */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: gridY, x: gridX }}
        className="absolute inset-0 -top-24 opacity-70"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)',
            backgroundSize: '76px 76px',
            maskImage: 'radial-gradient(115% 85% at 22% 32%, #000 12%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(115% 85% at 22% 32%, #000 12%, transparent 72%)',
          }}
        />
      </motion.div>

      {/* Accent hairline drifting against the grid */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: ruleY }}
        className="pointer-events-none absolute top-[38%] right-0 hidden h-px w-[26vw] bg-linear-to-r from-transparent to-accent/45 lg:block"
      />

      <motion.div
        style={reduced ? undefined : { y: contentY }}
        className="relative z-10 flex flex-1"
      >
        <Container size="wide" className="flex flex-1 flex-col justify-center pb-24 md:pb-28">
          <div className="max-w-4xl">
            <p className="mono-label">
              Malte Lohrer
              <span className="mx-2 opacity-40" aria-hidden="true">
                /
              </span>
              DevOps &amp; Platform Engineer
            </p>

            <h1 className="mt-7 text-hero text-ink">
              Ich baue und betreibe
              <span className="mt-2 block">
                <RotatingWord />
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lead text-ink-2">
              Über zehn Jahre IT: vier Jahre CI/CD-Plattform für die In-Car-UI-Entwicklung von
              Mercedes-Benz, zuletzt agentische KI-Assistenten in Produktion. Ich liefere Systeme,
              die im Alltag bestehen – gebaut, dokumentiert, betrieben.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href={MAILTO} size="lg">
                Projekt anfragen
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink variant="secondary" size="lg" href="#leistungen">
                Leistungen ansehen
              </ButtonLink>
            </div>

            {/* Desktop shows the badge persistently in the nav — avoid doubling it */}
            <AvailabilityBadge className="mt-9 lg:hidden" />
          </div>
        </Container>
      </motion.div>

      <motion.a
        href="#leistungen"
        aria-label="Weiter zu den Leistungen scrollen"
        style={reduced ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-8 left-5 z-10 hidden items-center gap-3 sm:left-8 md:flex"
      >
        <span aria-hidden="true" className="block h-px w-10 bg-line-strong" />
        <span className="mono-label">Scrollen</span>
      </motion.a>
    </section>
  )
}
