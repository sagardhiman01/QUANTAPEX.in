import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures links work correctly on custom domains
  server: {
    host: true,
    allowedHosts: true,
  }
})
