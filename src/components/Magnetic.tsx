import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

/**
 * Magnetic hover: children gently follow the cursor. Active only for fine
 * pointers and when motion is not reduced; otherwise renders inert.
 */
export default function Magnetic({
  children,
  strength = 0.25,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const [finePointer] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: fine)').matches,
  )
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  if (reduced || !finePointer) {
    return <div className={`inline-block ${className}`}>{children}</div>
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}
