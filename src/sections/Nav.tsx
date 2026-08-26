import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import Container from '../components/Container'
import { useLenis } from '../lib/scroll'
import { RouteLink, useRouter, type Route } from '../lib/router'
import { useCopy, useI18n } from '../lib/i18n'
import { EMAIL } from '../content/site'

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-mono text-[0.9375rem] font-semibold tracking-tight text-fg ${className}`}
    >
      <span aria-hidden="true" className="text-signal">
        ~
      </span>
      /lohrer.dev
    </span>
  )
}

/** Tab link with the shared active underline travelling between tabs. */
function NavTab({ route, label }: { route: Route; label: string }) {
  const { route: current } = useRouter()
  const active = current === route
  return (
    <RouteLink to={route} aria-current={active ? 'page' : undefined} className="nav-link">
      {label}
      {active ? (
        <motion.span
          layoutId="nav-tab-underline"
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-accent"
          transition={{ type: 'spring', stiffness: 420, damping: 40 }}
        />
      ) : null}
    </RouteLink>
  )
}

/** en / de switch — mono, quiet, aria-pressed carries the state. */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()
  const t = useCopy()
  const cls = (active: boolean) =>
    `font-mono text-[0.8438rem] transition-colors duration-150 ${
      active ? 'text-fg underline decoration-accent underline-offset-4' : 'text-fg-3 hover:text-fg'
    }`
  return (
    <div role="group" aria-label={t.a11y.langSwitch} className={`flex items-center ${className}`}>
      <button
        type="button"
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
        className={cls(lang === 'en')}
      >
        en
      </button>
      <span className="mx-1.5 text-fg-3/60 select-none" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        aria-pressed={lang === 'de'}
        onClick={() => setLang('de')}
        className={cls(lang === 'de')}
      >
        de
      </button>
    </div>
  )
}

export default function Nav() {
  const t = useCopy()
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
          scrolled ? 'border-line bg-base/90 backdrop-blur-sm' : 'border-transparent'
        }`}
      >
        <Container size="wide" className="flex h-16 items-center justify-between gap-6 md:h-18">
          <RouteLink to="/" aria-label={t.a11y.home}>
            <Wordmark />
          </RouteLink>

          <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-7 lg:flex">
            {t.nav.tabs.map((tab) => (
              <NavTab key={tab.route} route={tab.route} label={tab.label} />
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <LangToggle />
            <RouteLink
              to="/contact"
              className="group hidden items-center gap-2 font-mono text-xs whitespace-nowrap text-fg-2 transition-colors duration-150 hover:text-fg xl:inline-flex"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal ring-3 ring-signal/15"
              />
              {t.nav.availability}
            </RouteLink>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <LangToggle />
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
              className="relative z-70 -mr-2 flex h-10 w-10 items-center justify-center text-fg"
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-px w-5 bg-fg transition-transform duration-300 ${
                    open ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 bg-fg transition-transform duration-300 ${
                    open ? 'top-1/2 -rotate-45' : 'bottom-0'
                  }`}
                />
              </span>
            </button>
          </div>
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
  const t = useCopy()
  const { route } = useRouter()
  const reduced = useReducedMotion()
  return (
    <motion.div
      ref={overlayRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.a11y.menu}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-base lg:hidden"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: reduced ? 0.1 : 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-16 items-center justify-between border-b border-line px-5 sm:px-8">
        <Wordmark />
        <button
          type="button"
          onClick={onClose}
          aria-label={t.a11y.menuClose}
          className="-mr-2 flex h-10 w-10 items-center justify-center text-fg"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <nav aria-label={t.a11y.mainNav} className="flex flex-1 flex-col px-5 pt-2 sm:px-8">
        <ul className="flex flex-col">
          {t.nav.tabs.map((tab, index) => (
            <li key={tab.route} className="border-b border-line">
              <RouteLink
                to={tab.route}
                onClick={onClose}
                aria-current={route === tab.route ? 'page' : undefined}
                className="flex items-baseline gap-5 py-5 font-mono text-2xl font-medium tracking-tight text-fg"
              >
                <span className="font-mono text-xs text-fg-3" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {tab.label}
                {route === tab.route ? (
                  <span aria-hidden="true" className="text-accent">
                    *
                  </span>
                ) : null}
              </RouteLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-5 px-5 pt-8 pb-10 sm:px-8">
        <RouteLink
          to="/contact"
          onClick={onClose}
          className="inline-flex items-center gap-2 font-mono text-xs text-fg-2"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal ring-3 ring-signal/15"
          />
          {t.nav.availability}
        </RouteLink>
        <p className="font-mono text-xs text-fg-2">
          <a href={`mailto:${EMAIL}`} className="link-accent">
            {EMAIL}
          </a>
        </p>
      </div>
    </motion.div>
  )
}
