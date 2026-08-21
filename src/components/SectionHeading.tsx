import type { ReactNode } from 'react'
import Chip, { type ChipTone } from './Chip'

/**
 * Standard section intro: oversized decorative numeral, sticker eyebrow,
 * display headline and optional description.
 */
export default function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  tone = 'butter',
  align = 'left',
  className = '',
}: {
  number: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  tone?: ChipTone
  align?: 'left' | 'center'
  className?: string
}) {
  const centered = align === 'center'
  return (
    <div className={`relative ${centered ? 'text-center' : ''} ${className}`}>
      <span
        aria-hidden="true"
        className={`section-number pointer-events-none absolute -top-10 sm:-top-14 ${
          centered ? 'left-1/2 -translate-x-1/2' : '-left-2 sm:-left-4'
        }`}
      >
        {number}
      </span>
      <div className={`relative flex flex-col gap-4 ${centered ? 'items-center' : 'items-start'}`}>
        <Chip variant="sticker" tone={tone} rotate={centered ? 0 : -2}>
          {eyebrow}
        </Chip>
        <h2 className="max-w-3xl font-display text-display text-balance">{title}</h2>
        {description ? (
          <p className={`max-w-2xl text-lead text-ink-soft ${centered ? 'mx-auto' : ''}`}>
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
