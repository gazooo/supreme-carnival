import { MotionConfig } from 'motion/react'
import { RouterProvider, useRouter } from './lib/router'
import { SmoothScrollProvider } from './lib/scroll'
import Grain from './components/Grain'
import OnePager from './pages/OnePager'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'

function CurrentPage() {
  const { route } = useRouter()
  switch (route) {
    case '/impressum':
      return <Impressum />
    case '/datenschutz':
      return <Datenschutz />
    default:
      return <OnePager />
  }
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <SmoothScrollProvider>
          <a href="#main" className="skip-link on-ink">
            Zum Inhalt springen
          </a>
          <Grain />
          <CurrentPage />
        </SmoothScrollProvider>
      </RouterProvider>
    </MotionConfig>
  )
}
