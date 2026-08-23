import Container from '../components/Container'
import Reveal from '../components/Reveal'

const NAMES = ['Mercedes-Benz', 'Aremus Finance', 'Innenministerium BW', 'Daimler']

/** Trademark-safe text wordmarks — no logo files. */
export default function TrustBar() {
  return (
    <section aria-label="Gearbeitet für" className="py-12 md:py-16">
      <Container size="wide">
        <Reveal>
          <div className="grid gap-x-10 gap-y-5 lg:grid-cols-[10rem_1fr]">
            <p className="mono-label pt-1">Gearbeitet für</p>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {NAMES.map((name) => (
                <li key={name} className="text-[0.9375rem] font-medium text-ink-2">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
