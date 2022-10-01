import { CommandPlugin } from './command-plugin';
import { loadDataFile } from '@/utils/ajax';
import { getDataUrl } from '@/config';

export const loadDataPlugin = CommandPlugin.FromOptions<{ url: string }>({
  keyword: 'load_data',
  argTypes: [{ name: 'url', type: 'string' }],
  runner: async (cmd) => {
    const { url } = cmd.options;
    const res = await loadDataFile(getDataUrl(url));
    return res;
  },
});
