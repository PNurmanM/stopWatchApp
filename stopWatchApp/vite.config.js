import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/   "homepage": "https://PNurmanM.github.io/stopWatchApp",
export default defineConfig({
  base: '/stopWatchApp/',
  plugins: [react()],
})
