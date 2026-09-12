import Container from '../components/Container'
import { useCopy } from '../lib/i18n'
export default function Timeline() {
  const t = useCopy()
  return (
    <section className="section-space border-y border-line bg-canvas-2">
      <Container size="wide">
        <h2 className="text-display">{t.career.title}</h2>
        <ol className="mt-10">
          {t.career.stations.map((station) => (
            <li
              key={station.org}
              className="grid gap-3 border-t border-line py-7 md:grid-cols-[12rem_1fr] md:gap-12"
            >
              <p className="text-sm text-fg-3">{station.period}</p>
              <div className="max-w-2xl">
                <h3 className="text-title">{station.org}</h3>
                <p className="mt-2 text-sm font-medium text-accent">{station.role}</p>
                <p className="mt-3 leading-relaxed text-fg-2">{station.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
