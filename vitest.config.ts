import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: false,
    include: ['__tests__/**/*.test.{ts,tsx}'],
    globals: true,
    coverage: {
      reporter: ['text', 'lcov'],
      provider: 'v8',
    },
  },
})