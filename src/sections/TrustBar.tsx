import Container from '../components/Container'
import Reveal from '../components/Reveal'
import { useCopy } from '../lib/i18n'

/** Trademark-safe text wordmarks — no logo files. */
export default function TrustBar() {
  const t = useCopy()
  return (
    <section id="trust" aria-label={t.trust.label} className="py-12 md:py-16">
      <Container size="wide">
        <Reveal>
          <div className="grid gap-x-10 gap-y-5 lg:grid-cols-[10rem_1fr]">
            <p className="mono-label pt-1">{t.trust.label}</p>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {t.trust.names.map((name) => (
                <li key={name} className="text-[0.9375rem] font-medium text-fg-2">
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
