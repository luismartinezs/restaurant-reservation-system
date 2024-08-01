import { defineConfig, configDefaults } from 'vitest/config'
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    exclude:[
      ...configDefaults.exclude,
      'e2e/*'
    ]
  },
})