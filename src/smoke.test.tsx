import { describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach } from 'vitest'
import App from './App'
import { NAV_LINKS } from './content/site'

afterEach(cleanup)

describe('App', () => {
  it('renders the one-pager with the wordmark and one h1', () => {
    window.history.pushState(null, '', '/')
    render(<App />)
    expect(screen.getAllByText(/Malte Lohrer/i).length).toBeGreaterThan(0)
    expect(document.querySelectorAll('h1')).toHaveLength(1)
  })

  it('resolves every nav anchor to a section in the document', () => {
    window.history.pushState(null, '', '/')
    render(<App />)
    for (const link of NAV_LINKS) {
      const id = link.href.slice(1)
      expect(document.getElementById(id), `missing anchor target #${id}`).not.toBeNull()
    }
  })

  it('renders the contact form fields', async () => {
    window.history.pushState(null, '', '/')
    render(<App />)
    expect(await screen.findByLabelText('Name')).toBeTruthy()
    expect(await screen.findByLabelText('E-Mail')).toBeTruthy()
    expect(await screen.findByLabelText('Nachricht')).toBeTruthy()
    expect(screen.getByRole('button', { name: /nachricht senden/i })).toBeTruthy()
  })

  it('renders the Impressum route', () => {
    window.history.pushState(null, '', '/impressum')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Impressum' })).toBeTruthy()
    expect(screen.getByText(/Obere Beutau 23/)).toBeTruthy()
  })

  it('renders the Datenschutz route', () => {
    window.history.pushState(null, '', '/datenschutz')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Datenschutzerklärung' })).toBeTruthy()
    expect(screen.getByText(/keine Cookies/)).toBeTruthy()
  })
})
