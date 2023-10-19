import { registerPlugin } from '@/plugins/plugins';
import { NarratThemesPlugin } from '@/plugins/narrat-themes/NarratThemesPlugin';
import { funTheme } from '@/plugins/narrat-themes/fun-theme';
import { textOnlyTheme } from '@/plugins/narrat-themes/text-only';

export function setupThemesDemo() {
  const narratThemesPlugin = new NarratThemesPlugin();
  registerPlugin(narratThemesPlugin);
  narratThemesPlugin.addTheme(funTheme);
  narratThemesPlugin.addTheme(textOnlyTheme);
}
