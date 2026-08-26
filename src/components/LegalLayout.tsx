import type { ReactNode } from 'react'
import Container from './Container'
import { RouteLink } from '../lib/router'
import { ArrowRight } from './doodles'
import { useCopy } from '../lib/i18n'

/**
 * Shared frame for Impressum & Datenschutz: printable document layout.
 * The documents themselves stay German (legally binding version); when the
 * UI language is English, a short note says so.
 */
export default function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  const t = useCopy()

  return (
    <div className="min-h-svh">
      <header className="border-b border-line print:hidden">
        <Container size="wide" className="flex h-16 items-center justify-between md:h-18">
          <RouteLink
            to="/"
            className="font-mono text-[0.9375rem] font-semibold tracking-tight text-fg"
          >
            <span aria-hidden="true" className="text-signal">
              ~
            </span>
            /lohrer.dev
          </RouteLink>
          <RouteLink
            to="/"
            className="link-accent inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            {t.legal.backHome}
          </RouteLink>
        </Container>
      </header>
      <main id="main" lang="de" className="pt-12 pb-24 print:pt-0">
        <Container size="narrow">
          <h1 className="text-display text-fg">{title}</h1>
          {t.legal.note ? (
            <p lang="en" className="mono-comment mt-4">
              {t.legal.note}
            </p>
          ) : null}
          <div className="legal-prose mt-10">{children}</div>
        </Container>
      </main>
      <footer className="border-t border-line py-8 print:hidden">
        <Container size="narrow" className="flex flex-wrap items-center gap-6 text-sm text-fg-3">
          <RouteLink to="/" className="underline underline-offset-4 hover:text-fg">
            {t.legal.home}
          </RouteLink>
          <RouteLink to="/impressum" className="underline underline-offset-4 hover:text-fg">
            {t.footer.imprint}
          </RouteLink>
          <RouteLink to="/datenschutz" className="underline underline-offset-4 hover:text-fg">
            {t.footer.privacy}
          </RouteLink>
        </Container>
      </footer>
    </div>
  )
}
