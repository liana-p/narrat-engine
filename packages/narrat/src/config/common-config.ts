import { Type, Static } from '@sinclair/typebox';

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
