import type { ReactNode } from 'react'

/**
 * Editorial section intro, coder cut: a comment-style mono eyebrow
 * (`// label`) beside a large headline. On wide screens the eyebrow sits in
 * its own narrow column.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  className = '',
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  className?: string
}) {
  return (
    <div className={`grid gap-x-10 gap-y-5 lg:grid-cols-[10rem_1fr] ${className}`}>
      <p className="mono-comment pt-2.5">
        <span aria-hidden="true" className="text-accent">
          {'// '}
        </span>
        {eyebrow}
      </p>
      <div>
        <h2 className="max-w-3xl text-display text-balance text-fg">{title}</h2>
        {description ? <p className="mt-5 max-w-2xl text-lead text-fg-2">{description}</p> : null}
      </div>
    </div>
  )
}
