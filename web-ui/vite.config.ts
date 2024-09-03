import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // This ensures that asset paths are relative
  server: {
    proxy: {
      '/api': `http://localhost:${process.env.SPRING_PORT || 8185}`
    }
  }
})
