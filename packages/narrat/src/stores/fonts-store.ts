import { fontsConfig, getAssetUrl } from '@/config';
import {
  FontConfig,
  FontFileConfig,
  FontsConfig,
  FontSetConfig,
} from '@/config/fonts-config';
import { error } from '@/utils/error-handling';
import { defineStore, acceptHMRUpdate } from 'pinia';

export interface FontsStoreState {
  loadedFonts: Record<string, boolean>;
}

export interface FontsStoreSave {
  // Font choice is now stored in settings, no longer saved here
}

export const useFontsStore = defineStore('fonts-store', {
  state: () =>
    ({
      loadedFonts: {},
    }) as FontsStoreState,
  getters: {},
  actions: {
    getCurrentFont(): string | null {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { useSettings } = require('@/stores/settings-store');
        const settingsStore = useSettings();
        const fontChoice = settingsStore.getSetting('fontChoice') ?? 'default';
        return fontChoice;
      } catch (e) {
        return 'default';
      }
    },
    updateConfig(config: FontsConfig) {
      if (config.fontSets) {
        for (const fontSetId in config.fontSets) {
          this.loadFontSet(fontSetId);
        }
        // Don't call setFontSet here - the settings store handles font application
        // via updateFont() which ensures proper timing after settings are loaded
      }
    },
    generateSaveData() {
      return {
        // Font choice is now stored in settings
      };
    },
    loadSaveData(data: FontsStoreSave) {
      // Font choice is now stored in settings, no longer loaded here
    },
    reset(config: FontsConfig) {
      this.$reset();
      this.updateConfig(config);
    },
    async loadFontFile(name: string, file: FontFileConfig | string) {
      let font: FontFace;
      if (this.isFontConfigObject(file)) {
        font = new FontFace(
          name,
          `url(${getAssetUrl(file.file)})`,
          file.options,
        );
      } else {
        font = new FontFace(name, `url(${getAssetUrl(file)})`);
      }
      (document.fonts as any).add(font);
      try {
        await font.load();
        return true;
      } catch (e) {
        error(`Failed to load font ${file} (${name})`, e);
        return false;
      }
    },
    isFontConfigObject(font: string | FontFileConfig): font is FontFileConfig {
      return typeof font === 'object';
    },
    async loadNewFont(fontId: string, fontData: FontConfig) {
      for (const fontId in fontData.files) {
        await this.loadFontFile(fontData.name, fontData.files[fontId]);
      }
      this.loadedFonts[fontData.name] = true;
    },

    getFontSets() {
      const fonts = fontsConfig().fontSets;
      if (!fonts) {
        error('No fonts found in config');
        return {};
      }
      return fonts;
    },

    async loadIfNeeded(fontId: string, fontData: FontConfig) {
      if (!this.loadedFonts[fontData.name]) {
        return await this.loadNewFont(fontId, fontData);
      }
    },

    async loadFontSet(fontSetId: string) {
      const fontSet = this.getFontSets()[fontSetId];
      if (!fontSet) {
        error(`Font set ${fontSetId} not found`);
        return;
      }

      for (const fontId in fontSet) {
        await this.loadIfNeeded(fontId, fontSet[fontId]);
      }
    },

    async setFontSet(fontSetId: string | null) {
      let fontToLoad: string = 'default';
      if (!fontSetId) {
        if (this.getFontSets().default) {
          fontSetId = 'default';
        } else {
          return;
        }
      }
      if (fontSetId) {
        fontToLoad = fontSetId;
      }
      const font = this.getFontSets()[fontToLoad];
      await this.loadFontSet(fontToLoad);
      // currentFont is now stored in settings, not here
      this.setFontVariables(font);
    },

    setFontVariables(fontSet: FontSetConfig) {
      for (const fontId in fontSet) {
        const font = fontSet[fontId];
        const narrat = document.querySelector('#narrat') as HTMLElement;
        if (narrat) {
          narrat.style.setProperty(`--font-${fontId}`, font.fontFamily);
        }
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFontsStore, import.meta.hot));
}
