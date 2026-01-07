import { describe, it, expect, vi } from 'vitest';
import { runNFTSMain } from '../src/index';

// Mock citty to avoid actual CLI execution
vi.mock('citty', () => ({
  createMain: vi.fn().mockReturnValue({
    run: vi.fn(),
  }),
  defineCommand: vi.fn((config) => config),
}));

describe('cli', () => {
  it('should initialize the main CLI', () => {
    // This just tests that it can be imported and initialized
    expect(runNFTSMain).toBeDefined();
  });
});

