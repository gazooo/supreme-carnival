import Container from '../components/Container'
import { RouteLink } from '../lib/router'
import { Sparkle } from '../components/doodles'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-cream/10 bg-ink py-10 text-cream">
      <Container size="wide">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-lg font-bold tracking-tight">
              Malte Lohrer<span className="text-peach-strong">.</span>
            </p>
            <p className="mt-1 text-sm text-cream/60">© {year} Malte Lohrer</p>
          </div>
          <nav aria-label="Rechtliches" className="flex items-center gap-6">
            <RouteLink
              to="/impressum"
              className="on-ink text-sm font-medium text-cream/75 underline-offset-4 hover:text-cream hover:underline"
            >
              Impressum
            </RouteLink>
            <RouteLink
              to="/datenschutz"
              className="on-ink text-sm font-medium text-cream/75 underline-offset-4 hover:text-cream hover:underline"
            >
              Datenschutz
            </RouteLink>
            <a
              href="#hero"
              className="on-ink text-sm font-medium text-cream/75 underline-offset-4 hover:text-cream hover:underline"
            >
              Nach oben ↑
            </a>
          </nav>
          <p className="flex items-center gap-2 text-sm text-cream/60">
            Made in Esslingen
            <Sparkle className="h-3.5 w-3.5 text-butter" />
          </p>
        </div>
      </Container>
    </footer>
  )
}
