import { Type, Static } from '@sinclair/typebox';
import {
  LayoutConfig,
  LayoutConfigSchema,
  defaultLayoutConfig,
} from './layout-config';
import { SettingsConfig, SettingsConfigSchema } from './settings-config';
import { DEFAULT_TEXT_SPEED } from '@/constants';

export const DialogPanelConfigSchema = Type.Optional(
  Type.Object({
    animateText: Type.Optional(Type.Boolean()),
    textSpeed: Type.Optional(Type.Number()),
    timeBetweenLines: Type.Optional(Type.Number()),
    overlayMode: Type.Optional(Type.Boolean()),
    rightOffset: Type.Optional(Type.Number()),
    bottomOffset: Type.Optional(Type.Number()),
    width: Type.Optional(Type.Number()),
    height: Type.Optional(Type.Number()),
    hideDuringTransition: Type.Optional(Type.Boolean()),
    showAfterScriptEnd: Type.Optional(Type.Boolean()),
  }),
);
export type DialogPanelConfig = Static<typeof DialogPanelConfigSchema>;

export const SplashScreenConfigSchema = Type.Object({
  engineSplashScreen: Type.Optional(
    Type.Object({
      skip: Type.Optional(Type.Boolean()),
      fadeDuration: Type.Optional(Type.Number()),
      timeBeforeFadeout: Type.Optional(Type.Number()),
      overrideText: Type.Optional(Type.String()),
      overrideLogo: Type.Optional(Type.String()),
    }),
  ),
  gameSplashScreen: Type.Optional(
    Type.Object({
      startButtonText: Type.Optional(Type.String()),
    }),
  ),
});
export type SplashScreenConfig = Static<typeof SplashScreenConfigSchema>;

export const NotificationsConfigSchema = Type.Object({
  timeOnScreen: Type.Number(),
  alsoPrintInDialogue: Type.Optional(Type.Boolean()),
});
export type NotificationsConfig = Static<typeof NotificationsConfigSchema>;

export const HudStatDataSchema = Type.Object({
  name: Type.String(),
  icon: Type.String(),
  startingValue: Type.Number(),
  maxValue: Type.Optional(Type.Number()),
  minValue: Type.Optional(Type.Number()),
  decimals: Type.Optional(Type.Number()),
  prefix: Type.Optional(Type.String()),
  suffix: Type.Optional(Type.String()),
  hideName: Type.Optional(Type.Boolean()),
  // Formatting options, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
  formatting: Type.Optional(
    Type.Object({
      style: Type.Union([
        Type.Literal('decimal'),
        Type.Literal('currency'),
        Type.Literal('percent'),
        Type.Literal('unit'),
      ]),
      currency: Type.Optional(Type.String()),
      unit: Type.Optional(Type.String()),
    }),
  ),
});
export type HudStatData = Static<typeof HudStatDataSchema>;

export const HudStatsConfigSchema = Type.Record(
  Type.String(),
  HudStatDataSchema,
);
export type HudStatsConfig = Static<typeof HudStatsConfigSchema>;

export const InteractionTagsConfigSchema = Type.Record(
  Type.String(),
  Type.Object({
    onlyInteractOutsideOfScripts: Type.Optional(Type.Boolean()),
  }),
);
export type InteractionTagsConfig = Static<typeof InteractionTagsConfigSchema>;

export const TransitionSettingsSchema = Type.Object({
  delay: Type.Optional(Type.Number()),
  duration: Type.Optional(Type.Number()),
});
export type TransitionSettings = Static<typeof TransitionSettingsSchema>;

export const TransitionsConfigSchema = Type.Record(
  Type.String(),
  TransitionSettingsSchema,
);
export type TransitionsConfig = Static<typeof TransitionsConfigSchema>;

export const MenuButtonConfigSchema = Type.Object({
  text: Type.String(),
  cssClass: Type.Optional(Type.String()),
});
export type MenuButtonConfig = Static<typeof MenuButtonConfigSchema>;

