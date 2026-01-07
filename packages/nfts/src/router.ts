import {
  createRouter as createH3Router,
  type Router,
  defineEventHandler,
  setResponseHeader,
  type EventHandler,
  type EventHandlerResponse,
} from 'h3';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface RouterOptions {
  /**
   * Directory for file-based routes
   */
  routesDir?: string;
}

export interface NFTSRouter {
  h3Router: Router;
  options: RouterOptions;
}

export type RootLayoutComponent = (props: { children: { t: string } }) => { t: string };

let rootLayout: RootLayoutComponent | undefined;

const getCssAssets = () => {
  const assetsFile = resolve(process.cwd(), 'node_modules/.nfts_assets.json');
  if (existsSync(assetsFile)) {
    try {
      return JSON.parse(readFileSync(assetsFile, 'utf-8')) as string[];
    } catch (_e) {
      return [];
    }
  }
  return [];
};

/**
 * Set the root layout for all routes
 */
export function setRootLayout(layout: RootLayoutComponent | undefined) {
  rootLayout = layout;
}

/**
 * Create a new NFTS router
 */
export function createRouter(options: RouterOptions = {}): NFTSRouter {
  return {
    h3Router: createH3Router(),
    options,
  };
}

export type RouteHandler<T extends EventHandlerResponse = any> =
  EventHandler<T>;

export interface DefineRouteOptions {
  type?: 'html' | 'json' | 'text' | string;
}

/**
 * Define a route handler
 */
export function defineRoute<T extends EventHandlerResponse = any>(
  handler: RouteHandler<T>,
  options: DefineRouteOptions = {},
) {
  return defineEventHandler(async (event) => {
    const responseType = options.type || 'html';

    if (responseType === 'html') {
      setResponseHeader(event, 'Content-Type', 'text/html');
    } else if (responseType === 'json') {
      setResponseHeader(event, 'Content-Type', 'application/json');
    } else if (responseType === 'text') {
      setResponseHeader(event, 'Content-Type', 'text/plain');
    } else {
      setResponseHeader(event, 'Content-Type', responseType);
    }

    const result = await handler(event);
    let html: string | undefined;

    if (
      result &&
      typeof result === 'object' &&
      't' in result &&
      typeof result.t === 'string'
    ) {
      html = result.t;
      if (rootLayout && responseType === 'html') {
        // Wrap the SSR output with the root layout
        const wrapped = rootLayout({ children: result });
        html = wrapped.t;
      }
    } else if (typeof result === 'string') {
      html = result;
    }

    // Inject Vite client for HMR and CSS assets if in dev mode and it's an HTML response
    if (html !== undefined && responseType === 'html') {
      const viteClient = '<script type="module" src="/@vite/client"></script>';
      const assets = getCssAssets();
      const cssLinks = assets
        .map((path) => `<link rel="stylesheet" href="${path}">`)
        .join('\n');
      
      const headContent = `${viteClient}\n${cssLinks}`;

      if (html.includes('</head>')) {
        html = html.replace('</head>', `${headContent}</head>`);
      } else if (html.includes('</body>')) {
        html = html.replace('</body>', `${headContent}</body>`);
      } else if (html.includes('</html>')) {
        html = html.replace('</html>', `${headContent}</html>`);
      } else {
        html += headContent;
      }
      
      return html;
    }

    return result;
  });
}

