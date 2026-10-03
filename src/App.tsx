import { lazy, Suspense, useEffect, useRef, type ReactNode } from 'react'
import { RouterProvider, useRouter, type Route } from './lib/router'
import { LangProvider, useCopy, useI18n } from './lib/i18n'
import Nav from './sections/Nav'
import Footer from './sections/Footer'
import Home from './pages/Home'

const Impressum = lazy(() => import('./pages/Impressum'))
const Datenschutz = lazy(() => import('./pages/Datenschutz'))
const loading = <div className="min-h-svh" aria-hidden="true" />

function Shell({ page }: { page?: ReactNode }) {
  const { route } = useRouter()
  const t = useCopy()
  const { lang } = useI18n()
  useEffect(() => {
    document.title = t.titles[route]
    const metadata: Record<string, string> = {
      'meta[name="description"]': t.descriptions[route],
      'meta[property="og:title"]': t.titles[route],
      'meta[property="og:description"]': t.descriptions[route],
      'meta[name="twitter:title"]': t.titles[route],
      'meta[name="twitter:description"]': t.descriptions[route],
      'meta[property="og:url"]': 'https://lohrer-digital.de' + route,
      'meta[property="og:locale"]': lang === 'de' ? 'de_DE' : 'en_US',
      'meta[property="og:locale:alternate"]': lang === 'de' ? 'en_US' : 'de_DE',
    }
    for (const [selector, content] of Object.entries(metadata))
      document.querySelector(selector)?.setAttribute('content', content)
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', 'https://lohrer-digital.de' + route)
  }, [route, t, lang])

  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [route])

  if (route === '/impressum') return <Suspense fallback={loading}>{page ?? <Impressum />}</Suspense>
  if (route === '/datenschutz')
    return <Suspense fallback={loading}>{page ?? <Datenschutz />}</Suspense>

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        {page ?? <Home />}
      </main>
      <Footer />
    </>
  )
}

function SkipLink() {
  const t = useCopy()
  return (
    <a href="#main" className="skip-link">
      {t.a11y.skipLink}
    </a>
  )
}

/** Static onepager HTML and separately loaded legal documents share this shell. */
export default function App({
  initialRoute = '/',
  page,
}: {
  initialRoute?: Route
  page?: ReactNode
}) {
  return (
    <LangProvider>
      <RouterProvider initialRoute={initialRoute}>
        <SkipLink />
        <Shell page={page} />
      </RouterProvider>
    </LangProvider>
  )
}
