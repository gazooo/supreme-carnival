import { motion, useScroll, useSpring } from 'motion/react'

/** Hairline accent bar at the top reflecting scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-80 h-px origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}
