import { defineConfig } from '@rstest/core';

export default defineConfig({
  testEnvironment: 'jsdom',
  globals: true,
  setupFiles: ['./src/setupTests.ts'],
  include: [
    '**/*.{test,spec}.?(c|m)[jt]s?(x)',
    'src/**/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)',
  ],
  exclude: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/storybook-static/**',
    '**/.{idea,git,cache,output,temp}/**',
  ],
  testTimeout: 10000,
  clearMocks: true,
  resetMocks: true,
});
