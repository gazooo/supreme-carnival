import { AVAILABILITY_SHORT } from '../content/site'

/** Quiet status line: signal dot + mono text. */
export default function AvailabilityBadge({
  className = '',
  onDark = false,
}: {
  className?: string
  onDark?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs whitespace-nowrap ${
        onDark ? 'text-ink-2-on-dark' : 'text-ink-2'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal ring-3 ring-signal/15"
      />
      {AVAILABILITY_SHORT}
    </span>
  )
}
