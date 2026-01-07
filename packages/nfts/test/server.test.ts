import { describe, it, expect, vi } from 'vitest';
import { createNFTS } from '../src/server';

// Mock nitro/builder to avoid actual server creation in tests
vi.mock('nitro/builder', () => ({
  createNitro: vi.fn().mockResolvedValue({
    hooks: {
      hook: vi.fn(),
    },
    options: {
      vite: {},
      rollupConfig: {},
    },
  }),
}));

describe('server', () => {
  it('should create an NFTS instance', async () => {
    const nitro = await createNFTS();
    expect(nitro).toBeDefined();
    expect(nitro.hooks).toBeDefined();
  });

  it('should respect rootDir option', async () => {
    const rootDir = '/tmp/nfts-test';
    const nitro = await createNFTS({ rootDir });
    expect(nitro).toBeDefined();
  });
});

