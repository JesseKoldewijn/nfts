import { defineNitroConfig } from 'nitro/config';

export default defineNitroConfig({
  serverDir: 'src',
  scanDirs: ['routes', 'api'],
  typescript: {
    generateTsConfig: true,
  },
});

