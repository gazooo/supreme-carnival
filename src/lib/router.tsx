import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

/** Legacy section paths remain valid alongside the two legal documents. */
export type Route =
  '/' | '/services' | '/projects' | '/career' | '/contact' | '/impressum' | '/datenschutz'

const ROUTES: readonly Route[] = [
  '/',
  '/services',
  '/projects',
  '/career',
  '/contact',
  '/impressum',
  '/datenschutz',
]

// eslint-disable-next-line react-refresh/only-export-components
export function normalizeRoute(pathname: string): Route {
  const p = pathname.replace(/\/+$/, '') || '/'
  return (ROUTES as readonly string[]).includes(p) ? (p as Route) : '/'
}

interface RouterValue {
  route: Route
  navigate: (to: Route) => void
}

const RouterContext = createContext<RouterValue>({ route: '/', navigate: () => {} })

function documentRoute(path: Route): Route {
  return path === '/impressum' || path === '/datenschutz' ? path : '/'
}

// eslint-disable-next-line react-refresh/only-export-components
export function routeHref(to: Route): string {
  return documentRoute(to) === '/' ? '/#' + (to === '/' ? 'home' : to.slice(1)) : to
}

export function RouterProvider({
  children,
  initialRoute = '/',
}: {
  children: ReactNode
  initialRoute?: Route
}) {
  const [route, setRoute] = useState<Route>(() =>
    documentRoute(
      typeof window === 'undefined' ? initialRoute : normalizeRoute(window.location.pathname),
    ),
  )
  const [scrollRequest, setScrollRequest] = useState(0)

  useEffect(() => {
    const sync = () => {
      const path = normalizeRoute(window.location.pathname)
      setRoute(documentRoute(path))
      if (documentRoute(path) === '/' && path !== '/') {
        window.history.replaceState(
          null,
          '',
          '/' + window.location.search + (window.location.hash || '#' + path.slice(1)),
        )
      }
      setScrollRequest((value) => value + 1)
    }
    sync()
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  useEffect(() => {
    if (route !== '/') return
    const frame = requestAnimationFrame(() => {
      let id = 'home'
      try {
        id = decodeURIComponent(window.location.hash.slice(1)) || id
      } catch {
        /* Invalid fragment: show top. */
      }
      const target = document.getElementById(id)
      target?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      })
      if (window.location.hash) target?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [route, scrollRequest])

  const navigate = useCallback((to: Route) => {
    const href = routeHref(to)
    if (window.location.pathname + window.location.hash !== href)
      window.history.pushState(null, '', href)
    setRoute(documentRoute(to))
    setScrollRequest((value) => value + 1)
    if (documentRoute(to) !== '/') window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter(): RouterValue {
  return useContext(RouterContext)
}

/** Internal link that uses the History API instead of a full page load. */
export function RouteLink({
  to,
  className,
  children,
  onClick,
  ...rest
}: {
  to: Route
  className?: string
  children: ReactNode
  onClick?: () => void
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>) {
  const { navigate } = useRouter()
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.()
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }
  return (
    <a href={routeHref(to)} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
