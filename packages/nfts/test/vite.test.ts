import { describe, it, expect, vi } from 'vitest';
import { nfts } from '../src/vite';

describe('vite plugin', () => {
  it('should return an array of plugins', () => {
    const plugins = nfts();
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBeGreaterThan(0);
  });

  it('should include nfts config plugin', () => {
    const plugins = nfts();
    const configPlugin = plugins.flat().find(p => p && (p as any).name === 'nfts:config');
    expect(configPlugin).toBeDefined();
  });
});

