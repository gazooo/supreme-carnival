import Hero from '../sections/Hero'
import TrustBar from '../sections/TrustBar'
import TechMarquee from '../sections/TechMarquee'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { ArrowRight } from '../components/doodles'
import { RouteLink } from '../lib/router'
import { useCopy } from '../lib/i18n'

/** The rest of the whoami output: fuller bio below the hero. */
function AboutMore() {
  const t = useCopy()
  return (
    <section aria-labelledby="about-heading" className="border-t border-line py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading eyebrow={t.whoami.about.eyebrow} title={t.whoami.about.heading} />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-10 grid gap-x-10 gap-y-5 md:mt-12 lg:grid-cols-[10rem_1fr]">
            <span aria-hidden="true" className="hidden lg:block" />
            <div className="flex max-w-2xl flex-col gap-5 text-lead text-fg-2">
              {t.whoami.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/** `$ ls` — the other tabs as a directory listing. */
function Explore() {
  const t = useCopy()
  return (
    <section aria-label={t.whoami.explore.heading} className="border-t border-line py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <p className="font-mono text-sm" aria-hidden="true">
            <span className="text-signal">malte@lohrer.dev</span>
            <span className="text-fg-3">:~$</span> <span className="text-fg">ls</span>
          </p>
          <h2 className="sr-only">{t.whoami.explore.heading}</h2>
        </Reveal>
        <div className="mt-8 grid gap-x-12 gap-y-2 sm:grid-cols-2">
          {t.whoami.explore.entries.map((entry, index) => (
            <Reveal key={entry.route} delay={index * 0.05}>
              <RouteLink
                to={entry.route}
                className="group flex items-baseline justify-between gap-6 border-b border-line py-4 transition-colors duration-200 hover:border-line-strong"
              >
                <span className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="font-mono text-[0.9375rem] font-medium text-accent">
                    {entry.name}
                  </span>
                  <span className="text-sm text-fg-3 transition-colors duration-200 group-hover:text-fg-2 sm:min-w-0 sm:truncate">
                    {entry.desc}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-fg-3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-fg" />
              </RouteLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <TechMarquee />
      <AboutMore />
      <Explore />
    </>
  )
}
