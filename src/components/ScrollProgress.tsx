import { motion, useScroll, useSpring } from 'motion/react'

/** Thin pastel gradient bar at the very top reflecting scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-80 h-1 origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, var(--color-mint-strong), var(--color-sky-strong), var(--color-lavender-strong), var(--color-peach-strong), var(--color-butter-strong))',
      }}
    />
  )
}
