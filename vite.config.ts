/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { alias } from './alias.config'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
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
    alias
  }
})
