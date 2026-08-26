/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

/**
 * Emits dist/<route>/index.html as a copy of dist/index.html for every
 * client-side route (tabs + legal pages) so deep links work on any static
 * host without server-side rewrite rules.
 */
function staticRouteFallback(routes: string[]): Plugin {
  let outDir = 'dist'
  return {
    name: 'static-route-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      for (const route of routes) {
        const dir = path.join(outDir, route)
        await mkdir(dir, { recursive: true })
        await copyFile(path.join(outDir, 'index.html'), path.join(dir, 'index.html'))
      }
    },
  }
}

/** Lokaler Formular-Test: /api → contact-relay (siehe README „Kontaktformular lokal testen") */
const contactProxy = { '/api': 'http://127.0.0.1:3081' }

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    staticRouteFallback(['services', 'projects', 'career', 'contact', 'impressum', 'datenschutz']),
  ],
  server: { proxy: contactProxy },
  preview: { proxy: contactProxy },
  build: {
    target: 'es2022',
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
