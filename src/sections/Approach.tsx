import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { useCopy } from '../lib/i18n'
export default function Approach() {
  const t = useCopy()
  return (
    <section className="section-space border-y border-line bg-canvas-2">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.approach.eyebrow}
          title={t.approach.title}
          description={t.approach.description}
        />
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
          {t.approach.principles.map((step, index) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-sm font-medium text-accent"
              >
                {index + 1}
              </span>
              <h3 className="mt-5 text-title">{step.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
