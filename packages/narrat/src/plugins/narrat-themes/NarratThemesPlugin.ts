import { Config } from '@/config/config-output';
import deepmerge from 'deepmerge';
import { NarratPlugin } from '../NarratPlugin';
import { CommandPlugin } from '@/vm/commands/command-plugin';
import { error } from '@/utils/error-handling';
import { useConfig } from '@/stores/config-store';

export type BaseTheme = {
  id: string;
  extendedConfig?: Partial<Config>;
};
export type InlineTheme = BaseTheme & {
  css: string;
};
export type ExternalTheme = BaseTheme & {
  cssPath: string;
};
export type Theme = InlineTheme | ExternalTheme;

export interface NarratThemesPluginOptions {
  defaultTheme?: string;
  themes?: Theme[];
}

export type ThemeTag = HTMLLinkElement | HTMLStyleElement;

export class NarratThemesPlugin extends NarratPlugin {
  defaultTheme?: string;
  themes: Theme[] = [];
  activeTheme?: {
    id: string;
    themeTag: ThemeTag;
  };

  customCommands: CommandPlugin<any>[];
  initialConfig!: Config;

  constructor(options: NarratThemesPluginOptions = {}) {
    super();
    if (options.defaultTheme) {
      this.defaultTheme = options.defaultTheme;
    }
    if (options.themes) {
      this.themes = options.themes;
    }
    this.customCommands = [this.createChangeThemeCommand()];
  }

  onNarratSetup(): void {
    if (this.defaultTheme) {
      const theme = this.themes.find((theme) => theme.id === this.defaultTheme);
      if (!theme) {
        error(`Theme ${this.defaultTheme} not found`);
        return;
      }
      this.setTheme(theme);
    }
  }

  addTheme(theme: Theme): void {
    this.themes.push(theme);
  }

  createChangeThemeCommand(): CommandPlugin<any> {
    const changeThemePlugin = CommandPlugin.FromOptions<{
      theme: string;
    }>({
      keyword: 'change_theme',
      argTypes: [{ name: 'theme', type: 'string' }],
      runner: async (ctx) => {
        this.changeTheme(ctx.options.theme);
      },
    });
    return changeThemePlugin;
  }

  changeTheme(themeId: string): void {
    if (themeId === 'default') {
      this.removeCurrentTheme();
      return;
    }
    const theme = this.findTheme(themeId);
    this.setTheme(theme);
  }

  findTheme(themeId: string): Theme {
    const theme = this.themes.find((theme) => theme.id === themeId);
    if (!theme) {
      error(`Theme ${themeId} not found`);
    }
    return theme!;
  }

  setTheme(theme: Theme): void {
    if (this.activeTheme) {
      this.removeCurrentTheme();
    }
    this.activeTheme = {
      themeTag: this.createThemeTag(theme),
      id: theme.id,
    };
    document.head.appendChild(this.activeTheme.themeTag);
    if (theme.extendedConfig) {
      this.initialConfig = deepmerge({}, useConfig().config);
      useConfig().extendConfig(theme.extendedConfig);
    }
  }

  createThemeTag(theme: Theme): ThemeTag {
    if (this.isInlineTheme(theme)) {
      const style = document.createElement('style');
      style.innerHTML = theme.css;
      return style;
    } else {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = theme.cssPath;
      link.id = theme.id;
      return link;
    }
  }

  isInlineTheme(theme: Theme): theme is InlineTheme {
    return (theme as InlineTheme).css !== undefined;
  }

  isExternalTheme(theme: Theme): theme is ExternalTheme {
    return (theme as ExternalTheme).cssPath !== undefined;
  }

  removeCurrentTheme() {
    if (this.activeTheme) {
      if (this.activeTheme.themeTag) {
        this.activeTheme.themeTag.remove();
      }
      const theme = this.findTheme(this.activeTheme.id);
      if (theme.extendedConfig) {
        useConfig().config = this.initialConfig;
      }
    }
    this.activeTheme = undefined;
  }
}
