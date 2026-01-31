import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    sourcemap: false, // Don't generate source maps in production
    minify: 'terser', // Use terser for better minification
    terser: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true // Remove debugger statements
      }
    }
  }
})