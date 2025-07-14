// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup/vitest.setup.ts',
    include: ['tests/**/*.test.ts?(x)'], // keine .spec.ts
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    tsconfigRaw: require('./tsconfig.vitest.json'),
  },
});
