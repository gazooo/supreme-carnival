import type { ReactNode } from 'react'

/**
 * Editorial section intro: mono index + label above a large headline.
 * On wide screens the label sits in its own narrow column beside the text.
 */
export default function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  onDark = false,
  className = '',
}: {
  number: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  onDark?: boolean
  className?: string
}) {
  return (
    <div className={`grid gap-x-10 gap-y-5 lg:grid-cols-[10rem_1fr] ${className}`}>
      <p className={`mono-label pt-2 ${onDark ? 'text-ink-2-on-dark' : ''}`}>
        <span aria-hidden="true">{number}</span>
        <span className="sr-only">Abschnitt {number}:</span>
        <span className="mx-2 opacity-40" aria-hidden="true">
          /
        </span>
        {eyebrow}
      </p>
      <div>
        <h2 className={`max-w-3xl text-display text-balance ${onDark ? 'text-paper' : 'text-ink'}`}>
          {title}
        </h2>
        {description ? (
          <p className={`mt-5 max-w-2xl text-lead ${onDark ? 'text-ink-2-on-dark' : 'text-ink-2'}`}>
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
