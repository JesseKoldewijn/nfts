# nfts (Nitro Framework TypeScript)

A lightweight framework built on top of [Nitro v3](https://v3.nitro.build/) and [h3 v2](https://h3.dev/).

## Features

- **Nitro v3 (Alpha)**: Next-gen universal server engine.
- **h3 v2 (Beta)**: Minimal and high-performance HTTP framework.
- **Unified Router**: Support for both manual and file-based routing.
- **Type-safe Config**: `defineConfig` with Vite and Nitro support.
- **TypeScript First**: Built with TypeScript for the best developer experience.

## Usage

### Define Configuration

```typescript
import { defineConfig } from 'nfts';

export default defineConfig({
  dev: true,
  vite: {
    // Vite options
  }
});
```

### Routing

#### Manual Routing

```typescript
import { createRouter } from 'nfts';

const router = createRouter();

router.h3Router.get('/hello', () => 'Hello from NFTS!');
```

#### File-based Routing

NFTS automatically scans for routes in:
- `routes/`
- `src/routes/`
- Custom directory via `createRouter({ routesDir: '...' })`

### Create Server

```typescript
import { createNFTS } from 'nfts';

const nitro = await createNFTS({
  // config
});
```

## License

MIT

