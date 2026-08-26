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
import Portrait from '../components/Portrait'
import { buttonClasses } from '../components/Button'
import { ArrowRight } from '../components/doodles'
import { RouteLink } from '../lib/router'
import { useCopy } from '../lib/i18n'

function RotatingWord({ words }: { words: readonly string[] }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
    if (reduced) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 3200)
    return () => window.clearInterval(id)
  }, [reduced, words])

  const word = words[index % words.length]
  return (
    <span className="inline-flex overflow-hidden border-b border-accent/40 pb-0.5 text-accent">
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

/* ---------- Blurry drifting snowflakes (decorative) ---------- */

function SnowflakeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M24 4v40M6.7 14l34.6 20M6.7 34 41.3 14" />
        <path d="m24 11-4.5-4.5M24 11l4.5-4.5M24 37l-4.5 4.5M24 37l4.5 4.5" />
        <path d="m12 17-6-1M12 17l-1-6M36 31l6 1M36 31l1 6" />
        <path d="m12 31-1 6M12 31l-6 1M36 17l1-6M36 17l6-1" />
      </g>
    </svg>
  )
}

interface FlakeConfig {
  pos: string
  size: string
  color: string
  blur: number
  opacity: number
  parallax: number
  duration: string
  delay: string
  reverse?: boolean
  hide?: string
}

const FLAKES: FlakeConfig[] = [
  // Große, nahe Flocken (stärkere Parallaxe, mehr Blur)
  {
    pos: 'top-[16%] right-[12%]',
    size: 'h-20 w-20',
    color: 'text-accent',
    blur: 3.5,
    opacity: 0.3,
    parallax: -34,
    duration: '46s',
    delay: '-12s',
    reverse: true,
  },
  {
    pos: 'bottom-[14%] right-[24%]',
    size: 'h-16 w-16',
    color: 'text-line-strong',
    blur: 3,
    opacity: 0.55,
    parallax: 30,
    duration: '52s',
    delay: '-30s',
  },
  {
    pos: 'top-[52%] left-[4%]',
    size: 'h-16 w-16',
    color: 'text-line-strong',
    blur: 3.5,
    opacity: 0.5,
    parallax: -26,
    duration: '48s',
    delay: '-8s',
    reverse: true,
    hide: 'hidden md:block',
  },
  // Mittlere Ebene
  {
    pos: 'top-[12%] left-[10%]',
    size: 'h-11 w-11',
    color: 'text-line-strong',
    blur: 2,
    opacity: 0.6,
    parallax: 22,
    duration: '38s',
    delay: '0s',
  },
  {
    pos: 'top-[34%] right-[30%]',
    size: 'h-10 w-10',
    color: 'text-accent',
    blur: 2,
    opacity: 0.26,
    parallax: -18,
    duration: '40s',
    delay: '-22s',
    hide: 'hidden lg:block',
  },
  {
    pos: 'bottom-[30%] right-[7%]',
    size: 'h-12 w-12',
    color: 'text-line-strong',
    blur: 2.5,
    opacity: 0.55,
    parallax: 24,
    duration: '44s',
    delay: '-16s',
  },
  {
    pos: 'top-[64%] left-[26%]',
    size: 'h-9 w-9',
    color: 'text-line-strong',
    blur: 2,
    opacity: 0.5,
    parallax: 16,
    duration: '36s',
    delay: '-5s',
    hide: 'hidden sm:block',
  },
  {
    pos: 'top-[8%] right-[38%]',
    size: 'h-9 w-9',
    color: 'text-line-strong',
    blur: 1.5,
    opacity: 0.55,
    parallax: 14,
    duration: '34s',
    delay: '-26s',
    hide: 'hidden md:block',
  },
  // Ferne, kleine Flocken (wenig Parallaxe, scharf-klein)
  {
    pos: 'top-[26%] left-[30%]',
    size: 'h-6 w-6',
    color: 'text-line-strong',
    blur: 1,
    opacity: 0.45,
    parallax: 8,
    duration: '30s',
    delay: '-14s',
    hide: 'hidden lg:block',
  },
  {
    pos: 'top-[44%] right-[18%]',
    size: 'h-7 w-7',
    color: 'text-accent',
    blur: 1.5,
    opacity: 0.24,
    parallax: -10,
    duration: '32s',
    delay: '-2s',
  },
  {
    pos: 'bottom-[22%] left-[14%]',
    size: 'h-7 w-7',
    color: 'text-line-strong',
    blur: 1,
    opacity: 0.5,
    parallax: 10,
    duration: '28s',
    delay: '-19s',
    hide: 'hidden sm:block',
  },
  {
    pos: 'top-[74%] right-[36%]',
    size: 'h-6 w-6',
    color: 'text-line-strong',
    blur: 1.5,
    opacity: 0.45,
    parallax: -8,
    duration: '30s',
    delay: '-9s',
    hide: 'hidden lg:block',
  },
  {
    pos: 'bottom-[8%] left-[34%]',
    size: 'h-8 w-8',
    color: 'text-accent',
    blur: 2,
    opacity: 0.2,
    parallax: 12,
    duration: '42s',
    delay: '-35s',
    hide: 'hidden md:block',
  },
]

