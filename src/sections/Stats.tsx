import Container from '../components/Container'
import CountUp from '../components/CountUp'
import Reveal from '../components/Reveal'

const STATS = [
  { value: 10, suffix: '+', label: 'Jahre IT – seit 2015' },
  { value: 4, suffix: '', label: 'Jahre CI/CD-Plattform für Mercedes-Benz In-Car-UI' },
  { value: 8, suffix: '', label: 'Dienste im Produktivbetrieb' },
  { value: 7, suffix: '', label: 'CI-Workflows' },
  { value: 172000, suffix: '', prefix: '≈', label: 'Zeilen Code als Solo-Entwickler' },
] as const

export default function Stats() {
  return (
    <section aria-label="Zahlen" className="border-y border-line bg-paper-alt py-14 md:py-18">
      <Container size="wide">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.06}
              className="flex h-full flex-col gap-2 lg:border-l lg:border-line-strong/60 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="order-2 max-w-[13rem] font-mono text-xs leading-relaxed text-ink-3">
                {stat.label}
              </dt>
              <dd className="order-1 text-[clamp(1.7rem,1.05vw+1.25rem,2.6rem)] font-semibold tracking-tight whitespace-nowrap text-ink tabular-nums">
                {'prefix' in stat ? (
                  <span aria-hidden="true" className="text-[0.7em] align-[0.08em]">
                    {stat.prefix}{' '}
                  </span>
                ) : null}
                <CountUp to={stat.value} />
                {stat.suffix}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  )
}
