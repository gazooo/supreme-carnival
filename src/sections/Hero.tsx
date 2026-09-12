import Container from '../components/Container'
import Portrait from '../components/Portrait'
import { buttonClasses } from '../components/Button'
import { ArrowRight } from '../components/doodles'
import { RouteLink } from '../lib/router'
import { useCopy } from '../lib/i18n'

export default function Hero() {
  const t = useCopy()
  return (
    <section className="page-space">
      <Container size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[1.65fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow max-w-lg">{t.hero.eyebrow}</p>
            <h1 className="mt-6 text-hero">
              {t.hero.title}
              <span className="block text-accent">{t.hero.titleAccent}</span>
            </h1>
            <p className="mt-7 max-w-xl text-lead text-fg-2">{t.hero.lead}</p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-fg-2">{t.hero.experience}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RouteLink to="/contact" className={buttonClasses('primary', 'lg')}>
                {t.hero.ctaContact}
                <ArrowRight className="h-4 w-4" />
              </RouteLink>
              <RouteLink to="/projects" className={buttonClasses('secondary', 'lg')}>
                {t.hero.ctaProjects}
              </RouteLink>
            </div>
            <p className="mt-7 flex items-center gap-2 text-sm text-fg-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              {t.nav.availability}
            </p>
          </div>
          <figure className="mx-auto w-full max-w-[320px] lg:max-w-[360px] lg:justify-self-end">
            <Portrait />
            <figcaption className="mt-4 text-sm font-medium">
              {t.hero.caption}
              <span className="mt-1 block text-xs font-normal leading-relaxed text-fg-2">
                {t.hero.location}
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
