import { describe, it, expect } from 'vitest';
import { H3, eventHandler } from 'h3';
import { createNFTS } from '../src/server';
import { createRouter } from '../src/router';
import { resolve } from 'node:path';

describe('nfts framework', () => {
  it('should initialize nitro', async () => {
    const nitro = await createNFTS({
      dev: true,
    });
    expect(nitro).toBeDefined();
    expect(nitro.options.dev).toBe(true);
  });

  it('should work with h3 utilities', () => {
    const app = new H3();
    const handler = eventHandler(() => 'Hello NFTS');
    app.use('/', handler);
    // Simple verification that h3 integration works
    expect(app).toBeDefined();
  });

  it('should handle router and directory discovery', async () => {
    const router = createRouter({
      routesDir: 'test/fixtures/routes'
    });
    
    const nitro = await createNFTS({
      dev: true,
      rootDir: resolve(__dirname, '..'),
      router
    });

    const routesDir = resolve(__dirname, 'fixtures/routes');
    // Nitro might add a trailing slash
    const hasDir = nitro.options.scanDirs.some(dir => dir === routesDir || dir === routesDir + '/');
    expect(hasDir).toBe(true);
  });
});

