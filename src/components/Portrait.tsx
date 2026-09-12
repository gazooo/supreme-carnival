import { useState } from 'react'
import { useCopy } from '../lib/i18n'
export default function Portrait({ className = '' }: { className?: string }) {
  const t = useCopy()
  const [failed, setFailed] = useState(false)
  const frame = 'aspect-[4/5] w-full rounded-lg bg-canvas-2 object-cover ' + className
  return failed ? (
    <div
      role="img"
      aria-label={t.a11y.portraitFallback}
      className={frame + ' flex items-center justify-center text-6xl text-accent'}
    >
      ML
    </div>
  ) : (
    <img
      src="/portrait.webp"
      width={768}
      height={960}
      alt={t.a11y.portraitAlt}
      fetchPriority="high"
      decoding="async"
      onError={() => setFailed(true)}
      className={frame}
    />
  )
}
