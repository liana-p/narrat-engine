import { Type, Static } from '@sinclair/typebox';
import { AudioInputConfigSchema } from './audio-config';
import { ButtonsConfigSchema } from './buttons-config';
import {
  DebuggingConfigSchema,
  DialogPanelConfigSchema,
  HudStatsConfigSchema,
  InteractionTagsConfigSchema,
  MenuButtonsConfigSchema,
  NotificationsConfigSchema,
  SavesConfigSchema,
  ScriptsConfigSchema,
  SplashScreenConfigSchema,
  TransitionsConfigSchema,
} from './common-config';
import { ItemsConfigSchema } from './items-config';
import { LayoutConfigSchema } from './layout-config';
import { QuestsConfigSchema } from './quests-config';
import { ScreensInputConfigSchema } from './screens-config';
import { SkillsInputConfigSchema } from './skills-config';

export const ConfigInputSchema = Type.Object({
  baseAssetsPath: Type.Optional(Type.String()),
  baseDataPath: Type.Optional(Type.String()),
  gameTitle: Type.String(),
  images: Type.Optional(Type.Record(Type.String(), Type.String())),
  layout: LayoutConfigSchema,
  gameFlow: Type.Optional(
    Type.Object({
      labelToJumpOnScriptEnd: Type.Optional(Type.String()),
    }),
  ),
  dialogPanel: Type.Optional(DialogPanelConfigSchema),
  splashScreens: Type.Optional(SplashScreenConfigSchema),
  // split: screens
  screens: Type.Union([Type.String(), ScreensInputConfigSchema]),
  // split: skills
  skills: Type.Optional(Type.Union([Type.String(), SkillsInputConfigSchema])),
  // Split: scripts
  scripts: Type.Union([Type.String(), ScriptsConfigSchema]),
  // split: audio
  audio: Type.Union([Type.String(), AudioInputConfigSchema]),
  notifications: Type.Optional(NotificationsConfigSchema),
  hudStats: HudStatsConfigSchema,
  // split: items
  items: Type.Optional(Type.Union([Type.String(), ItemsConfigSchema])),
  interactionTags: InteractionTagsConfigSchema,
  // split: quests
  quests: Type.Optional(Type.Union([Type.String(), QuestsConfigSchema])),
  transitions: Type.Optional(TransitionsConfigSchema),
  menuButtons: Type.Optional(MenuButtonsConfigSchema),
  debugging: Type.Optional(DebuggingConfigSchema),
  saves: SavesConfigSchema,
});

export type ConfigInput = Static<typeof ConfigInputSchema>;
