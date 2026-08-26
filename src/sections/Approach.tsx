import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { useCopy } from '../lib/i18n'

export default function Approach() {
  const t = useCopy()
  return (
    <section id="arbeitsweise" className="border-t border-line bg-base-2 py-20 md:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            eyebrow={t.approach.eyebrow}
            title={t.approach.title}
            description={t.approach.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-y-10 md:mt-20 lg:grid-cols-3 lg:gap-x-0 lg:divide-x lg:divide-line">
          {t.approach.principles.map((principle, index) => (
            <Reveal
              key={principle.title}
              delay={index * 0.07}
              className={`group h-full border-t border-line pt-8 first:border-t-0 first:pt-0 lg:border-t-0 lg:px-10 lg:pt-0 ${
                index === 0 ? 'lg:pl-0' : ''
              } ${index === t.approach.principles.length - 1 ? 'lg:pr-0' : ''}`}
            >
              <article className="flex h-full flex-col">
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-fg-3 transition-colors duration-300 group-hover:text-accent"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-title text-fg">{principle.title}</h3>
                <p className="mt-3 leading-relaxed text-fg-2">{principle.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
