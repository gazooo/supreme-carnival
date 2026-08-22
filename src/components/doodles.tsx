/** Functional inline icons only — no decorative marks. */

export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
      <path
        d="M3 10h13m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
