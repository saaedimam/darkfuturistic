import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: false,
    coverage: {
      reporter: ['text', 'lcov'],
      provider: 'v8',
    },
  },
})