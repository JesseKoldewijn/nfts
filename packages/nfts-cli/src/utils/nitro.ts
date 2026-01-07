import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import type { NitroConfig } from 'nitro/types';

export function resolveNFTSConfig(config: NitroConfig): NitroConfig {
  const rootDir = config.rootDir || process.cwd();
  const scanDirs = [...(config.scanDirs || [])];

  // 1. Resolve routes and api directories
  const possibleScanDirs = [
    resolve(rootDir, 'routes'),
    resolve(rootDir, 'api'),
    resolve(rootDir, 'src/routes'),
    resolve(rootDir, 'src/api'),
  ];

  // Add existing directories to scanDirs
  for (const dir of possibleScanDirs) {
    if (existsSync(dir) && !scanDirs.includes(dir)) {
      scanDirs.push(dir);
    }
  }

  return {
    ...config,
    scanDirs,
  };
}

