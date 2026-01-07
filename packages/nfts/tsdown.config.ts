import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts', './src/cli.ts'],
  format: ['esm'],
  clean: !process.argv.includes('--watch'),
  dts: true,
});
