import Container from '../components/Container'
import { useCopy } from '../lib/i18n'
export default function TrustBar() {
  const t = useCopy()
  return (
    <section aria-label={t.trust.label} className="border-y border-line py-7">
      <Container size="wide">
        <p className="text-xs text-fg-3">{t.trust.label}</p>
        <ul className="mt-4 grid grid-cols-2 items-center gap-x-6 gap-y-4 md:flex md:justify-between">
          {t.trust.names.map((name) => (
            <li
              key={name}
              className="max-w-[230px] text-sm font-semibold leading-relaxed text-fg-2 md:text-base"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
