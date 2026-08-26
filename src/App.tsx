import { lazy, Suspense, useEffect, useRef } from 'react'
import { MotionConfig } from 'motion/react'
import { RouterProvider, useRouter } from './lib/router'
import { SmoothScrollProvider } from './lib/scroll'
import { LangProvider, useCopy } from './lib/i18n'
import Nav from './sections/Nav'
import Footer from './sections/Footer'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'

// Every route except the landing tab loads as its own small chunk.
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const CareerPage = lazy(() => import('./pages/CareerPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const Impressum = lazy(() => import('./pages/Impressum'))
const Datenschutz = lazy(() => import('./pages/Datenschutz'))

/** Tall, empty fallback: no footer flash while a tab chunk loads. */
const loading = <div className="min-h-svh" aria-hidden="true" />

function Shell() {
  const { route } = useRouter()
  const t = useCopy()

  // The shell owns document.title — localized per route.
  useEffect(() => {
    document.title = t.titles[route]
  }, [route, t])

  // On tab change (not initial load), move focus to the page content so
  // keyboard and screen-reader users land where the visual change happened.
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [route])

  if (route === '/impressum') {
    return <Suspense fallback={loading}>{<Impressum />}</Suspense>
  }
  if (route === '/datenschutz') {
    return <Suspense fallback={loading}>{<Datenschutz />}</Suspense>
  }

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        {route === '/' ? (
          <Home />
        ) : (
          <Suspense fallback={loading}>
            {route === '/services' && <ServicesPage />}
            {route === '/projects' && <ProjectsPage />}
            {route === '/career' && <CareerPage />}
            {route === '/contact' && <ContactPage />}
          </Suspense>
        )}
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

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <RouterProvider>
          <SmoothScrollProvider>
            <SkipLink />
            <Shell />
          </SmoothScrollProvider>
        </RouterProvider>
      </LangProvider>
    </MotionConfig>
  )
}
