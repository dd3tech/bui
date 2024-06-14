/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'path'
const r = (p) => resolve(__dirname, p)

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      reporter: [
        'html',
        'json',
        'lcovonly',
        'cobertura',
        'text-summary',
        'text',
        'html-spa',
        'text-lcov'
      ]
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts'
  },
  resolve: {
    alias: {
      '@': r('./src'),
      components: r('./src/components'),
      common: r('./src/common'),
      hooks: r('./src/hooks'),
      interfaces: r('./src/interfaces'),
      lib: r('./src/lib'),
      theme: r('./src/theme')
    }
  }
})
