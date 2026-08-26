import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Chip from '../components/Chip'
import Reveal from '../components/Reveal'
import { useCopy } from '../lib/i18n'
import type { Copy } from '../content/i18n'

type CaseStudy = Copy['projects']['cases'][number]
type Labels = Copy['projects']['labels']

function CaseCard({ study, labels }: { study: CaseStudy; labels: Labels }) {
  return (
    <article className="grid gap-x-10 gap-y-6 border-t border-line py-10 md:py-14 lg:grid-cols-[10rem_1fr]">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 lg:flex-col">
        <p className="mono-label">{study.client}</p>
        <p className="font-mono text-xs text-fg-3">{study.period}</p>
      </div>

      <div className="max-w-3xl">
        <h3 className="text-2xl font-semibold tracking-tight text-fg">{study.title}</h3>

        <p className="mono-label mt-7">{labels.context}</p>
        <p className="mt-2 leading-relaxed text-fg-2">{study.context}</p>

        <p className="mono-label mt-6">{labels.built}</p>
        <ul className="mt-2 flex flex-col gap-2.5">
          {study.built.map((item) => (
            <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mono-label mt-6">{labels.result}</p>
        <p className="mt-2 leading-relaxed font-medium text-fg">{study.result}</p>

        <div
          className={`mt-5 grid grid-cols-2 gap-px border border-line bg-line ${
            study.metrics.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
          }`}
        >
          {study.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`group/metric bg-raise px-4 py-3.5 transition-colors duration-300 hover:bg-accent-soft ${
                study.metrics.length % 2 === 1 && index === study.metrics.length - 1
                  ? 'col-span-2 sm:col-span-1'
                  : ''
              }`}
            >
              <p className="font-mono text-base font-semibold tracking-tight text-fg tabular-nums transition-colors duration-300 group-hover/metric:text-accent">
                {metric.value}
              </p>
              <p className="mt-0.5 font-mono text-[0.6875rem] text-fg-3">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {study.chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const t = useCopy()
  return (
    <section id="projekte" className="py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            description={t.projects.description}
          />
        </Reveal>
        <div className="mt-14 md:mt-20">
          {t.projects.cases.map((study) => (
            <Reveal key={study.id} amount={0.1}>
              <CaseCard study={study} labels={t.projects.labels} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
