import { Type, Static } from '@sinclair/typebox';
import { AudioInputConfigSchema } from './audio-config';
import { ButtonsConfigSchema } from './buttons-config';
import { CharactersFilesConfigSchema } from './characters-config';
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
import { ItemsInputConfigSchema } from './items-config';
import { LayoutConfigSchema } from './layout-config';
import { QuestsConfigSchema } from './quests-config';
import { ScreensInputConfigSchema } from './screens-config';
import { SkillsInputConfigSchema } from './skills-config';
import { TooltipsConfigSchema } from './tooltips-config';

export const ConfigInputSchema = Type.Object({
  baseAssetsPath: Type.Optional(Type.String()),
  baseDataPath: Type.Optional(Type.String()),
  gameTitle: Type.String(),
  saveFileName: Type.String(),
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
  // split: buttons
  buttons: Type.Optional(Type.Union([Type.String(), ButtonsConfigSchema])),
  // split: skills
  skills: Type.Optional(Type.Union([Type.String(), SkillsInputConfigSchema])),
  // Split: scripts
  scripts: Type.Union([Type.String(), ScriptsConfigSchema]),
  // split: audio
  audio: Type.Union([Type.String(), AudioInputConfigSchema]),
  notifications: Type.Optional(NotificationsConfigSchema),
  tooltips: Type.Optional(Type.Union([Type.String(), TooltipsConfigSchema])),
  hudStats: HudStatsConfigSchema,
  // split: items
  items: Type.Optional(Type.Union([Type.String(), ItemsInputConfigSchema])),
  interactionTags: Type.Optional(InteractionTagsConfigSchema),
  // split: quests
  quests: Type.Optional(Type.Union([Type.String(), QuestsConfigSchema])),
  transitions: Type.Optional(TransitionsConfigSchema),
  menuButtons: Type.Optional(MenuButtonsConfigSchema),
  debugging: Type.Optional(DebuggingConfigSchema),
  saves: Type.Optional(SavesConfigSchema),
  characters: Type.Union([Type.String(), CharactersFilesConfigSchema]),
});

export type ConfigInput = Static<typeof ConfigInputSchema>;
