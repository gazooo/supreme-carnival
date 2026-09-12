import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { COPY } from './content/i18n'

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  document.documentElement.lang = ''
  vi.unstubAllGlobals()
})
function openPage(path = '/') {
  window.history.pushState(null, '', path)
  return render(<App />)
}
describe('Public website', () => {
  it('starts in German with a clear route to contact', () => {
    openPage()
    expect(screen.getByRole('heading', { level: 1, name: /Software entwickeln/ })).toBeTruthy()
    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.documentElement.lang).toBe('de')
    expect(
      screen.getAllByRole('link', { name: 'Projekt besprechen' })[0].getAttribute('href'),
    ).toBe('/contact')
  })
  it('switches languages, updates metadata and remembers the choice on reload', () => {
    const view = openPage()
    fireEvent.click(screen.getAllByRole('button', { name: 'en' })[0])
    expect(screen.getByRole('heading', { level: 1, name: /Build software/ })).toBeTruthy()
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe(COPY.en.titles['/'])
    expect(window.localStorage.getItem('lang')).toBe('en')
    view.unmount()
    openPage()
    expect(document.documentElement.lang).toBe('en')
    expect(screen.getByRole('heading', { level: 1, name: /Build software/ })).toBeTruthy()
  })
  it('navigates to projects and focuses the new page content', async () => {
    openPage()
    fireEvent.click(screen.getAllByRole('link', { name: 'Projekte' })[0])
    expect(
      await screen.findByRole('heading', { level: 1, name: COPY.de.projects.title }),
    ).toBeTruthy()
    expect(window.location.pathname).toBe('/projects')
    expect(document.activeElement?.id).toBe('main')
    expect(document.title).toBe(COPY.de.titles['/projects'])
  })
  it('returns to the previous route with browser history', async () => {
    openPage('/services')
    expect(
      await screen.findByRole('heading', { level: 1, name: COPY.de.services.title }),
    ).toBeTruthy()
    window.history.replaceState(null, '', '/')
    fireEvent.popState(window)
    expect(
      await screen.findByRole('heading', { level: 1, name: /Software entwickeln/ }),
    ).toBeTruthy()
  })
  it.each(['/services', '/projects', '/career', '/contact', '/impressum', '/datenschutz'])(
    'renders a single primary heading at %s',
    async (path) => {
      openPage(path)
      expect(await screen.findByRole('heading', { level: 1 })).toBeTruthy()
      expect(document.querySelectorAll('h1')).toHaveLength(1)
    },
  )
  it('keeps German legal documents available from an English interface', async () => {
    window.localStorage.setItem('lang', 'en')
    openPage('/datenschutz')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Datenschutzerklärung' }),
    ).toBeTruthy()
    expect(document.querySelector('main')?.lang).toBe('de')
    expect(screen.getByText('This document is provided in German.')).toBeTruthy()
  })
  it('falls back to home for an unknown route', () => {
    openPage('/does-not-exist')
    expect(screen.getByRole('heading', { level: 1, name: /Software entwickeln/ })).toBeTruthy()
  })
})

describe('Contact form', () => {
  async function fillForm() {
    openPage('/contact')
    fireEvent.change(await screen.findByLabelText(COPY.de.contact.form.name), {
      target: { value: 'Lokaler Test' },
    })
    fireEvent.change(screen.getByLabelText(COPY.de.contact.form.email), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(COPY.de.contact.form.message), {
      target: { value: 'Lokale Testanfrage ohne Versand.' },
    })
    return screen.getByRole('button', { name: COPY.de.contact.form.submit }).closest('form')!
  }
  it('submits the entered details to the same-origin endpoint and confirms receipt', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const form = await fillForm()
    fireEvent.submit(form)
    expect(await screen.findByText(COPY.de.contact.form.success)).toBeTruthy()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'Lokaler Test',
          email: 'test@example.com',
          message: 'Lokale Testanfrage ohne Versand.',
        }),
      }),
    )
    expect((screen.getByLabelText(COPY.de.contact.form.message) as HTMLTextAreaElement).value).toBe(
      '',
    )
  })
  it('preserves the enquiry and offers email when sending fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }))
    const form = await fillForm()
    fireEvent.submit(form)
    expect(await screen.findByText(COPY.de.contact.form.errorPrefix, { exact: false })).toBeTruthy()
    expect((screen.getByLabelText(COPY.de.contact.form.message) as HTMLTextAreaElement).value).toBe(
      'Lokale Testanfrage ohne Versand.',
    )
    expect(form.querySelector('a[href^="mailto:"]')).toBeTruthy()
  })
})
