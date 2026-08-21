import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/**
 * Animated counter that runs once when scrolled into view.
 * Shows the final value immediately under reduced motion.
 */
export default function CountUp({
  to,
  format = (v: number) => Math.round(v).toLocaleString('de-DE'),
  duration = 1.8,
  className = '',
}: {
  to: number
  format?: (value: number) => string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduced) {
      node.textContent = format(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = format(value)
      },
    })
    return () => controls.stop()
  }, [inView, reduced, to, duration, format])

  return (
    <span ref={ref} className={className}>
      {format(reduced ? to : 0)}
    </span>
  )
}
