import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

export type Route = '/' | '/impressum' | '/datenschutz'

// eslint-disable-next-line react-refresh/only-export-components
export function normalizeRoute(pathname: string): Route {
  const p = pathname.replace(/\/+$/, '')
  if (p === '/impressum') return '/impressum'
  if (p === '/datenschutz') return '/datenschutz'
  return '/'
}

interface RouterValue {
  route: Route
  navigate: (to: Route) => void
}

const RouterContext = createContext<RouterValue>({ route: '/', navigate: () => {} })

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => normalizeRoute(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setRoute(normalizeRoute(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to: Route) => {
    if (normalizeRoute(window.location.pathname) !== to) {
      window.history.pushState(null, '', to)
    }
    setRoute(to)
    window.scrollTo({ top: 0, behavior: 'instant' })
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
}: {
  to: Route
  className?: string
  children: ReactNode
}) {
  const { navigate } = useRouter()
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  )
}
