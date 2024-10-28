import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // Changed from '0.0.0.0' to true
    port: 5173,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    watch: {
      usePolling: true
    }
  },
  resolve: {              // Keep the resolve configuration
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
