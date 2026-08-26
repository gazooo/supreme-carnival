import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App'

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  document.documentElement.lang = ''
})

describe('App', () => {
  it('renders the whoami landing in English by default', () => {
    window.history.pushState(null, '', '/')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Malte Lohrer' })).toBeTruthy()
    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(screen.getAllByText('whoami').length).toBeGreaterThan(0)
    expect(screen.getByText(/I build and run/)).toBeTruthy()
    expect(document.documentElement.lang).toBe('en')
  })

  it('switches to German via the language toggle and persists the choice', () => {
    window.history.pushState(null, '', '/')
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'de' })[0])
    expect(screen.getByText(/Ich baue und betreibe/)).toBeTruthy()
    expect(screen.getAllByRole('link', { name: 'leistungen' }).length).toBeGreaterThan(0)
    expect(document.documentElement.lang).toBe('de')
    expect(window.localStorage.getItem('lang')).toBe('de')
  })

  it('navigates to the projects tab via the nav', async () => {
    window.history.pushState(null, '', '/')
    render(<App />)
    fireEvent.click(screen.getAllByRole('link', { name: 'projects' })[0])
    expect(
      await screen.findByRole('heading', { name: /Two projects that show how I work/ }),
    ).toBeTruthy()
    expect(window.location.pathname).toBe('/projects')
  })

  it('renders the contact tab with the form fields', async () => {
    window.history.pushState(null, '', '/contact')
    render(<App />)
    expect(await screen.findByLabelText('Name')).toBeTruthy()
    expect(await screen.findByLabelText('E-mail')).toBeTruthy()
    expect(await screen.findByLabelText('Message')).toBeTruthy()
    expect(await screen.findByRole('button', { name: /send message/i })).toBeTruthy()
  })

  it('renders the Impressum route (German document)', async () => {
    window.history.pushState(null, '', '/impressum')
    render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: 'Impressum' })).toBeTruthy()
    expect(screen.getByText(/Obere Beutau 23/)).toBeTruthy()
  })

  it('renders the Datenschutz route (German document)', async () => {
    window.history.pushState(null, '', '/datenschutz')
    render(<App />)
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Datenschutzerklärung' }),
    ).toBeTruthy()
    expect(screen.getByText(/keine Cookies/)).toBeTruthy()
  })

  it('falls back to the landing tab for unknown paths', () => {
    window.history.pushState(null, '', '/does-not-exist')
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Malte Lohrer' })).toBeTruthy()
  })
})
