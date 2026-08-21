import { Fragment } from 'react'
import { Sparkle } from './doodles'

/**
 * Seamless marquee ticker. The scrolling copy is aria-hidden (duplicated
 * content); a sr-only list carries the accessible text. The CSS animation
 * freezes under prefers-reduced-motion.
 */
export default function Marquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y-2 border-ink bg-butter py-4">
      <div className="flex w-max animate-marquee items-center gap-9 pr-9" aria-hidden="true">
        {doubled.map((item, index) => (
          <Fragment key={index}>
            <span className="font-display text-lg font-semibold whitespace-nowrap text-ink sm:text-xl">
              {item}
            </span>
            <Sparkle className="h-4 w-4 shrink-0 text-ink" />
          </Fragment>
        ))}
      </div>
      <p className="sr-only">{items.join(', ')}</p>
    </div>
  )
}
