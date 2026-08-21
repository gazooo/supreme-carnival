import { AVAILABILITY_SHORT } from '../content/site'

/** Mint badge with pulsing dot. The ping ring hides under reduced motion. */
export default function AvailabilityBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint px-3.5 py-1.5 font-display text-sm font-semibold whitespace-nowrap text-ink ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-strong opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint-strong" />
      </span>
      {AVAILABILITY_SHORT}
    </span>
  )
}
