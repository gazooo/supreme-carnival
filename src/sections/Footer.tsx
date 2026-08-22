import Container from '../components/Container'
import { RouteLink } from '../lib/router'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink-line bg-ink py-10 text-paper">
      <Container size="wide">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-[0.9375rem] font-semibold tracking-tight">Malte Lohrer</p>
            <p className="mt-1 font-mono text-xs text-ink-2-on-dark">© {year} Malte Lohrer</p>
          </div>
          <nav aria-label="Rechtliches" className="flex items-center gap-6">
            <RouteLink
              to="/impressum"
              className="on-ink text-sm text-ink-2-on-dark underline-offset-4 hover:text-paper hover:underline"
            >
              Impressum
            </RouteLink>
            <RouteLink
              to="/datenschutz"
              className="on-ink text-sm text-ink-2-on-dark underline-offset-4 hover:text-paper hover:underline"
            >
              Datenschutz
            </RouteLink>
            <a
              href="#hero"
              className="on-ink text-sm text-ink-2-on-dark underline-offset-4 hover:text-paper hover:underline"
            >
              Nach oben ↑
            </a>
          </nav>
          <p className="font-mono text-xs text-ink-2-on-dark">Made in Esslingen</p>
        </div>
      </Container>
    </footer>
  )
}
