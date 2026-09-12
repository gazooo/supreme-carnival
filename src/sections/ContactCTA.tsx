import Container from '../components/Container'
import { buttonClasses } from '../components/Button'
import { ArrowRight } from '../components/doodles'
import { RouteLink } from '../lib/router'
import { useCopy } from '../lib/i18n'
export default function ContactCTA() {
  const t = useCopy()
  return (
    <section className="section-space border-t border-line bg-accent-soft">
      <Container
        size="wide"
        className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
      >
        <div className="max-w-2xl">
          <h2 className="text-display">{t.contact.ctaTitle}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-2">{t.contact.ctaBody}</p>
        </div>
        <RouteLink to="/contact" className={buttonClasses('primary', 'lg', 'shrink-0')}>
          {t.contact.ctaButton}
          <ArrowRight className="h-4 w-4" />
        </RouteLink>
      </Container>
    </section>
  )
}
