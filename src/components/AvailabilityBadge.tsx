import { useCopy } from '../lib/i18n'

/** Quiet status line: signal dot + mono text. */
export default function AvailabilityBadge({ className = '' }: { className?: string }) {
  const t = useCopy()
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs whitespace-nowrap text-fg-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal ring-3 ring-signal/15"
      />
      {t.nav.availability}
    </span>
  )
}
