import Container from '../components/Container'
import Reveal from '../components/Reveal'

const NAMES = ['Mercedes-Benz', 'Aremus Finance', 'Innenministerium BW', 'Daimler']

/** Trademark-safe text wordmarks — no logo files. */
export default function TrustBar() {
  return (
    <section aria-label="Gebaut für und im Einsatz bei" className="py-10 md:py-14">
      <Container>
        <Reveal>
          <p className="text-center font-display text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
            Gebaut für und im Einsatz bei
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14">
            {NAMES.map((name) => (
              <li
                key={name}
                className="font-display text-lg font-bold tracking-tight text-ink/45 sm:text-xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
