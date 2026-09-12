import Container from '../components/Container'
import { RouteLink } from '../lib/router'
import { useCopy } from '../lib/i18n'
export default function Footer() {
  const t = useCopy()
  return (
    <footer className="border-t border-line py-9">
      <Container
        size="wide"
        className="flex flex-col justify-between gap-6 md:flex-row md:items-center"
      >
        <div>
          <RouteLink to="/" className="text-base font-semibold">
            Malte Lohrer
          </RouteLink>
          <p className="mt-2 text-xs leading-relaxed text-fg-3">{t.footer.tagline}</p>
          <p className="mt-2 text-xs text-fg-3">© {new Date().getFullYear()} Malte Lohrer</p>
        </div>
        <nav aria-label={t.a11y.legalNav} className="flex flex-wrap gap-6 text-sm text-fg-2">
          <RouteLink to="/impressum" className="inline-flex min-h-11 items-center hover:underline">
            {t.footer.imprint}
          </RouteLink>
          <RouteLink
            to="/datenschutz"
            className="inline-flex min-h-11 items-center hover:underline"
          >
            {t.footer.privacy}
          </RouteLink>
          <a href="#main" className="inline-flex min-h-11 items-center hover:underline">
            {t.footer.top} ↑
          </a>
        </nav>
      </Container>
    </footer>
  )
}
