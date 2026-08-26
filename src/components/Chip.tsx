import type { ReactNode } from 'react'

export type ChipTone = 'default' | 'accent'

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
    default: 'border-line text-fg-2 hover:border-fg-3 hover:text-fg',
    accent: 'border-accent/35 bg-accent-soft text-accent',
  }
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 font-mono text-xs tracking-tight transition-colors duration-200 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
