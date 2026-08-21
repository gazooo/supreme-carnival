import type { ReactNode } from 'react'

export type ChipTone = 'mint' | 'peach' | 'lavender' | 'sky' | 'butter' | 'white' | 'cream'

const toneBg: Record<ChipTone, string> = {
  mint: 'bg-mint',
  peach: 'bg-peach',
  lavender: 'bg-lavender',
  sky: 'bg-sky',
  butter: 'bg-butter',
  white: 'bg-white',
  cream: 'bg-cream',
}

/**
 * `sticker`: bold bordered badge with hard shadow — for headline-level chips.
 * `soft`: quiet pastel pill — for tech tags inside cards.
 */
export default function Chip({
  children,
  tone = 'white',
  variant = 'soft',
  rotate = 0,
  className = '',
}: {
  children: ReactNode
  tone?: ChipTone
  variant?: 'sticker' | 'soft'
  rotate?: number
  className?: string
}) {
  if (variant === 'sticker') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-1.5 font-display text-sm font-semibold text-ink shadow-pop-sm sm:text-base ${toneBg[tone]} ${className}`}
        style={rotate ? { rotate: `${rotate}deg` } : undefined}
      >
        {children}
      </span>
    )
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-ink ${toneBg[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
