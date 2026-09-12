import type { ReactNode } from 'react'
export default function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
  className = '',
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  level?: 1 | 2
  className?: string
}) {
  const Heading = level === 1 ? 'h1' : 'h2'
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading className="mt-3 max-w-3xl text-display text-balance">{title}</Heading>
      {description ? <p className="mt-5 max-w-2xl text-lead text-fg-2">{description}</p> : null}
    </div>
  )
}
