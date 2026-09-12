import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

/** Tab routes plus the two (German) legal documents. */
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

export function RouterProvider({
  children,
  initialRoute = '/',
}: {
  children: ReactNode
  initialRoute?: Route
}) {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? initialRoute : normalizeRoute(window.location.pathname),
  )

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
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
