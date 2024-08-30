import { Type, Static } from '@sinclair/typebox';
import { AudioInputConfigSchema } from './audio-config';
import { ButtonsConfigSchema } from './buttons-config';
import { CharactersFilesConfigSchema } from './characters-config';
import {
  CommonConfigInputSchema,
  DebuggingConfigSchema,
  DialogPanelConfigSchema,
  GraphicsSettingsSchema,
  HudStatsConfigSchema,
  InputConfigSchema,
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
import { SkillChecksInputConfigSchema } from './skillchecks-config';
import { TooltipsConfigSchema } from './tooltips-config';
import { SettingsConfigSchema } from './settings-config';
import { NarratYaml } from '@/types/app-types';
import { ChoicesInputConfigSchema } from './choices-config';
import { AnimationsConfigSchema } from './animations-config';
import { AchievementsInputConfigSchema } from './achievements-config';
import { MacrosConfigSchema } from './macros-config';
import { PreloadConfigSchema } from './preload-config';

export const BaseConfigInputSchema = Type.Object({
  screens: Type.Union([Type.String(), ScreensInputConfigSchema]),
  buttons: Type.Optional(Type.Union([Type.String(), ButtonsConfigSchema])),
  skills: Type.Optional(Type.Union([Type.String(), SkillsInputConfigSchema])),
  skillChecks: Type.Optional(
    Type.Union([Type.String(), SkillChecksInputConfigSchema]),
  ),
  scripts: Type.Optional(Type.Union([Type.String(), ScriptsConfigSchema])),
  audio: Type.Union([Type.String(), AudioInputConfigSchema]),
  tooltips: Type.Optional(Type.Union([Type.String(), TooltipsConfigSchema])),
  items: Type.Optional(Type.Union([Type.String(), ItemsInputConfigSchema])),
  achievements: Type.Optional(
    Type.Union([Type.String(), AchievementsInputConfigSchema]),
  ),
  quests: Type.Optional(Type.Union([Type.String(), QuestsConfigSchema])),
  characters: Type.Union([Type.String(), CharactersFilesConfigSchema]),
  choices: Type.Optional(Type.Union([Type.String(), ChoicesInputConfigSchema])),
  animations: Type.Optional(
    Type.Union([Type.String(), AnimationsConfigSchema]),
  ),
  macros: Type.Optional(MacrosConfigSchema),
  preload: Type.Optional(PreloadConfigSchema),
});

export const ConfigInputSchemaWithCommon = Type.Intersect([
  BaseConfigInputSchema,
  Type.Object({
    common: CommonConfigInputSchema,
  }),
]);
export type ConfigInputWithCommon = Static<typeof ConfigInputSchemaWithCommon>;

export const ConfigInputSchemaWithoutCommon = Type.Intersect([
  BaseConfigInputSchema,
  Type.Object({
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
    input: Type.Optional(InputConfigSchema),
    graphics: Type.Optional(GraphicsSettingsSchema),
  }),
]);
export type ConfigInputWithoutCommon = Static<
  typeof ConfigInputSchemaWithoutCommon
>;

export const ConfigInputSchema = Type.Union([
  ConfigInputSchemaWithCommon,
  ConfigInputSchemaWithoutCommon,
]);

export function isConfigInputWithCommon(
  config: ConfigInput,
): config is ConfigInputWithCommon {
  return 'common' in config;
}
export type ConfigInput = Static<typeof ConfigInputSchema>;
export type ModuleConfigInput = {
  [Key in keyof ConfigInputWithCommon]: NarratYaml | ConfigInputWithCommon[Key];
};
