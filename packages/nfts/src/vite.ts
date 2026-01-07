import { nitro, NitroPluginConfig } from 'nitro/vite';
import type { Plugin, UserConfig } from 'vite';
import type { NitroConfig } from 'nitro/types';
import { resolve, dirname } from 'node:path';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';

export interface NFTSViteOptions {
  nitro?: NitroConfig;
  /**
   * Routes directory
   */
  routesDir?: string;
  /**
   * Whether to enable HMR for the framework itself (development only)
   */
  frameworkHmr?: boolean;
}

/**
 * NFTS Vite plugin
 */
export function nfts(options: NFTSViteOptions = {}): Plugin[] {
  const rootDir = process.cwd();

  const nitroConfig = {
    dev: process.env.NODE_ENV === 'development',
    ...options.nitro,
  } as NitroPluginConfig;

  const serverDir = nitroConfig.serverDir || 'src';

  nitroConfig.serverDir = resolve(rootDir, serverDir as string);
  nitroConfig.scanDirs = [
    ...(nitroConfig.scanDirs || []),
    resolve(rootDir, serverDir as string),
  ];
  // nitroConfig.serverDir = resolve(rootDir, serverDir);

  const possibleRoutesDirs = [
    resolve(rootDir, 'routes'),
    resolve(rootDir, serverDir as string, 'routes'),
  ];

  if (options.routesDir) {
    possibleRoutesDirs.push(resolve(rootDir, options.routesDir));
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

  if (rootLayoutPath) {
    const relativeRootLayoutPath =
      './' +
      resolve(rootDir, rootLayoutPath)
        .replace(rootDir, '')
        .replace(/^[\\/]+/, '')
        .replace(/\\/g, '/');

    nitroConfig.virtual = {
      ...nitroConfig.virtual,
      '#nfts/root-layout-init': `
import { setRootLayout } from 'nfts';
import RootLayout from '${relativeRootLayoutPath}';

export default (nitroApp) => {
  setRootLayout(RootLayout);
};
`,
    };
    nitroConfig.plugins = [
      ...(nitroConfig.plugins || []),
      '#nfts/root-layout-init',
    ];
    nitroConfig.ignore = [...(nitroConfig.ignore || []), '**/_root.*'];
  }

  // Framework HMR support
  const frameworkSrc = resolve(rootDir, '../../packages/nfts/src/index.ts');
  const isFrameworkDev = existsSync(frameworkSrc);

  if (isFrameworkDev) {
    nitroConfig.alias = {
      nfts: frameworkSrc,
      ...nitroConfig.alias,
    };
    nitroConfig.externals = {
      inline: ['nfts', 'solid-js'],
      ...nitroConfig.externals,
    };
  } else {
    nitroConfig.externals = {
      inline: ['solid-js'],
      ...nitroConfig.externals,
    };
  }

  (nitroConfig as any).esbuild = {
    options: {
      jsxFactory: 'jsx',
      jsxFragment: 'Fragment',
      jsxImportSource: 'solid-js/h',
    },
  };

  nitroConfig.rollupConfig = {
    ...nitroConfig.rollupConfig,
    plugins: [
      ...((nitroConfig.rollupConfig as any)?.plugins || []),
      {
        name: 'nfts:jsx-alias',
        resolveId(id: string) {
          if (
            id === 'solid-js/jsx-runtime' ||
            id === 'solid-js/jsx-dev-runtime'
          ) {
            return this.resolve('solid-js/h/jsx-runtime');
          }
          return null;
        },
      },
    ],
  };

  const assetsFile = resolve(rootDir, 'node_modules/.nfts_assets.json');
  const collectedCss = new Set<string>();

  if (existsSync(assetsFile)) {
    try {
      const existing = JSON.parse(
        readFileSync(assetsFile, 'utf-8'),
      ) as string[];
      for (const path of existing) {
        collectedCss.add(path);
      }
    } catch (_e) {
      // Ignore
    }
  }

  return [
    {
      name: 'nfts:config',
      config() {
        return {
          optimizeDeps: {
            exclude: ['nfts'],
          },
          server: {
            watch: {
              ignored: ['!**/packages/nfts/src/**'],
            },
          },
          resolve: {
            alias: isFrameworkDev
              ? {
                  nfts: frameworkSrc,
                }
              : undefined,
          },
        } satisfies UserConfig;
      },
    },
    {
      name: 'nfts:css-collector',
      transform(code, id) {
        if (id.endsWith('.tsx') || id.endsWith('.jsx')) {
          const cssImportRegex = /import\s+['"]([^'"]+\.css(?:\?.*)?)['"]/g;
          let match;
          let changed = false;
          while ((match = cssImportRegex.exec(code)) !== null) {
            const cssPath = match[1];
            try {
              const resolved = resolve(dirname(id), cssPath.split('?')[0]);
              if (existsSync(resolved)) {
                const relativePath =
                  '/' +
                  resolved
                    .replace(rootDir, '')
                    .replace(/^[\\/]+/, '')
                    .replace(/\\/g, '/');

                if (!collectedCss.has(relativePath)) {
                  collectedCss.add(relativePath);
                  changed = true;
                }
              }
            } catch (_e) {
              // Ignore
            }
          }
          if (changed) {
            writeFileSync(assetsFile, JSON.stringify(Array.from(collectedCss)));
          }
        }
        return null;
      },
    },
    nitro(nitroConfig) as unknown as Plugin<any>,
    {
      name: 'nfts:hmr',
      transform(code, id) {
        if (process.env.NODE_ENV !== 'development') return;

        // Inject Vite client into HTML responses
        // This is a simple way to get HMR working in the browser
        if (id.endsWith('.tsx') || id.endsWith('.jsx')) {
          // We'll handle injection in the router instead for more reliability
        }
      },
    },
  ];
}
