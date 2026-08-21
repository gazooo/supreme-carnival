import { useEffect, type ReactNode } from 'react'
import Container from './Container'
import { RouteLink } from '../lib/router'
import { ArrowRight } from './doodles'

/** Shared frame for Impressum & Datenschutz: printable document layout. */
export default function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} · Malte Lohrer`
    return () => {
      document.title = previous
    }
  }, [title])

  return (
    <div className="min-h-svh">
      <header className="print:hidden">
        <Container size="wide" className="flex h-16 items-center justify-between md:h-18">
          <RouteLink to="/" className="font-display text-xl font-bold tracking-tight text-ink">
            Malte Lohrer<span className="text-peach-strong">.</span>
          </RouteLink>
          <RouteLink
            to="/"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ink underline decoration-butter-strong decoration-2 underline-offset-4"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Zurück zur Startseite
          </RouteLink>
        </Container>
      </header>
      <main id="main" className="pt-8 pb-24 print:pt-0">
        <Container size="narrow">
          <h1 className="font-display text-display text-ink">{title}</h1>
          <div className="legal-prose mt-10">{children}</div>
        </Container>
      </main>
      <footer className="border-t border-ink/10 py-8 print:hidden">
        <Container size="narrow" className="flex flex-wrap items-center gap-6 text-sm text-ink-soft">
          <RouteLink to="/" className="underline underline-offset-4 hover:text-ink">
            Startseite
          </RouteLink>
          <RouteLink to="/impressum" className="underline underline-offset-4 hover:text-ink">
            Impressum
          </RouteLink>
          <RouteLink to="/datenschutz" className="underline underline-offset-4 hover:text-ink">
            Datenschutz
          </RouteLink>
        </Container>
      </footer>
    </div>
  )
}
