import { useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import { buttonClasses } from '../components/Button'
import { RouteLink, useRouter } from '../lib/router'
import { useCopy, useI18n } from '../lib/i18n'

export function LangToggle() {
  const { lang, setLang } = useI18n()
  const t = useCopy()
  return (
    <div role="group" aria-label={t.a11y.langSwitch} className="flex items-center gap-1">
      {(['de', 'en'] as const).map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={lang === value}
          onClick={() => setLang(value)}
          className={
            'min-h-11 min-w-9 rounded text-xs font-semibold uppercase ' +
            (lang === value
              ? 'text-accent underline underline-offset-4'
              : 'text-fg-3 hover:text-accent')
          }
        >
          {value}
        </button>
      ))}
    </div>
  )
}

export default function Nav() {
  const t = useCopy()
  const { route } = useRouter()
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const close = () => dialogRef.current?.close()

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (query.matches) dialogRef.current?.close()
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = previous
    }
  }, [open])

  const links = t.nav.tabs.map((tab) => (
    <RouteLink
      key={tab.route}
      to={tab.route}
      onClick={close}
      aria-current={route === tab.route ? 'page' : undefined}
      className="nav-link"
    >
      {tab.label}
    </RouteLink>
  ))

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas">
      <Container size="wide" className="flex h-20 items-center justify-between gap-4">
        <RouteLink to="/" aria-label={t.a11y.home} className="flex min-h-11 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-xs font-semibold text-white"
          >
            ML
          </span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">Malte Lohrer</span>
        </RouteLink>
        <div className="hidden items-center gap-7 lg:flex">
          <nav aria-label={t.a11y.mainNav} className="flex gap-6">
            {links}
          </nav>
          <LangToggle />
          <RouteLink to="/contact" className={buttonClasses('primary', 'sm')}>
            {t.nav.cta}
          </RouteLink>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LangToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.a11y.menuOpen}
            onClick={() => {
              dialogRef.current?.showModal()
              setOpen(true)
            }}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-line"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </Container>
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label={t.a11y.menu}
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-canvas p-6 text-fg backdrop:bg-fg/30"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Malte Lohrer</span>
          <button
            type="button"
            onClick={close}
            aria-label={t.a11y.menuClose}
            className="h-11 w-11 rounded-md border border-line text-2xl"
          >
            ×
          </button>
        </div>
        <nav
          aria-label={t.a11y.mainNav}
          className="mt-8 flex flex-col gap-4 border-y border-line py-6"
        >
          {links}
        </nav>
        <p className="mt-8 text-sm text-fg-2">{t.nav.availability}</p>
        <RouteLink to="/contact" onClick={close} className={buttonClasses('primary', 'lg', 'mt-5')}>
          {t.nav.cta}
        </RouteLink>
        <div className="mt-6">
          <LangToggle />
        </div>
      </dialog>
    </header>
  )
}