function Flake({
  config,
  mx,
  my,
  reduced,
}: {
  config: FlakeConfig
  mx: MotionValue<number>
  my: MotionValue<number>
  reduced: boolean
}) {
  const x = useTransform(mx, (v) => v * config.parallax)
  const y = useTransform(my, (v) => v * config.parallax)
  return (
    <motion.div
      style={reduced ? undefined : { x, y }}
      className={`absolute ${config.pos} ${config.hide ?? ''}`}
    >
      <div
        className="motion-safe:animate-drift"
        style={{
          animationDuration: config.duration,
          animationDelay: config.delay,
          animationDirection: config.reverse ? 'alternate-reverse' : 'alternate',
          filter: `blur(${config.blur}px)`,
          opacity: config.opacity,
        }}
      >
        <SnowflakeIcon className={`${config.size} ${config.color}`} />
      </div>
    </motion.div>
  )
}

/**
 * `$ whoami` landing hero: terminal prompt, circular portrait, name +
 * rotating specialty, short bio, mono metadata, CTAs into the tabs.
 * Mirrored by the static shell in index.html — keep classes in sync.
 */
export default function Hero() {
  const t = useCopy()
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

  const meta = [
    { key: t.whoami.metaKeys.location, value: t.whoami.meta.location },
    { key: t.whoami.metaKeys.availability, value: t.whoami.meta.availability },
    { key: t.whoami.metaKeys.languages, value: t.whoami.meta.languages },
  ]

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

      {/* Blurry snowflakes wandering slowly, parallax to the pointer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {FLAKES.map((config, index) => (
          <Flake key={index} config={config} mx={smoothX} my={smoothY} reduced={reduced ?? false} />
        ))}
      </div>

      {/* Accent hairline drifting against the grid */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: ruleY }}
        className="pointer-events-none absolute top-[30%] right-0 hidden h-px w-[26vw] bg-linear-to-r from-transparent to-accent/45 lg:block"
      />

      <motion.div
        style={reduced ? undefined : { y: contentY }}
        className="relative z-10 flex flex-1"
      >
        <Container size="wide" className="flex flex-1 flex-col justify-center pb-24 md:pb-28">
          <div className="max-w-4xl">
            <p className="font-mono text-sm md:text-[0.9375rem]">
              <span className="text-signal">malte@lohrer.dev</span>
              <span className="text-fg-3">:~$</span>{' '}
              <span className="text-fg">{t.whoami.prompt}</span>
              <span
                aria-hidden="true"
                className="ml-1.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-accent motion-safe:animate-blink"
              />
            </p>

            <div className="mt-9 flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-10">
              <Portrait />
              <div>
                <h1 className="text-hero text-fg">Malte Lohrer</h1>
                <p className="mt-3 text-lg font-medium tracking-tight text-fg-2 md:text-2xl">
                  {t.whoami.intro}{' '}
                  <span className="mt-1 block md:mt-1.5">
                    <RotatingWord words={t.whoami.rotating} />
                  </span>
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-2xl text-lead text-fg-2">{t.whoami.lead}</p>

            <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2 font-mono text-xs">
              {meta.map((item) => (
                <li key={item.key} className="whitespace-nowrap">
                  <span className="text-fg-3">{item.key}:</span>{' '}
                  <span className="text-fg-2">{item.value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <RouteLink to="/contact" className={buttonClasses('primary', 'lg', 'group')}>
                {t.whoami.ctaContact}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </RouteLink>
              <RouteLink to="/projects" className={buttonClasses('secondary', 'lg')}>
                {t.whoami.ctaProjects}
              </RouteLink>
            </div>
          </div>
        </Container>
      </motion.div>

      <motion.a
        href="#trust"
        aria-label={t.whoami.scrollCue}
        style={reduced ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-8 left-5 z-10 hidden items-center gap-3 sm:left-8 md:flex"
      >
        <span aria-hidden="true" className="block h-px w-10 bg-line-strong" />
        <span className="mono-label">{t.whoami.scrollCue}</span>
      </motion.a>
    </section>
  )
}
