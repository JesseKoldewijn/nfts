import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm'],
  clean: !process.argv.includes('--watch'),
  dts: true,
});

