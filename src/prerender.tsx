import { renderToString } from 'react-dom/server'
import App from './App'
import Home from './pages/Home'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import type { Route } from './lib/router'
import { normalizeRoute } from './lib/router'
import { COPY } from './content/i18n'

const pages = {
  '/': Home,
  '/services': Home,
  '/projects': Home,
  '/career': Home,
  '/contact': Home,
  '/impressum': Impressum,
  '/datenschutz': Datenschutz,
}
export function renderPage(route: Route) {
  const Page = pages[route]
  return renderToString(<App initialRoute={route} page={<Page />} />)
}

export const routes = Object.keys(pages) as Route[]

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!,
  )
}

export function renderDocument(template: string, pathname: string) {
  const requestedRoute = normalizeRoute(pathname)
  const route =
    requestedRoute === '/impressum' || requestedRoute === '/datenschutz' ? requestedRoute : '/'
  return template
    .replaceAll('__PAGE_TITLE__', escapeHtml(COPY.de.titles[route]))
    .replaceAll('__PAGE_DESCRIPTION__', escapeHtml(COPY.de.descriptions[route]))
    .replaceAll('__PAGE_URL__', 'https://lohrer-digital.de' + route)
    .replaceAll('__PAGE_CANONICAL_PATH__', route.slice(1))
    .replace('<!--app-html-->', () => renderPage(route))
}
