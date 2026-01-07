import { createNitro } from 'nitro/builder';
import type { Nitro } from 'nitro/types';
import { H3, toNodeHandler } from 'h3';
import { resolve } from 'node:path';
import { existsSync, readdirSync } from 'node:fs';
import type { NFTSConfig } from './config';

export async function createNFTS(config: NFTSConfig = {}): Promise<Nitro> {
  const rootDir = config.rootDir || process.cwd();
  const scanDirs = [...(config.scanDirs || [])];

  // 1. Resolve routes directories
  const possibleRoutesDirs = [
    resolve(rootDir, 'routes'),
    resolve(rootDir, 'src/routes'),
  ];

  // Add custom routesDir from router options if provided
  if (config.router?.options?.routesDir) {
    possibleRoutesDirs.push(resolve(rootDir, config.router.options.routesDir));
  }

  // Add existing directories to scanDirs
  for (const dir of possibleRoutesDirs) {
    if (existsSync(dir)) {
      const parentDir = resolve(dir, '..');
      if (!scanDirs.includes(parentDir)) {
        scanDirs.push(parentDir);
      }
      if (!scanDirs.includes(dir)) {
        scanDirs.push(dir);
      }
    }
  }

  // Find _root layout
  let rootLayoutPath: string | undefined;
  const extensions = ['.tsx', '.jsx', '.ts', '.js'];
  for (const dir of possibleRoutesDirs) {
    for (const ext of extensions) {
      const p = resolve(dir, `_root${ext}`);
      if (existsSync(p)) {
        rootLayoutPath = p;
        break;
      }
    }
    if (rootLayoutPath) break;
  }

  // Framework HMR support
  const frameworkSrc = resolve(rootDir, '../../packages/nfts/src/index.ts');
  const isFrameworkDev = existsSync(frameworkSrc);

  const nitro = await createNitro({
    ...config,
    rootDir,
    serverDir: rootDir,
    scanDirs,
    dev: config.dev ?? true,
    typescript: {
      generateTsConfig: true,
      ...config.typescript,
    },
    experimental: {
      viteServer: true,
      ...config.experimental,
    },
    virtual: {
      ...(config as Record<string, any>).virtual,
      ...(rootLayoutPath
        ? {
            '#nfts/root-layout-init': `
import { setRootLayout } from 'nfts';
import RootLayout from '${rootLayoutPath.replace(/\\/g, '/')}';

export default (nitroApp) => {
  setRootLayout(RootLayout);
};
`,
          }
        : {}),
    },
    plugins: [
      ...((config as any).plugins || []),
      ...(rootLayoutPath ? ['#nfts/root-layout-init'] : []),
    ],
    ignore: [
      ...((config as any).ignore || []),
      '**/_root.*',
    ],
    esbuild: {
      options: {
        jsxFactory: 'jsx',
        jsxFragment: 'Fragment',
        jsxImportSource: 'solid-js/h',
      },
    },
    alias: {
      ...(isFrameworkDev ? { 'nfts': frameworkSrc } : {}),
      ...config.alias,
    },
    externals: {
      inline: [
        ...(isFrameworkDev ? ['nfts'] : []),
        'solid-js',
      ],
      ...config.externals,
    },
    rollupConfig: {
      ...config.rollupConfig,
    },
  });

  // Sync vite plugins to rollup for server build
  nitro.hooks.hook('rollup:before', (nitro: Record<string, any>) => {
    // Add JSX alias plugin for SolidJS
    nitro.options.rollupConfig.plugins = [
      ...(nitro.options.rollupConfig.plugins || []),
      {
        name: 'nfts:jsx-alias',
        resolveId(id: string) {
          if (id === 'solid-js/jsx-runtime' || id === 'solid-js/jsx-dev-runtime') {
            return this.resolve('solid-js/h/jsx-runtime');
          }
          return null;
        }
      }
    ];

    if (nitro.options.vite?.plugins) {
      const plugins = Array.isArray(nitro.options.vite.plugins)
        ? nitro.options.vite.plugins
        : [nitro.options.vite.plugins];

      nitro.options.rollupConfig.plugins = [
        ...(nitro.options.rollupConfig.plugins || []),
        ...plugins.flat().filter((p: Record<string, any>) => p && typeof p === 'object' && !p.name?.startsWith('vite:')),
      ];
    }
  });

  // Basic h3 app integration for local usage if needed
  const app = new H3();

  if (config.router?.h3Router) {
    app.use(config.router.h3Router);
  }

  // You can add default middlewares or hooks here

  return nitro;
}

export function createNFTSHandler(app: H3) {
  return toNodeHandler(app);
}
