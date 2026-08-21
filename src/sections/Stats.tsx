import Container from '../components/Container'
import CountUp from '../components/CountUp'
import Reveal from '../components/Reveal'

const STATS = [
  { value: 10, suffix: '+', label: 'Jahre IT – seit 2015' },
  { value: 4, suffix: '', label: 'Jahre CI/CD-Plattform für Mercedes-Benz In-Car-UI' },
  { value: 8, suffix: '', label: 'Dienste im Produktivbetrieb' },
  { value: 7, suffix: '', label: 'CI-Workflows' },
  {
    value: 172000,
    suffix: '',
    prefix: '≈',
    label: 'Zeilen Code als Solo-Entwickler',
    compact: true,
  },
] as const

export default function Stats() {
  return (
    <section aria-label="Zahlen" className="border-y-2 border-ink bg-lavender py-14 md:py-18">
      <Container size="wide">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.07}
              className="flex h-full flex-col items-center gap-2"
            >
              <dt className="order-2 max-w-[16rem] text-sm leading-snug font-medium text-ink/70">
                {stat.label}
              </dt>
              <dd
                className={`order-1 font-display font-bold tracking-tight whitespace-nowrap text-ink tabular-nums ${
                  'compact' in stat && stat.compact
                    ? 'text-4xl md:text-5xl'
                    : 'text-5xl md:text-6xl'
                }`}
              >
                {'prefix' in stat ? (
                  <span aria-hidden="true" className="align-[0.1em] text-[0.65em]">
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
