import Container from '../components/Container'
import { RouteLink } from '../lib/router'
import { useCopy } from '../lib/i18n'

export default function Footer() {
  const t = useCopy()
  const year = new Date().getFullYear()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-line bg-base-2 py-10">
      <Container size="wide">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-mono text-[0.9375rem] font-semibold tracking-tight text-fg">
              <span aria-hidden="true" className="text-signal">
                ~
              </span>
              /lohrer.dev
            </p>
            <p className="mt-1 font-mono text-xs text-fg-3">© {year} Malte Lohrer</p>
          </div>
          <nav aria-label={t.a11y.legalNav} className="flex items-center gap-6">
            <RouteLink
              to="/impressum"
              className="text-sm text-fg-2 underline-offset-4 hover:text-fg hover:underline"
            >
              {t.footer.imprint}
            </RouteLink>
            <RouteLink
              to="/datenschutz"
              className="text-sm text-fg-2 underline-offset-4 hover:text-fg hover:underline"
            >
              {t.footer.privacy}
            </RouteLink>
            <button
              type="button"
              onClick={scrollTop}
              className="text-sm text-fg-2 underline-offset-4 hover:text-fg hover:underline"
            >
              {t.footer.top}
            </button>
          </nav>
          <p className="font-mono text-xs text-fg-3">{t.footer.madeIn}</p>
        </div>
      </Container>
    </footer>
  )
}
