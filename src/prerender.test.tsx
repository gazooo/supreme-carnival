/** @vitest-environment node */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { COPY } from './content/i18n'
import { renderDocument, routes } from './prerender'

const template = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
describe('Static public pages', () => {
  it.each(routes)('renders %s with page content, metadata and one primary heading', (route) => {
    const html = renderDocument(template, route)
    expect(html).not.toMatch(/__PAGE_|<!--app-html-->/)
    expect(html.match(/<h1[ >]/g)).toHaveLength(1)
    expect(html).toContain('href="https://lohrer.dev' + route + '"')
    expect(html).toContain(COPY.de.titles[route].replaceAll('&', '&amp;'))
    expect(html).toContain(COPY.de.descriptions[route].replaceAll('&', '&amp;'))
    expect(html).not.toContain('min-h-svh" aria-hidden="true"')
    if (route === '/contact') expect(html).toContain('id="contact-message"')
    if (route === '/projects') expect(html).toContain('id="mercedes"')
  })
})
