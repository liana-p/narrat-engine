import { Type, Static } from '@sinclair/typebox';
import { AudioOptionsSchema, AudioRecordConfigSchema } from './audio-config';
import {
  DebuggingConfigSchema,
  DialogPanelConfigSchema,
  HudStatsConfigSchema,
  InteractionTagsConfigSchema,
  MenuButtonConfigSchema,
  NotificationsConfigSchema,
  SavesConfigSchema,
  SplashScreenConfigSchema,
  TransitionsConfigSchema,
} from './common-config';
import { ItemsConfigSchema } from './items-config';
import { LayoutConfigSchema } from './layout-config';
import { QuestsConfigSchema } from './quests-config';
import { ButtonConfigSchema, ScreensConfigSchema } from './screens-config';
import {
  SkillChecksConfigSchema,
  SkillOptionsSchema,
  SkillsListConfigSchema,
} from './skills-config';

export const ScreensInputSchema = Type.Union([
  Type.String(),
  ScreensConfigSchema,
]);

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
  dialoguePanel: Type.Optional(
    Type.Object({
      animateText: Type.Optional(Type.Boolean()),
      textSpeed: Type.Optional(Type.Number()),
      timeBetweenLines: Type.Optional(Type.Number()),
    }),
  ),
  dialogPanel: Type.Optional(DialogPanelConfigSchema),
  splashScreens: Type.Optional(SplashScreenConfigSchema),
  screens: ScreensInputSchema,
  buttons: Type.Optional(Type.Record(Type.String(), ButtonConfigSchema)),
  skills: Type.Optional(Type.Union([Type.String(), SkillsListConfigSchema])),
  skillOptions: Type.Optional(SkillOptionsSchema),
  skillChecks: Type.Optional(SkillChecksConfigSchema),
  scripts: Type.Union([Type.String(), Type.Array(Type.String())]),
  audio: Type.Union([Type.String(), AudioRecordConfigSchema]),
  audioOptions: Type.Optional(AudioOptionsSchema),
  notifications: NotificationsConfigSchema,
  hudStats: HudStatsConfigSchema,
  items: Type.Union([Type.String(), ItemsConfigSchema]),
  interactionTags: InteractionTagsConfigSchema,
  quests: Type.Union([Type.String(), QuestsConfigSchema]),
  transitions: Type.Optional(TransitionsConfigSchema),
  audioTriggers: Type.Optional(Type.Record(Type.String(), Type.String())),
  menuButtons: Type.Optional(MenuButtonConfigSchema),
  debugging: Type.Optional(DebuggingConfigSchema),
  saves: SavesConfigSchema,
});

export type ConfigInput = Static<typeof ConfigInputSchema>;
