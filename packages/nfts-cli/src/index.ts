import { defineCommand, runMain } from 'citty';

const main = defineCommand({
  meta: {
    name: 'nfts',
    version: '0.1.0',
    description: 'NFTS CLI - Nitro Framework TypeScript',
  },
  subCommands: {
    dev: () => import('./commands/dev').then((m) => m.default),
    build: () => import('./commands/build').then((m) => m.default),
    prepare: () => import('./commands/prepare').then((m) => m.default),
  },
});

export const runNFTSMain = () => runMain(main);

if (import.meta.url === `file://${process.argv[1]}`) {
  runNFTSMain();
}

