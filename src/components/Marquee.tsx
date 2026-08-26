import { Fragment } from 'react'

/**
 * Slow monochrome ticker — reads as a status strip, not a carnival banner.
 * The scrolling copy is aria-hidden (duplicated); an sr-only list carries
 * the accessible text. Freezes under prefers-reduced-motion.
 */
export default function Marquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-line py-3.5">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8" aria-hidden="true">
        {doubled.map((item, index) => (
          <Fragment key={index}>
            <span className="font-mono text-xs tracking-[0.13em] whitespace-nowrap text-fg-3 uppercase">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-line-strong" />
          </Fragment>
        ))}
      </div>
      <p className="sr-only">{items.join(', ')}</p>
    </div>
  )
}
