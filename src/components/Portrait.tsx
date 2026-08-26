import { useState } from 'react'
import { useCopy } from '../lib/i18n'

/*
 * public/portrait.webp: 768×960 (4:5), generiert aus
 * assets/portrait/portrait-malte.jpg. Circular crop with a double hairline
 * ring; the onError fallback (monogram) stays as a robustness net.
 *
 * Rendered inside the static index.html shell too — keep classes in sync.
 */
export default function Portrait({ className = '' }: { className?: string }) {
  const t = useCopy()
  const [failed, setFailed] = useState(false)

  const frame = `relative shrink-0 rounded-full border border-line p-2 ${className}`
  const disc =
    'block h-32 w-32 rounded-full border border-line-strong object-cover object-[50%_30%] sm:h-40 sm:w-40 lg:h-44 lg:w-44'

  if (failed) {
    return (
      <span className={frame}>
        <span
          role="img"
          aria-label={t.a11y.portraitFallback}
          className={`${disc} flex items-center justify-center bg-base-2`}
        >
          <span
            aria-hidden="true"
            className="font-mono text-4xl font-semibold tracking-tighter text-line-strong select-none"
          >
            ML
          </span>
        </span>
      </span>
    )
  }

  return (
    <span className={frame}>
      <img
        src="/portrait.webp"
        width={768}
        height={960}
        alt={t.a11y.portraitAlt}
        fetchPriority="high"
        decoding="async"
        onError={() => setFailed(true)}
        className={`${disc} bg-base-2`}
      />
    </span>
  )
}
