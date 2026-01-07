import { defineConfig, nfts } from 'nfts';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [solidPlugin({ ssr: true }), tailwindcss(), nfts()],
});
