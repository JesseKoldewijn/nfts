import type { UserConfig as ViteConfig } from 'vite';
import type { NitroConfig } from 'nitro/types';
import type { NFTSRouter } from './router';

export interface NFTSConfig extends ViteConfig {
  /**
   * Nitro configuration
   */
  nitro?: NitroConfig;
  /**
   * Source directory for server-side code
   */
  serverDir?: string;
  /**
   * NFTS router
   */
  router?: NFTSRouter;
}

export function defineConfig(config: NFTSConfig): NFTSConfig {
  return config;
}
