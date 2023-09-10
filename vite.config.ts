import { defineConfig } from 'vite';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';

// reference https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts
const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  test: vitestConfig.test,
  server: {
    host: true,
  },
});
