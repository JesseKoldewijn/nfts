import { defineCommand } from 'citty';
import { consola } from 'consola';
import { build } from 'vite';
import { resolve } from 'node:path';

export default defineCommand({
  meta: {
    name: 'build',
    description: 'Build project for production',
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Project directory',
      default: '.',
    },
  },
  async run({ args }) {
    process.env.NODE_ENV = 'production';
    consola.info('Building NFTS project for production...');

    const rootDir = resolve(process.cwd(), args.dir);

    await build({
      configFile: resolve(rootDir, 'nfts.config.ts'),
      root: rootDir,
      build: {
        ssr: true,
        rollupOptions: {
          input: {
            // Provide a dummy entry if none exists, 
            // but Nitro plugin should handle the actual server build
            index: resolve(rootDir, 'src/routes/index.tsx') 
          }
        }
      }
    });

    consola.success('Build complete!');
  },
});
