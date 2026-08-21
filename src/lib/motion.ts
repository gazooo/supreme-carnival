import type { Variants } from 'motion/react'

/** Shared easing — a confident ease-out for reveals and hovers. */
export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

export const viewportOnce = { once: true, amount: 0.2 } as const
