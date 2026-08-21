import { RouterProvider, useRouter } from './lib/router'
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
    <RouterProvider>
      <CurrentPage />
    </RouterProvider>
  )
}
