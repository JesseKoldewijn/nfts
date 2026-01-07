import { defineCommand } from 'citty';
import { consola } from 'consola';
import { createNitro, prepare, loadOptions } from 'nitro/builder';
import { resolveNFTSConfig } from '../utils/nitro';

export default defineCommand({
  meta: {
    name: 'prepare',
    description: 'Prepare project (generate types)',
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Project directory',
      default: '.',
    },
  },
  async run({ args }) {
    consola.info('Preparing NFTS project...');
    const options = await loadOptions(
      {
        rootDir: args.dir,
      },
      {
        c12: {
          name: 'nfts',
          configFile: 'nfts.config',
        },
      },
    );
    const nitro = await createNitro(resolveNFTSConfig(options));
    await prepare(nitro);
    consola.success('Preparation complete!');
  },
});
