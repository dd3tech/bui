import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { alias } from './alias.config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias
  }
})
