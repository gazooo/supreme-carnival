import { useEffect, useRef, useState, type PointerEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import Container from '../components/Container'
import Chip from '../components/Chip'
import { ButtonLink } from '../components/Button'
import Magnetic from '../components/Magnetic'
import { ArrowRight, Asterisk, Squiggle } from '../components/doodles'
import { EASE } from '../lib/motion'
import { MAILTO } from '../content/site'

const ROTATING = [
  { word: 'CI/CD-Plattformen', bg: 'bg-mint' },
  { word: 'LLM-Agenten', bg: 'bg-lavender' },
  { word: 'KI-Automatisierung', bg: 'bg-peach' },
] as const

function RotatingWord() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2800)
    return () => window.clearInterval(id)
  }, [reduced])

  const { word, bg } = ROTATING[index]
  return (
    <span className="mt-4 inline-flex overflow-hidden py-2">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={reduced ? false : { y: '110%' }}
          animate={{ y: 0 }}
          exit={reduced ? undefined : { y: '-110%' }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`inline-block max-w-full -rotate-1 rounded-2xl border-2 border-ink px-3 pb-2 text-[0.72em] whitespace-nowrap shadow-pop sm:px-6 md:text-[1em] ${bg}`}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Combines a scroll-parallax offset with a mouse-parallax offset. */
function useLayer(
  progress: MotionValue<number>,
  scrollDistance: number,
  mouse: MotionValue<number>,
  mouseDistance: number,
) {
  const scrollPart = useTransform(progress, [0, 1], [0, scrollDistance])
  return useTransform<number, number>([scrollPart, mouse], ([s, m]) => s + m * mouseDistance)
}

export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Mouse parallax (desktop only; normalized -0.5 … 0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 14 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 14 })

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse') return
    mouseX.set(event.clientX / window.innerWidth - 0.5)
    mouseY.set(event.clientY / window.innerHeight - 0.5)
  }

  // Layers at different scroll speeds + mouse depths
  const blobMintY = useLayer(scrollYProgress, 130, smoothY, 26)
  const blobMintX = useTransform(smoothX, (v) => v * 26)
  const blobLavenderY = useLayer(scrollYProgress, -170, smoothY, -38)
  const blobLavenderX = useTransform(smoothX, (v) => v * -38)
  const blobSkyY = useLayer(scrollYProgress, 90, smoothY, 18)
  const blobSkyX = useTransform(smoothX, (v) => v * 18)
  const shapeButterY = useLayer(scrollYProgress, 230, smoothY, 52)
  const shapeButterX = useTransform(smoothX, (v) => v * 52)
  const shapeButterRotate = useTransform(scrollYProgress, [0, 1], [10, 38])
  const shapePeachY = useLayer(scrollYProgress, -120, smoothY, -30)
  const shapePeachX = useTransform(smoothX, (v) => v * -30)
  const doodleY = useLayer(scrollYProgress, 170, smoothY, 44)
  const doodleX = useTransform(smoothX, (v) => v * 44)

  // Content drifts slower than the page and fades out
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const intro = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 34 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  }

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative flex min-h-svh flex-col overflow-hidden pt-24 md:pt-32"
    >
      {/* Parallax background layers */}
      <div aria-hidden="true" className="absolute inset-0">
        <motion.div
          style={reduced ? undefined : { y: blobMintY, x: blobMintX }}
          className="absolute -top-36 -left-44 h-[32rem] w-[32rem] sm:h-[44rem] sm:w-[44rem]"
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: 'radial-gradient(closest-side, var(--color-mint), transparent 72%)' }}
          />
        </motion.div>
        <motion.div
          style={reduced ? undefined : { y: blobLavenderY, x: blobLavenderX }}
          className="absolute -right-52 top-1/4 h-[36rem] w-[36rem] sm:h-[50rem] sm:w-[50rem]"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: 'radial-gradient(closest-side, var(--color-lavender), transparent 72%)',
            }}
          />
        </motion.div>
        <motion.div
          style={reduced ? undefined : { y: blobSkyY, x: blobSkyX }}
          className="absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] sm:h-[34rem] sm:w-[34rem]"
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: 'radial-gradient(closest-side, var(--color-sky), transparent 72%)' }}
          />
        </motion.div>

        {/* Crisp playful shapes */}
        <motion.div
          style={reduced ? undefined : { y: shapeButterY, x: shapeButterX, rotate: shapeButterRotate }}
          className="absolute top-[20%] right-[10%] hidden sm:block"
        >
          <div
            className="h-14 w-14 rounded-2xl border-2 border-ink bg-butter shadow-pop-sm motion-safe:animate-float"
            style={{ animationDelay: '0.6s' }}
          />
        </motion.div>
        <motion.div
          style={reduced ? undefined : { y: shapePeachY, x: shapePeachX }}
          className="absolute bottom-[8%] -left-6 hidden md:block"
        >
          <div className="h-16 w-16 rounded-full border-2 border-ink bg-peach shadow-pop-sm motion-safe:animate-float-slow" />
        </motion.div>
        <motion.div
          style={reduced ? undefined : { y: doodleY, x: doodleX }}
          className="absolute top-[16%] left-[38%] hidden lg:block"
        >
          <Asterisk className="h-10 w-10 text-mint-strong motion-safe:animate-float" />
        </motion.div>
        <motion.div
          style={reduced ? undefined : { y: shapePeachY, x: shapePeachX }}
          className="absolute right-[22%] bottom-[14%] hidden sm:block"
        >
          <Squiggle className="h-6 w-36 text-lavender-strong" />
        </motion.div>
      </div>

      <motion.div style={reduced ? undefined : { y: contentY }} className="relative z-10 flex flex-1">
        <Container size="wide" className="flex flex-1 flex-col justify-center pb-24 md:pb-28">
          <motion.div
            variants={intro}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            className="max-w-5xl"
          >
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <Chip variant="sticker" tone="white" rotate={-2}>
                Malte Lohrer
              </Chip>
              <Chip variant="sticker" tone="butter" rotate={1.5}>
                DevOps &amp; Platform Engineer
              </Chip>
            </motion.div>

            <motion.h1 variants={item} className="mt-8 font-display text-hero text-ink">
              Ich baue und betreibe
              <span className="block">
                <RotatingWord />
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-8 max-w-2xl text-lead text-ink-soft">
              Über zehn Jahre IT: vier Jahre CI/CD-Plattform für die In-Car-UI-Entwicklung von
              Mercedes-Benz, zuletzt agentische KI-Assistenten in Produktion. Ich liefere Systeme,
              die im Alltag bestehen – gebaut, dokumentiert, betrieben.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <ButtonLink href={MAILTO} size="lg">
                  Projekt anfragen
                  <ArrowRight className="h-5 w-5" />
                </ButtonLink>
              </Magnetic>
              <ButtonLink variant="secondary" size="lg" href="#leistungen">
                Leistungen ansehen
              </ButtonLink>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#leistungen"
        aria-label="Weiter zu den Leistungen scrollen"
        style={reduced ? undefined : { opacity: indicatorOpacity }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink"
      >
        <span className="relative block h-10 w-6 rounded-full border-2 border-ink" aria-hidden="true">
          <span className="absolute top-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink motion-safe:animate-scroll-dot" />
        </span>
        <span className="font-display text-xs font-medium tracking-widest uppercase">Scrollen</span>
      </motion.a>
    </section>
  )
}
