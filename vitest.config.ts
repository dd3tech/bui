import { defineConfig } from 'vitest/config'
// import react from '@vitejs/plugin-react/dist/index.mjs'
import { alias } from './alias.config'

export default defineConfig({
  // plugins: [react()],
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
