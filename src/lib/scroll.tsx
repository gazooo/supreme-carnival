import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'motion/react'

const LenisContext = createContext<Lenis | null>(null)

/** Height of the fixed nav plus breathing room — keep in sync with Nav. */
const ANCHOR_OFFSET = -88

/**
 * Smooth scrolling via Lenis. Disabled entirely when the user prefers
 * reduced motion (native instant scroll takes over). Touch devices keep
 * native scrolling — Lenis only smooths wheel input by default.
 *
 * Also intercepts same-page anchor clicks so they scroll with the correct
 * nav offset (Lenis) or fall back to native behavior + scroll-margin CSS.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({ autoRaf: true, lerp: 0.12 })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return
      const anchor = (event.target as HTMLElement).closest?.('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.getElementById(href.slice(1))
      if (!target) return
      event.preventDefault()
      window.history.pushState(null, '', href)
      if (lenis) {
        lenis.scrollTo(target, { offset: ANCHOR_OFFSET, duration: 1.15 })
      } else {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      }
      // Move keyboard/screen-reader context along with the visual scroll.
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis, reduced])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}
