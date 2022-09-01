/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src', 'components'),
            hooks: path.resolve(__dirname, './src', 'hooks'),
            interfaces: path.resolve(__dirname, './src', 'interfaces'),
            tests: path.resolve(__dirname, './tests')
        }
    }
    // test: {
    //     coverage: {
    //         reporter: ['html', 'json', 'lcovonly', 'cobertura', 'text-summary', 'text', 'html-spa', 'text-lcov']
    //     }
    // },
})
