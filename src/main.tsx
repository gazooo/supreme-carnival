import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import './styles/global.css'
import App from './App.tsx'

const root = document.getElementById('root')!
let useEnglish = false
try {
  useEnglish = window.localStorage.getItem('lang') === 'en'
} catch {
  /* storage is optional */
}
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
// Prerendered HTML is German. An explicit English preference renders fresh copy.
if (useEnglish) createRoot(root).render(app)
else hydrateRoot(root, app)
