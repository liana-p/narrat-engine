---
title: Available config files in narrat
description: This page lists all the available config files in narrat and their options
---

## Narrat Config Files

Narrat uses various `.yaml` config files to customise the game and engine. To learn more about config files, visit the [config files guide](../guides/config-files.md).

## Available config files

Here is a list of all the currently available config files in narrat:

- [common.yaml](#commonyaml): General options
- [achievements.yaml](#achievementsyaml): Achievements
- [animations.yaml](#animationsyaml): Animations
- [audio.yaml](#audioyaml): Audio
- [buttons.yaml](#buttonsyaml): Screen buttons
- [characters.yaml](#charactersyaml): Characters and portraits
- [choices.yaml](#choicesyaml): Choices
- [items.yaml](#itemsyaml): Items
- [macros.yaml](#macrosyaml): Macros
- [preload.yaml](#preloadyaml): Assets preloading
- [screens.yaml](#screensyaml): Screens
- [scripts.yaml](#scriptsyaml): Scripts list
- [skills.yaml](#skillsyaml): Skills
- [skillChecks.yaml](#skillchecksyaml): Skill checks
- [quests.yaml](#questsyaml): Quests
- [tooltips.yaml](#tooltipyaml): Tooltips

| Config file                          | Description              | Example file                                                                                                                        | Type definition                                                                                                                |
| ------------------------------------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [common.yaml](#commonyaml)           | General options          | [common.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/common.yaml)           | [CommonConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/common-config.ts)           |
| [animations.yaml](#animationsyaml)   | Animations               | [animations.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/animations.yaml)   | [AnimationsConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/animations-config.ts)   |
| [audio.yaml](#audioyaml)             | Audio                    | [audio.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/audio.yaml)             | [AudioConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/audio-config.ts)             |
| [buttons.yaml](#buttonsyaml)         | Screen buttons           | [buttons.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/buttons.yaml)         | [ButtonsConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/buttons-config.ts)         |
| [characters.yaml](#charactersyaml)   | Characters and portraits | [characters.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/characters.yaml)   | [CharactersConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/characters-config.ts)   |
| [choices.yaml](#choicesyaml)         | Choices                  | [choices.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/choices.yaml)         | [ChoicesConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/choices-config.ts)         |
| [items.yaml](#itemsyaml)             | Items                    | [items.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/items.yaml)             | [ItemsConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/items-config.ts)             |
| [macros.yaml](#macrosyaml)           | Macros                   | [macros.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/macros.yaml)           | [MacrosConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/macros-config.ts)           |
| [preload.yaml](#preloadyaml)         | Assets preloading        | [preload.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/preload.yaml)         | [PreloadConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/preload-config.ts)         |
| [screens.yaml](#screensyaml)         | Screens                  | [screens.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/screens.yaml)         | [ScreensConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/screens-config.ts)         |
| [scripts.yaml](#scriptsyaml)         | Scripts list             | [scripts.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/scripts.yaml)         | [ScriptsConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/scripts-config.ts)         |
| [skills.yaml](#skillsyaml)           | Skills                   | [skills.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/skills.yaml)           | [SkillsConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/skills-config.ts)           |
| [skillChecks.yaml](#skillchecksyaml) | Skill checks             | [skillChecks.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/skillChecks.yaml) | [SkillChecksConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/skillChecks-config.ts) |
| [quests.yaml](#questsyaml)           | Quests                   | [quests.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/quests.yaml)           | [QuestsConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/quests-config.ts)           |
| [tooltips.yaml](#tooltipyaml)        | Tooltips                 | [tooltips.yaml](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples/default/config/tooltips.yaml)       | [TooltipsConfigSchema](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/tooltips-config.ts)       |

### common.yaml

TODO: Fill the rest of those docs with more info on each config file
