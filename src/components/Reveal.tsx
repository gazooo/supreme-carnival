import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/**
 * Restrained scroll reveal: short rise, quick fade. Renders a plain div when
 * the user prefers reduced motion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  amount = 0.15,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  amount?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
