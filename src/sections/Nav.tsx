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
import { useLenis } from '../lib/scroll'
import { EMAIL, MAILTO, NAV_LINKS, PHONE_DISPLAY, PHONE_TEL } from '../content/site'

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`text-[0.9375rem] font-semibold tracking-tight ${className}`}>
      Malte Lohrer
    </span>
  )
}

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
    overlayRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
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
        className={`border-b transition-[background-color,border-color] duration-300 ${
          scrolled ? 'border-line bg-paper/90 backdrop-blur-sm' : 'border-transparent'
        }`}
      >
        <Container size="wide" className="flex h-16 items-center justify-between gap-6 md:h-18">
          <a href="#hero" aria-label="Malte Lohrer – zum Seitenanfang" className="text-ink">
            <Wordmark />
          </a>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <AvailabilityBadge />
            <ButtonLink href={MAILTO} size="sm">
              Projekt anfragen
            </ButtonLink>
          </div>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            className="relative z-70 -mr-2 flex h-10 w-10 items-center justify-center text-ink lg:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? 'top-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? 'top-1/2 -rotate-45' : 'bottom-0'
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
      className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-paper lg:hidden"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: reduced ? 0.1 : 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-16 items-center justify-between border-b border-line px-5 sm:px-8">
        <Wordmark className="text-ink" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Menü schließen"
          className="-mr-2 flex h-10 w-10 items-center justify-center text-ink"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <nav aria-label="Hauptnavigation" className="flex flex-1 flex-col px-5 pt-2 sm:px-8">
        <ul className="flex flex-col">
          {NAV_LINKS.map((link, index) => (
            <li key={link.href} className="border-b border-line">
              <a
                href={link.href}
                onClick={onClose}
                className="flex items-baseline gap-5 py-5 text-2xl font-medium tracking-tight text-ink"
              >
                <span className="font-mono text-xs text-ink-3">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-5 px-5 pt-8 pb-10 sm:px-8">
        <AvailabilityBadge />
        <ButtonLink href={MAILTO} size="lg" className="self-start" onClick={onClose}>
          Projekt anfragen
        </ButtonLink>
        <p className="font-mono text-xs text-ink-2">
          <a href={`mailto:${EMAIL}`} className="link-accent">
            {EMAIL}
          </a>
          <span className="mx-2 text-ink-3">·</span>
          <a href={`tel:${PHONE_TEL}`} className="link-accent">
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    </motion.div>
  )
}
