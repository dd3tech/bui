/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            reporter: ['html', 'json', 'lcovonly', 'cobertura', 'text-summary']
        },
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/test-setup.ts'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            tests: path.resolve(__dirname, './tests')
        }
    }
})
