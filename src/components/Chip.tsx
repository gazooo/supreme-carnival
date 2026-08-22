import type { ReactNode } from 'react'

export type ChipTone = 'default' | 'accent' | 'onDark'

/**
 * Technical tag: mono type, hairline border, no fill. Used for stack items
 * and result metrics — never as decoration.
 */
export default function Chip({
  children,
  tone = 'default',
  className = '',
}: {
  children: ReactNode
  tone?: ChipTone
  className?: string
}) {
  const tones: Record<ChipTone, string> = {
    default: 'border-line text-ink-2',
    accent: 'border-accent/35 bg-accent-soft text-accent',
    onDark: 'border-ink-line text-ink-2-on-dark',
  }
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 font-mono text-xs tracking-tight ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
