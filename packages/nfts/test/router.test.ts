import { describe, it, expect, vi } from 'vitest';
import { createRouter, defineRoute, setRootLayout } from '../src/router';
import * as h3 from 'h3';

// Mock h3 to avoid real event handling issues
vi.mock('h3', async () => {
  const actual = await vi.importActual('h3');
  return {
    ...actual,
    setResponseHeader: vi.fn(),
    defineEventHandler: vi.fn((handler) => handler),
  };
});

describe('router', () => {
  it('should create a router', () => {
    const router = createRouter();
    expect(router).toBeDefined();
    expect(router.h3Router).toBeDefined();
  });

  it('should accept options', () => {
    const options = { routesDir: 'custom-routes' };
    const router = createRouter(options);
    expect(router.options.routesDir).toBe('custom-routes');
  });

  it('should define a route', async () => {
    const handler = vi.fn().mockReturnValue({ t: '<div>Hello</div>' });
    const route = defineRoute(handler);
    expect(route).toBeDefined();
    
    // Test the route handler behavior
    const event = {} as any;
    const result = await route(event);
    expect(handler).toHaveBeenCalled();
    expect(result).toContain('<div>Hello</div>');
    expect(h3.setResponseHeader).toHaveBeenCalledWith(event, 'Content-Type', 'text/html');
  });

  it('should wrap with root layout', async () => {
    const RootLayout = vi.fn(({ children }) => ({ t: `<html>${children.t}</html>` }));
    setRootLayout(RootLayout);
    
    const handler = vi.fn().mockReturnValue({ t: '<div>Content</div>' });
    const route = defineRoute(handler);
    
    const event = {} as any;
    const result = await route(event);
    
    expect(RootLayout).toHaveBeenCalled();
    expect(result).toContain('<html><div>Content</div>');
    expect(result).toContain('</html>');
    expect(result).toContain('/@vite/client');
    
    // Reset root layout for other tests
    setRootLayout(undefined);
  });
});

