import { defineCommand } from 'citty';
import { consola } from 'consola';
import { createServer } from 'vite';
import { resolve } from 'node:path';

export default defineCommand({
  meta: {
    name: 'dev',
    description: 'Start development server',
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Project directory',
      default: '.',
    },
    port: {
      type: 'string',
      description: 'Port to listen on',
    },
    host: {
      type: 'string',
      description: 'Host to listen on',
    },
  },
  async run({ args }) {
    process.env.NODE_ENV = 'development';
    consola.info('Starting NFTS development server...');

    const rootDir = resolve(process.cwd(), args.dir);

    // Start Vite server which will trigger Nitro via the plugin
    const server = await createServer({
      configFile: resolve(rootDir, 'nfts.config.ts'),
      root: rootDir,
      server: {
        port: args.port ? Number.parseInt(args.port) : 3000,
        host: args.host || true,
      },
    });

    await server.listen();
    server.printUrls();
  },
});
