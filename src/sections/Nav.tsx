import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import Container from '../components/Container'
import AvailabilityBadge from '../components/AvailabilityBadge'
import { ButtonLink } from '../components/Button'
import { EASE, fadeRise, staggerParent } from '../lib/motion'
import { useLenis } from '../lib/scroll'
import { EMAIL, MAILTO, NAV_LINKS, PHONE_DISPLAY, PHONE_TEL } from '../content/site'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const lenis = useLenis()
  const burgerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 16))

  // Scroll lock + Escape + focus management while the overlay is open
  useEffect(() => {
    if (!open) return
    const burger = burgerRef.current
    lenis?.stop()
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const closeButton = overlayRef.current?.querySelector<HTMLButtonElement>('button')
    closeButton?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = previousOverflow
      lenis?.start()
      window.removeEventListener('keydown', onKey)
      burger?.focus()
    }
  }, [open, lenis])

  // Minimal focus trap inside the dialog overlay
  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !overlayRef.current) return
    const focusables = Array.from(
      overlayRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? 'border-b border-ink/10 bg-cream/85 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <Container size="wide" className="flex h-16 items-center justify-between gap-4 md:h-18">
          <a
            href="#hero"
            className="font-display text-xl font-bold tracking-tight text-ink"
            aria-label="Malte Lohrer – zum Seitenanfang"
          >
            Malte Lohrer<span className="text-peach-strong">.</span>
          </a>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <AvailabilityBadge />
            <ButtonLink href={MAILTO} size="sm">
              Projekt anfragen
            </ButtonLink>
          </div>

          {/* Burger */}
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            className="relative z-70 flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-white shadow-pop-sm transition-transform duration-200 active:scale-95 lg:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-ink transition-transform duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-ink transition-transform duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <MobileOverlay
            overlayRef={overlayRef}
            onClose={() => setOpen(false)}
            onKeyDown={trapFocus}
          />
        )}
      </AnimatePresence>
    </header>
  )
}

function MobileOverlay({
  overlayRef,
  onClose,
  onKeyDown,
}: {
  overlayRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
  onKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      ref={overlayRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menü"
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-cream lg:hidden"
      initial={reduced ? { opacity: 0 } : { y: '-100%' }}
      animate={reduced ? { opacity: 1 } : { y: 0 }}
      exit={reduced ? { opacity: 0 } : { y: '-100%' }}
      transition={reduced ? { duration: 0.1 } : { duration: 0.45, ease: EASE }}
    >
      {/* Decorative pastel background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -right-28 h-80 w-80 rounded-full"
          style={{ background: 'radial-gradient(closest-side, var(--color-lavender), transparent 72%)' }}
        />
        <div
          className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full"
          style={{ background: 'radial-gradient(closest-side, var(--color-mint), transparent 72%)' }}
        />
        <div className="absolute right-10 bottom-40 h-12 w-12 rotate-12 rounded-xl border-2 border-ink bg-butter shadow-pop-sm" />
      </div>

      <div className="relative flex h-16 items-center justify-between px-5 sm:px-8">
        <span className="font-display text-xl font-bold tracking-tight text-ink">
          Malte Lohrer<span className="text-peach-strong">.</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Menü schließen"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-white shadow-pop-sm"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path
              d="M4 4l12 12M16 4L4 16"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <motion.nav
        aria-label="Hauptnavigation"
        className="relative flex flex-1 flex-col justify-center px-5 sm:px-8"
        variants={reduced ? undefined : staggerParent}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link, index) => (
            <motion.li key={link.href} variants={reduced ? undefined : fadeRise}>
              <a
                href={link.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 rounded-2xl px-2 py-3 font-display text-4xl font-semibold text-ink"
              >
                <span className="text-base font-medium text-ink-soft">0{index + 1}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                  {link.label}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      <div className="relative flex flex-col gap-4 px-5 pb-10 sm:px-8">
        <AvailabilityBadge className="self-start" />
        <ButtonLink href={MAILTO} size="lg" className="self-start" onClick={onClose}>
          Projekt anfragen
        </ButtonLink>
        <p className="text-sm text-ink-soft">
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
            {EMAIL}
          </a>{' '}
          ·{' '}
          <a href={`tel:${PHONE_TEL}`} className="underline underline-offset-4">
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    </motion.div>
  )
}
