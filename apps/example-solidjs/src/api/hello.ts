import { defineRoute } from 'nfts';

export default defineRoute(
  () => {
    return {
      message: 'Hello from NFTS API!',
      timestamp: Date.now(),
    };
  },
  { type: 'json' },
);
