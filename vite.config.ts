/// <reference types="vitest/config" />
import { createServer, defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

/** Render every public route from the same React components and German copy. */
function staticPages(): Plugin {
  let outDir = 'dist'
  let build = false
  return {
    name: 'static-pages',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
      build = config.command === 'build'
    },
    async transformIndexHtml(html, context) {
      if (!context.server) return html
      const { renderDocument } = await context.server.ssrLoadModule('/src/prerender.tsx')
      const pathname = new URL(context.originalUrl ?? context.path, 'http://localhost').pathname
      return renderDocument(html, pathname)
    },
    configurePreviewServer(server) {
      // Vite otherwise serves the homepage for extensionless directory URLs.
      // Keep the public URL while selecting the matching prerendered document.
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url ?? '/', 'http://localhost')
        if (/^\/(services|projects|career|contact|impressum|datenschutz)\/?$/.test(url.pathname)) {
          request.url = url.pathname.replace(/\/$/, '') + '/index.html' + url.search
        }
        next()
      })
    },
    async closeBundle() {
      if (!build) return
      const server = await createServer({
        configFile: false,
        plugins: [react()],
        server: { middlewareMode: true },
        appType: 'custom',
      })
      try {
        const { renderDocument, routes } = await server.ssrLoadModule('/src/prerender.tsx')
        const template = await readFile(path.join(outDir, 'index.html'), 'utf8')
        for (const route of routes) {
          const directory = path.join(outDir, route.slice(1))
          await mkdir(directory, { recursive: true })
          await writeFile(path.join(directory, 'index.html'), renderDocument(template, route))
        }
      } finally {
        await server.close()
      }
    },
  }
}
const contactProxy = { '/api': 'http://127.0.0.1:3081' }
export default defineConfig({
  plugins: [react(), tailwindcss(), staticPages()],
  server: { proxy: contactProxy },
  preview: { proxy: contactProxy },
  build: { target: 'es2022' },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
