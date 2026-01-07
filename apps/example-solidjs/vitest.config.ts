import { defineConfig } from 'vitest/config';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    resolveSnapshotPath: (path, extension) => path + extension,
  },
  resolve: {
    conditions: ['browser', 'development'],
  },
});