export const MenuButtonsConfigSchema = Type.Record(
  Type.String(),
  MenuButtonConfigSchema,
);
export type MenuButtonsConfig = Static<typeof MenuButtonsConfigSchema>;

export const DebuggingConfigSchema = Type.Object({
  showScriptFinishedMessage: Type.Optional(Type.Boolean()),
});
export type DebuggingConfig = Static<typeof DebuggingConfigSchema>;

export const SavesConfigSchema = Type.Object({
  mode: Type.String(),
  slots: Type.Number(),
  runOnReload: Type.Optional(Type.String()),
});
export type SavesConfig = Static<typeof SavesConfigSchema>;

export const ScriptsConfigSchema = Type.Array(Type.String());
export type ScriptsConfig = Static<typeof ScriptsConfigSchema>;

export const defaultScriptsConfig = [];

export const CommonConfigInputSchema = Type.Object({
  baseAssetsPath: Type.Optional(Type.String()),
  baseDataPath: Type.Optional(Type.String()),
  gameTitle: Type.String(),
  saveFileName: Type.String(),
  images: Type.Optional(Type.Record(Type.String(), Type.String())),
  layout: LayoutConfigSchema,
  settings: Type.Optional(SettingsConfigSchema),
  gameFlow: Type.Optional(
    Type.Object({
      labelToJumpOnScriptEnd: Type.Optional(Type.String()),
    }),
  ),
  dialogPanel: Type.Optional(DialogPanelConfigSchema),
  splashScreens: Type.Optional(SplashScreenConfigSchema),
  notifications: Type.Optional(NotificationsConfigSchema),
  hudStats: HudStatsConfigSchema,
  interactionTags: Type.Optional(InteractionTagsConfigSchema),
  transitions: Type.Optional(TransitionsConfigSchema),
  menuButtons: Type.Optional(MenuButtonsConfigSchema),
  debugging: Type.Optional(DebuggingConfigSchema),
  saves: Type.Optional(SavesConfigSchema),
});
export type CommonConfigInput = Static<typeof CommonConfigInputSchema>;

export interface CommonConfig {
  baseAssetsPath: string;
  baseDataPath: string;
  gameTitle: string;
  saveFileName: string;
  images: {
    [key: string]: string;
  };
  layout: LayoutConfig;
  settings: SettingsConfig;
  gameFlow: {
    labelToJumpOnScriptEnd?: string;
  };
  dialogPanel: DialogPanelConfig;
  splashScreens: SplashScreenConfig;
  notifications: NotificationsConfig;
  hudStats: HudStatsConfig;
  interactionTags: InteractionTagsConfig;
  transitions: TransitionsConfig;
  menuButtons: MenuButtonsConfig;
  debugging: DebuggingConfig;
  saves: SavesConfig;
}

export const defaultCommonConfig: CommonConfig = {
  baseAssetsPath: '',
  baseDataPath: '',
  gameTitle: 'Narrat Game',
  saveFileName: 'narrat save',
  images: {},
  layout: defaultLayoutConfig,
  settings: {},
  gameFlow: {},
  dialogPanel: {
    overlayMode: true,
    rightOffset: 100,
    bottomOffset: 50,
    width: 475,
    height: 680,
    textSpeed: DEFAULT_TEXT_SPEED,
    animateText: true,
    timeBetweenLines: 100,
    hideDuringTransition: false,
    showAfterScriptEnd: false,
  },
  splashScreens: {},
  notifications: {
    timeOnScreen: 2.5,
    alsoPrintInDialogue: false,
  },
  hudStats: {},
  interactionTags: {
    default: {
      onlyInteractOutsideOfScripts: true,
    },
  },
  transitions: {},
  menuButtons: {},
  debugging: {
    showScriptFinishedMessage: false,
  },
  saves: {
    mode: 'manual',
    slots: 10,
  },
};
