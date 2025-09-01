## [4.1.8](https://github.com/liana-p/narrat-engine/compare/v4.1.7...v4.1.8) (2025-09-01)



## [4.1.7](https://github.com/liana-p/narrat-engine/compare/v4.1.6...v4.1.7) (2025-09-01)


### Features

* ability to override skillchecks logic and text ([#354](https://github.com/liana-p/narrat-engine/issues/354)) ([18737f6](https://github.com/liana-p/narrat-engine/commit/18737f61aa457cf208856b95fe90f544c5dac3e9)).

See [the overriding skill checks logic section in the skills documentation](https://docs.narrat.dev/features/skills.html#overriding-skill-checks-logic) for more info.



## [4.1.6](https://github.com/liana-p/narrat-engine/compare/v4.1.5...v4.1.6) (2025-08-17)


### Bug Fixes

* Tooltip closing ([#348](https://github.com/liana-p/narrat-engine/issues/348)) ([9be68fa](https://github.com/liana-p/narrat-engine/commit/9be68faa79c4115edf8ddaf6605a64ffe97a8376))



## [4.1.5](https://github.com/liana-p/narrat-engine/compare/v4.1.4...v4.1.5) (2025-08-17)


### Bug Fixes

* Changing audio settings now correctly updates volume ([#345](https://github.com/liana-p/narrat-engine/issues/345)) ([7f19c56](https://github.com/liana-p/narrat-engine/commit/7f19c569c89ce7680102ac8a14d688cc9c100fc3))



## [4.1.4](https://github.com/liana-p/narrat-engine/compare/v4.1.3...v4.1.4) (2025-08-14)


### Bug Fixes

* save slot functionality restored and save menu closes system menu ([#341](https://github.com/liana-p/narrat-engine/issues/341)) ([5a04c80](https://github.com/liana-p/narrat-engine/commit/5a04c8061f6111588201fe203673574858460430))



## [4.1.3](https://github.com/liana-p/narrat-engine/compare/v4.1.2...v4.1.3) (2025-08-12)


### Features

* added config options for choices ([#340](https://github.com/liana-p/narrat-engine/issues/340)) ([775d550](https://github.com/liana-p/narrat-engine/commit/775d550588553702f030c9d0dd4ed564f9ac4aa2))

Note the three new options in the [dialogPanel section of the common config](https://docs.narrat.dev/features/dialog-panel.html#dialog-panel-config-options):

* `showChoicesOutcomes`
* `lockSeenChoices`
* `allowSpacebarInChoices` ⚠️ the default behaviour has changed here, spacebar is now not allowed by default in choices, except in debug mode. If you want the old behaviour, set `allowSpacebarInChoices` to `false` in the config.


## [4.1.2](https://github.com/liana-p/narrat-engine/compare/v4.1.1...v4.1.2) (2025-08-03)


### Bug Fixes

* handle apostrophes in tooltips ([883fc47](https://github.com/liana-p/narrat-engine/commit/883fc47cb51bbd72a001f8a533f1dac24eb7664e))



## [4.1.1](https://github.com/liana-p/narrat-engine/compare/v4.1.0...v4.1.1) (2025-08-03)


### Bug Fixes

* support multiple tooltips per line of dialogue ([e80a27f](https://github.com/liana-p/narrat-engine/commit/e80a27fcc0bdc9445dea7a639905cb7d9fb043b0))



# [4.1.0](https://github.com/liana-p/narrat-engine/compare/v4.0.2...v4.1.0) (2025-08-03)


### Bug Fixes

* tooltips supporting sentences ([#333](https://github.com/liana-p/narrat-engine/issues/333)) ([726d756](https://github.com/liana-p/narrat-engine/commit/726d756fb42732881cc6ff0487a8b3afb381ab8d))

This requires using a new system where tooltips syntax has a suffix. See [tooltips docs](https://docs.narrat.dev/features/tooltips.html) for more info.



## [4.0.2](https://github.com/liana-p/narrat-engine/compare/v4.0.1...v4.0.2) (2025-07-31)

* fix: update some small details in the narrat template that weren't up to date, may fix issues with Steamworks.js

## [4.0.1](https://github.com/liana-p/narrat-engine/compare/v4.0.0...v4.0.1) (2025-07-30)


### Bug Fixes

* correct narrat 4 template CSS import error ([d6206e4](https://github.com/liana-p/narrat-engine/commit/d6206e46ded3491fc14cef7726a02cf4f6b5d63a))



# [4.0.0](https://github.com/liana-p/narrat-engine/compare/v3.17.9...v4.0.0) (2025-07-30)

Narrat 4 released, see below.

* [Migration Guide](https://docs.narrat.dev/tutorials/narrat-4-migration.html) (for existing games)
* [Localization Guide](https://docs.narrat.dev/features/localization.html)
* [Updated Steam publishing guide](https://docs.narrat.dev/guides/steam-publishing.html)

# [4.0.0-alpha.3](https://github.com/liana-p/narrat-engine/compare/v4.0.0-alpha.2...v4.0.0-alpha.3) (2025-07-28)


### Features

* Gamepad support in settings ([#331](https://github.com/liana-p/narrat-engine/issues/331)) ([bbe2709](https://github.com/liana-p/narrat-engine/commit/bbe270976feae8981674f7bac02aeda350193e72))



# [4.0.0-alpha.2](https://github.com/liana-p/narrat-engine/compare/v4.0.0-alpha.1...v4.0.0-alpha.2) (2025-07-27)

Fixed some issues with the template, and added an example of json localization if anyone doesn't want to use yaml.

# [4.0.0-alpha.1](https://github.com/liana-p/narrat-engine/compare/v3.17.9...v4.0.0-alpha.1) (2025-07-27)

### Breaking Changes

* Now requires node.js 22+ (use [nvm](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows) to manage your node.js versions and easily update).
* Now recommended to use [pnpm](https://pnpm.io/) instead of npm. npm is frequently unreliable with updating, while pnpm is much faster and keeps caches of downloads to save data. You can still use npm though.
* The Narrat template has been updated to backport Steam features and localization. Using a game from before 4.0.0 might still work bue you will need to look at the template to manually apply some of the changes if you want to benefit from the new features.

### Features

#### Localization

* New localization feature in preview. See [preview documentation](https://narrat-docs-git-narrat-4-nialnas-projects.vercel.app/features/localization.html).
* The Narrat template comes with localization setup and sample localization files

#### Steam Publishing

* New narrat template includes improved Steam support based on Lovely Lady RPG, with achievements, cloud saves, native Steam Deck support, and easy ways to create and publish builds to Steam for all platforms. See [preview Steam publishing documentation](https://narrat-docs-git-narrat-4-nialnas-projects.vercel.app/guides/steam-publishing.html) for more info.


## [3.17.9](https://github.com/liana-p/narrat-engine/compare/v3.17.8...v3.17.9) (2025-07-23)


### Features

* show old choices feature ([#327](https://github.com/liana-p/narrat-engine/issues/327)) ([eda8da3](https://github.com/liana-p/narrat-engine/commit/eda8da3d2700b11b169e48c9c37d4701a6cc743a))



## [3.17.8](https://github.com/liana-p/narrat-engine/compare/v3.17.7...v3.17.8) (2025-07-13)


### Bug Fixes

* secret achievements now properly display after unlocking ([4833820](https://github.com/liana-p/narrat-engine/commit/4833820b109c562d036956c0ee5221eb2111a3bc))



## [3.17.7](https://github.com/liana-p/narrat-engine/compare/v3.17.6...v3.17.7) (2025-07-05)



## [3.17.6](https://github.com/liana-p/narrat-engine/compare/v3.17.5...v3.17.6) (2025-07-05)


### Features

* add feedback class when game dialog buttons are active ([8cd0c2e](https://github.com/liana-p/narrat-engine/commit/8cd0c2edc415a321d369b128fdf9937a2101983e))



## [3.17.5](https://github.com/liana-p/narrat-engine/compare/v3.17.4...v3.17.5) (2025-07-05)



## [3.17.4](https://github.com/liana-p/narrat-engine/compare/v3.17.3...v3.17.4) (2025-07-05)



## [3.17.3](https://github.com/liana-p/narrat-engine/compare/v3.17.2...v3.17.3) (2025-06-21)


### Bug Fixes

* fix bug where gamepad picked the wrong actions in the system menu ([70d3c0b](https://github.com/liana-p/narrat-engine/commit/70d3c0b9cace1103ba9b06e910bee8edf509668d))



## [3.17.2](https://github.com/liana-p/narrat-engine/compare/v3.17.1...v3.17.2) (2025-06-21)


### Features

* save data prefix for custom save file namespacing ([#321](https://github.com/liana-p/narrat-engine/issues/321)) ([36006ab](https://github.com/liana-p/narrat-engine/commit/36006abd5ce296c3ad8154d538d49b791b77504b))



## [3.17.1](https://github.com/liana-p/narrat-engine/compare/v3.17.0...v3.17.1) (2025-06-01)


### Features

* new narrat event when an achievement is unlocked ([#316](https://github.com/liana-p/narrat-engine/issues/316)) ([09fd670](https://github.com/liana-p/narrat-engine/commit/09fd670327d6d7d9373e1bd3a8231a4fdd1251e3))



# [3.17.0](https://github.com/liana-p/narrat-engine/compare/v3.16.3...v3.17.0) (2025-04-09)


### Features

* Better gamepad integration (quests cycling with gamepad, right stick scrolling in menus) ([#304](https://github.com/liana-p/narrat-engine/issues/304)) ([25f0813](https://github.com/liana-p/narrat-engine/commit/25f08132239c9482aa0ac09feae6151810fcfcd2))
* onHover function for screen objects ([#303](https://github.com/liana-p/narrat-engine/issues/303)) ([a9fc09b](https://github.com/liana-p/narrat-engine/commit/a9fc09b17ddf08e4048a67895b9d2b1008cb8efb))
* Achievements now support a `hidden` option to not appear at all until found (different from `secret`)
* `ambiant` audio channel renamed to `ambient` for correct spelling. This is both in user-facing text and in code. If any or your scripts or config referred to `ambiant`, do a search and replace to fix to `ambient`


## [3.16.3](https://github.com/liana-p/narrat-engine/compare/v3.16.1...v3.16.3) (2024-11-24)



## [3.16.3](https://github.com/liana-p/narrat-engine/compare/v3.16.1...v3.16.3) (2024-11-24)



## [3.16.3](https://github.com/liana-p/narrat-engine/compare/v3.16.1...v3.16.3) (2024-11-24)




## [3.16.1](https://github.com/liana-p/narrat-engine/compare/v3.16.0...v3.16.1) (2024-09-06)


### Bug Fixes

* issue with character names not appearing after a clear_dialog if same character is speaking ([847cbb5](https://github.com/liana-p/narrat-engine/commit/847cbb5108b86d3ec9198ee9e075e13e9f8a73f0))



# [3.16.0](https://github.com/liana-p/narrat-engine/compare/v3.15.4...v3.16.0) (2024-09-01)


### Features

* new custom fonts feature ([77e8564](https://github.com/liana-p/narrat-engine/commit/77e85645f093f761c48541122a618747e8194112))



## [3.15.4](https://github.com/liana-p/narrat-engine/compare/v3.15.3...v3.15.4) (2024-09-01)


### Bug Fixes

* menus now close when returning to the menu ([0e996ef](https://github.com/liana-p/narrat-engine/commit/0e996ef9dbb5fb108af8953f4c6d4521571e2907))
* save achievements as soon as they're unlocked ([92cb0b6](https://github.com/liana-p/narrat-engine/commit/92cb0b6ba54b2b0f235d45ca49ec63554aaeda7b))



## [3.15.3](https://github.com/liana-p/narrat-engine/compare/v3.15.2...v3.15.3) (2024-09-01)


### Bug Fixes

* make cleared dialog behave the same as it did before the history update ([d0ce1fc](https://github.com/liana-p/narrat-engine/commit/d0ce1fc0e40ad26b8df2ba974fcf96b978eff1f1))



## [3.15.2](https://github.com/liana-p/narrat-engine/compare/v3.15.1...v3.15.2) (2024-08-31)


### Bug Fixes

* debug jump now working again ([060e10b](https://github.com/liana-p/narrat-engine/commit/060e10b24a20acd2ba4157d3a49e570d2e38a00d))



## [3.15.1](https://github.com/liana-p/narrat-engine/compare/v3.15.0...v3.15.1) (2024-08-31)


### Bug Fixes

* input legend now won't show inputs that aren't being used yet ([1354bf2](https://github.com/liana-p/narrat-engine/commit/1354bf276c8950a9c25eced4c767562d96a5bd63))
* properly save cleared dialog to avoid a save bug ([a5b1dda](https://github.com/liana-p/narrat-engine/commit/a5b1ddac980fb6d31995ccdcb069ba3a9c2eae4b))



# [3.15.0](https://github.com/liana-p/narrat-engine/compare/v3.14.2...v3.15.0) (2024-08-30)


### Features

* new button prompts system ([46b0717](https://github.com/liana-p/narrat-engine/commit/46b0717d137da61ef6108c30b3c623b8ff3bb86c))



## [3.14.2](https://github.com/liana-p/narrat-engine/compare/v3.14.1...v3.14.2) (2024-08-30)



## [3.14.1](https://github.com/liana-p/narrat-engine/compare/v3.14.0...v3.14.1) (2024-08-30)


### Features

* new buttons for manual save and fullscreen ([c1f5bdd](https://github.com/liana-p/narrat-engine/commit/c1f5bdd4a10f9b0975448a8461ab61eb3b125f16))



# [3.14.0](https://github.com/liana-p/narrat-engine/compare/v3.13.1...v3.14.0) (2024-08-30)


### Features

* autosave spinner ([78fa7e5](https://github.com/liana-p/narrat-engine/commit/78fa7e5878b5ac885e65a8b65e9e2774bdbe07cc))



## [3.13.1](https://github.com/liana-p/narrat-engine/compare/v3.13.0...v3.13.1) (2024-08-30)


### Features

* new option to not autosave on specific labels ([8dea6b1](https://github.com/liana-p/narrat-engine/commit/8dea6b116909dd2e6fa78baa928ce45b877bfc6a))
* only show achievement unlock notification if not already unlocked ([bdb9f5b](https://github.com/liana-p/narrat-engine/commit/bdb9f5b31626a6c57095c8ed8a8b02494f3a939d))



# [3.13.0](https://github.com/liana-p/narrat-engine/compare/v3.12.4...v3.13.0) (2024-08-30)


### Features

* new button to show history of dialogue ([a8d5052](https://github.com/liana-p/narrat-engine/commit/a8d505292dbe783ef55ff887aa645b2e25137176))



## [3.12.4](https://github.com/liana-p/narrat-engine/compare/v3.12.3...v3.12.4) (2024-08-18)


### Bug Fixes

* accidental change to modals css ([b12f654](https://github.com/liana-p/narrat-engine/commit/b12f65468b18cded93bb0232b057297847b02c01))



## [3.12.3](https://github.com/liana-p/narrat-engine/compare/v3.12.2...v3.12.3) (2024-08-18)


### Bug Fixes

* make sure save/load fix is applied to all features ([4f1da78](https://github.com/liana-p/narrat-engine/commit/4f1da78d1be17d5107252ed002c2f683ba62daf4))



## [3.12.2](https://github.com/liana-p/narrat-engine/compare/v3.12.1...v3.12.2) (2024-08-18)


### Bug Fixes

* quests save bug ([d4009d2](https://github.com/liana-p/narrat-engine/commit/d4009d2db3577847bea3c2f55b0b05cb5fd0f7c0))



## [3.12.1](https://github.com/liana-p/narrat-engine/compare/v3.12.0...v3.12.1) (2024-08-18)


### Bug Fixes

* json editor mistake ([87c0d02](https://github.com/liana-p/narrat-engine/commit/87c0d02937dacf0c8793c9ae24da1db269e98e81))



# [3.12.0](https://github.com/liana-p/narrat-engine/compare/v3.11.2...v3.12.0) (2024-08-18)


### Bug Fixes

* mysterious narrat save bug ([6e06481](https://github.com/liana-p/narrat-engine/commit/6e064813b858d6037710366c393bb8c6e86dd87f))


### Features

* Improve debug menu ([2dc6727](https://github.com/liana-p/narrat-engine/commit/2dc6727f7e342b6378d55c70e425d3e962eb8436))



## [3.11.2](https://github.com/liana-p/narrat-engine/compare/v3.11.1...v3.11.2) (2024-08-04)


### Bug Fixes

* stop replaying save prompts when reloading ([a7ba385](https://github.com/liana-p/narrat-engine/commit/a7ba385872b805cd309f53b457611026c1c27828))



## [3.11.1](https://github.com/liana-p/narrat-engine/compare/v3.11.0...v3.11.1) (2024-07-28)


### Features

* handle gamepad switch on map button + add configurable custom game splash screen ([80d1d90](https://github.com/liana-p/narrat-engine/commit/80d1d901533bea0114eb9810f95b9615ec764b43))
* scenes docs ([ae99f8e](https://github.com/liana-p/narrat-engine/commit/ae99f8e54e434179afc4149f5ca4beff9c18cd51))



# [3.11.0](https://github.com/liana-p/narrat-engine/compare/v3.10.4...v3.11.0) (2024-07-13)


### Bug Fixes

* custom stores saving issue [#274](https://github.com/liana-p/narrat-engine/issues/274) ([#275](https://github.com/liana-p/narrat-engine/issues/275)) ([dcb1924](https://github.com/liana-p/narrat-engine/commit/dcb1924789ffd2a8dad9564ca394ec91177347ce)), closes [#235](https://github.com/liana-p/narrat-engine/issues/235) [#255](https://github.com/liana-p/narrat-engine/issues/255)
* loading save data reference fix [#255](https://github.com/liana-p/narrat-engine/issues/255) ([#272](https://github.com/liana-p/narrat-engine/issues/272)) ([d2cf05f](https://github.com/liana-p/narrat-engine/commit/d2cf05fd775705742021138b10b2306e3ee4ce52)), closes [#235](https://github.com/liana-p/narrat-engine/issues/235)


### Features

* custom scenes working + new plugin hook ([#290](https://github.com/liana-p/narrat-engine/issues/290)) ([75a0905](https://github.com/liana-p/narrat-engine/commit/75a0905b30b498fb9d54546bd666ba7d8242920f))



## [3.10.4](https://github.com/liana-p/narrat-engine/compare/v3.10.3...v3.10.4) (2024-04-29)


### Features

* **input:** Added configurable hotkeys ([#271](https://github.com/liana-p/narrat-engine/issues/271)) ([41ab5eb](https://github.com/liana-p/narrat-engine/commit/41ab5eb4a692da0d6313f2adeff5456080144773))



## [3.10.3](https://github.com/liana-p/narrat-engine/compare/v3.10.2...v3.10.3) (2024-04-13)


### Bug Fixes

* elseifs now work with single variables in conditions ([#265](https://github.com/liana-p/narrat-engine/issues/265)) ([2bd479c](https://github.com/liana-p/narrat-engine/commit/2bd479c6fa6db7285007a6b6b163907862383e7b))
* Pressing "J" in a text field won't bring up the jump menu anymore while in dev mode


## [3.10.2](https://github.com/liana-p/narrat-engine/compare/v3.10.1...v3.10.2) (2024-04-13)


### Bug Fixes

* **arrays:** array_join command now returns the right value ([#262](https://github.com/liana-p/narrat-engine/issues/262)) ([47ad700](https://github.com/liana-p/narrat-engine/commit/47ad7000608ea55c90bf8dcb50d1674744d98e5e))


### Features

* functions to call javascript from narrat, better logging ([#263](https://github.com/liana-p/narrat-engine/issues/263)) ([a6ff74c](https://github.com/liana-p/narrat-engine/commit/a6ff74c450f1e6c7399a15311e4a508329e4f0d8))



## [3.10.1](https://github.com/liana-p/narrat-engine/compare/v3.10.0...v3.10.1) (2024-04-10)


### Features

* **command:** Add new split command for strings ([#258](https://github.com/liana-p/narrat-engine/issues/258)) ([fa1a823](https://github.com/liana-p/narrat-engine/commit/fa1a8238c0af3bff17a213d89a04d4d07ec55696))
* **command:** string/regex search commands ([#260](https://github.com/liana-p/narrat-engine/issues/260)) ([511eae3](https://github.com/liana-p/narrat-engine/commit/511eae3a15fb9561787abc161e242c7b25046261))



# [3.10.0](https://github.com/liana-p/narrat-engine/compare/v3.9.8...v3.10.0) (2024-04-10)


### Features

* **scripting:** multiline scripting feature ([#259](https://github.com/liana-p/narrat-engine/issues/259)) ([5da65fd](https://github.com/liana-p/narrat-engine/commit/5da65fd7b5cbdc39c78cef830bfe7d4cf6a457a6)) [See multiline code docs](https://docs.narrat.dev/scripting/language-syntax.html#multiline-code)
* **text:** New features for text auto advance and delays before continue ([5445799](https://github.com/liana-p/narrat-engine/commit/5445799ece5e55d67febe4747885484da320c43a)) See [new narrate command](https://docs.narrat.dev/commands/text-commands/narrate-command.html), [updated talk command docs](https://docs.narrat.dev/commands/text-commands/talk-function.html)



## [3.9.8](https://github.com/liana-p/narrat-engine/compare/v3.9.7...v3.9.8) (2024-02-19)


### Bug Fixes

* error when doing manual saves [#235](https://github.com/liana-p/narrat-engine/issues/235) ([#236](https://github.com/liana-p/narrat-engine/issues/236)) ([7208dc0](https://github.com/liana-p/narrat-engine/commit/7208dc0c3e22fba7148d8090e77173c851c50007))



## [3.9.8](https://github.com/liana-p/narrat-engine/compare/v3.9.7...v3.9.8) (2024-02-19)


### Bug Fixes

* error when doing manual saves [#235](https://github.com/liana-p/narrat-engine/issues/235) ([#236](https://github.com/liana-p/narrat-engine/issues/236)) ([7208dc0](https://github.com/liana-p/narrat-engine/commit/7208dc0c3e22fba7148d8090e77173c851c50007))



## [3.9.7](https://github.com/liana-p/narrat-engine/compare/v3.9.6...v3.9.7) (2024-02-03)


### Bug Fixes

* bug in avoid store reset ([aaa7cd1](https://github.com/liana-p/narrat-engine/commit/aaa7cd1f8a6104c19be3be0a9430ce62c180a043))



## [3.9.6](https://github.com/liana-p/narrat-engine/compare/v3.9.5...v3.9.6) (2024-02-03)


### Breaking Changes

* **CSS**: A few basic CSS classes have been renamed to have a narrat prefix to avoid name clashes with pages narrat is integrated in. For example `.button` is now `.nrt-button`. If your game was overriding [these CSS classes](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/css/elements.css), update their name.
* **CSS**: All Narrat CSS variables have been moved to the `#narrat` CSS selector instead of `:root` to avoid overriding variables on host pages. If your CSS variables were in `:root`, update to use `#narrat`. For example see how the [default CSS file](https://github.com/liana-p/narrat-engine/blob/main/packages/create-narrat/template/src/css/main.css) now looks like in the game template
* **CSS**: The main narrat container has been renamed from `#narrat-app-container` to just `#narrat` for clarity on this being the main root element of narrat
* **Note:** Narrat requires node.js version 20+ in recent versions, install the latest [node.js](https://nodejs.org/en) LTS version if needed

### Bug Fixes

* menu_return command crashed the game ([#226](https://github.com/liana-p/narrat-engine/issues/226)) ([71c9d97](https://github.com/liana-p/narrat-engine/commit/71c9d97f809e594903e9a6e09c6af02b5e5b9823))



## [3.9.5](https://github.com/liana-p/narrat-engine/compare/v3.9.4...v3.9.5) (2024-01-29)


### Bug Fixes

* **items:** fixed a bug where items would crash the tab ([49a3089](https://github.com/liana-p/narrat-engine/commit/49a3089b6795131920c7ce682d910cdf34a010e2))



## [3.9.4](https://github.com/liana-p/narrat-engine/compare/v3.9.3...v3.9.4) (2024-01-27)


### Features

* desktop editor prototype ([#210](https://github.com/liana-p/narrat-engine/issues/210)) ([0389bb8](https://github.com/liana-p/narrat-engine/commit/0389bb84869fa321a50b3c01e315d462809e03f0))
* IDE icon and build working ([c49fc6d](https://github.com/liana-p/narrat-engine/commit/c49fc6de66409b0b216d48beab28aad36655829f))
* **IDE:** Ide v0.0.1 release, upgrade to node.js 20 ([#214](https://github.com/liana-p/narrat-engine/issues/214)) ([09841f3](https://github.com/liana-p/narrat-engine/commit/09841f3fb74ea6ed2e32c8af7ecac38e2a111915)), closes [#213](https://github.com/liana-p/narrat-engine/issues/213)
* **videos:** preload videos + more docs ([#215](https://github.com/liana-p/narrat-engine/issues/215)) ([469b9aa](https://github.com/liana-p/narrat-engine/commit/469b9aa5f608da09788275102c77920773cd7340))
* windows compatibility, more IDE features, user preferences working ([#212](https://github.com/liana-p/narrat-engine/issues/212)) ([243dd63](https://github.com/liana-p/narrat-engine/commit/243dd6368f86710f1aa906a7d5269646bb0c99c6))



## [3.9.3](https://github.com/liana-p/narrat-engine/compare/v3.9.2...v3.9.3) (2024-01-22)

Placeholder release to let the narrate template app use the latest changes by default

## [3.9.2](https://github.com/liana-p/narrat-engine/compare/v3.9.1...v3.9.2) (2024-01-22)

### Bug Fixes

- dependency version issue with vue/pinia caused type errors ([#207](https://github.com/liana-p/narrat-engine/issues/207)) ([a524b6f](https://github.com/liana-p/narrat-engine/commit/a524b6f6bb288a19f21498f3d39b956f654851bc))

If you have an issue after updating to this version, try changing the version of vue and pinia in your package.json to be the latest (vue 3.4.15 and pinia 2.1.7 as of right now), deleting the node_modules folder and re-running `npm install`

## [3.9.1](https://github.com/liana-p/narrat-engine/compare/v3.9.0...v3.9.1) (2023-12-28)

### Features

- config options for changing hotkeys ([17718f8](https://github.com/liana-p/narrat-engine/commit/17718f830c571cd4aacc0c719a5469d149efc014))

# [3.9.0](https://github.com/liana-p/narrat-engine/compare/v3.8.3...v3.9.0) (2023-12-27)

### Features

- scenes feature ([#201](https://github.com/liana-p/narrat-engine/issues/201)) ([62ba5a6](https://github.com/liana-p/narrat-engine/commit/62ba5a68b5e569a3f14f8e30da6f9a0570dfb874))

## [3.8.3](https://github.com/liana-p/narrat-engine/compare/v3.8.2...v3.8.3) (2023-12-23)

### Features

- feature to disable saves ([#199](https://github.com/liana-p/narrat-engine/issues/199)) ([12ce422](https://github.com/liana-p/narrat-engine/commit/12ce4223bbf600d9feb2a3eafedcf48a269d2f12))

## [3.8.2](https://github.com/liana-p/narrat-engine/compare/v3.8.1...v3.8.2) (2023-12-23)

### Features

- macros ([#198](https://github.com/liana-p/narrat-engine/issues/198)) ([8f026ae](https://github.com/liana-p/narrat-engine/commit/8f026aec87edebf166ce48ea5277f73e803ee0bb)) (See [docs](https://docs.narrat.dev/scripting/macros.html))

## [3.8.1](https://github.com/liana-p/narrat-engine/compare/v3.8.0...v3.8.1) (2023-12-23)

- Small tweak to be able to control the volume of letter sounds in one place

# [3.8.0](https://github.com/liana-p/narrat-engine/compare/v3.7.1...v3.8.0) (2023-12-23)

### Features

- character dialogue audio ([#197](https://github.com/liana-p/narrat-engine/issues/197)) ([d755e4b](https://github.com/liana-p/narrat-engine/commit/d755e4be0f5e767b7d9ad4332e71ca48a64c1611)). See [docs](https://docs.narrat.dev/features/audio.html#characters-speak-audio)
- [show/hide hud](https://docs.narrat.dev/commands/all-commands.html#stats)

## [3.7.1](https://github.com/liana-p/narrat-engine/compare/v3.7.0...v3.7.1) (2023-12-01)

### Bug Fixes

- issue in one of the narrat template games ([843d98d](https://github.com/liana-p/narrat-engine/commit/843d98d519ce53c7483fddbbd55f21994265062e))

# [3.7.0](https://github.com/liana-p/narrat-engine/compare/v3.6.1...v3.7.0) (2023-11-07)

### Features

- HUD stats improvements with new formatting options, see [docs](https://docs.narrat.dev/features/hud-stats.html)
- Lots of internal improvements and changes to config files to make config hot reloading work better with various config options

## [3.6.1](https://github.com/liana-p/narrat-engine/compare/v3.6.0...v3.6.1) (2023-11-07)

### Bug Fixes

- The narrat template was missing info on yaml files for the IDE, this is now fixed

### Docs

- The migration process for using the new hot reloading config files in 3.6.x has been improved with some missing steps

# [3.6.0](https://github.com/liana-p/narrat-engine/compare/v3.5.1...v3.6.0) (2023-10-28)

## Config files hot reloading

New [config files hot reloading](https://docs.narrat.dev/features/config-hot-reloading.html) feature, allowing to edit config files live during development.

This feature requires moving config files to a different folder, so to use it read the [config files hot reloading guide](https://docs.narrat.dev/features/config-hot-reloading.html) for instructions.

All the template games and example games in the repo have been modified to use the new system, so they can also be used as an example.

New games created after 3.6.0 will have the new system by default.

Documentation hasn't been updated everywhere, as there is a lot of docs relating to configs, so a warning has been added at the start of the main config files documentation file.

## [3.5.1](https://github.com/liana-p/narrat-engine/compare/v3.5.0...v3.5.1) (2023-10-28)

### Bug Fixes

- tooltips fixed ([#178](https://github.com/liana-p/narrat-engine/issues/178)) ([e39d2c7](https://github.com/liana-p/narrat-engine/commit/e39d2c7d49609e0fa06d789e3ac46aacbd47301f))

### Features

- narrat editor updated to have a demo of themes ([#172](https://github.com/liana-p/narrat-engine/issues/172)) ([6b2968b](https://github.com/liana-p/narrat-engine/commit/6b2968bb4b503e4c0adcb5475517c46f457e09d2))
- YAML files imported as code with hot reload ([#175](https://github.com/liana-p/narrat-engine/issues/175)) ([ac0ba9a](https://github.com/liana-p/narrat-engine/commit/ac0ba9a42e452457237eac5eba02ec0e4075a42a))

# [3.5.0](https://github.com/liana-p/narrat-engine/compare/v3.4.0...v3.5.0) (2023-10-19)

### Features

- first party themes feature working ([#171](https://github.com/liana-p/narrat-engine/issues/171)) ([4e6767b](https://github.com/liana-p/narrat-engine/commit/4e6767bc9006a248baf0a1a3aa3b77bb2807efd9))

# [3.4.0](https://github.com/liana-p/narrat-engine/compare/v3.3.8...v3.4.0) (2023-10-17)

### Animations

New [animations](https://docs.narrat.dev/features/animations.html) feature added

### Breaking Changes

Not a breaking change, but as part of working on the narrat editor, narrat now can be inside custom containers in the page and doesn't necessarily listen to inputs on the `window` object.

This doesn't seem to break anything in my testing so far

### Features

- New options to [style portraits of individual characters](https://docs.narrat.dev/features/characters-and-portraits.html#character-portrait-styling)
- New options to [control when the dialog panel appears](https://docs.narrat.dev/features/dialog-panel.html#controlling-when-the-dialog-panel-appears)

### Documentation

- New [Dialog Panel](https://docs.narrat.dev/features/dialog-panel.html) page
- New [Animations](https://docs.narrat.dev/features/animations.html) page
- Improved [Inventory](https://docs.narrat.dev/features/inventory.html) docs
- Added [Narrat Overview](https://docs.narrat.dev/guides/narrat-overview.html) page with explanations of elements in a narrat game

### Merged PRs

- added monarch syntax for demo editor ([327f938](https://github.com/liana-p/narrat-engine/commit/327f938549af4e1aad20074cb2d340cb120d8f4f))
- animations, better docs, new dialog panel options ([#170](https://github.com/liana-p/narrat-engine/issues/170)) ([ac9e567](https://github.com/liana-p/narrat-engine/commit/ac9e567c22e2311c64897a91106ba94587c85354))
- interactive demo updated to be in the narrat editor ([1344b9a](https://github.com/liana-p/narrat-engine/commit/1344b9a2e522a5c2801b9bb2a2bc29bbddffe662))
- optional achievement locked icon ([#166](https://github.com/liana-p/narrat-engine/issues/166)) ([a02aa54](https://github.com/liana-p/narrat-engine/commit/a02aa548d3d3169ae1a3e0166aa08a402a3a54a4))
- WIP narrat editor ([#167](https://github.com/liana-p/narrat-engine/issues/167)) ([aa6b164](https://github.com/liana-p/narrat-engine/commit/aa6b1648baebf10e61f8537cb2efd2f1fd0d2c92))

## [3.3.8](https://github.com/liana-p/narrat-engine/compare/v3.3.7...v3.3.8) (2023-10-08)

### Features

- Quests [can now fail/succeed](https://docs.narrat.dev/features/quests.html#quest-success-or-failure-and-dynamic-quest-text)
- Quests can [have multiple endings](https://docs.narrat.dev/features/quests.html#quests-with-multiple-endings) with different final texts
- Choices [are tracked](https://docs.narrat.dev/features/branching-dialogue.html#choice-tracking) so the game can display already visited choices as greyed
- [Choice flags](https://docs.narrat.dev/features/branching-dialogue.html#choice-flags-and-choices-config-file) to allow customising different types of choice prompts
- Games can now customise the template text used for displaying choices

### Fixes

- The game now removes the `selected` css class from elements when keyboard or mouse is being used instead of gamepad to avoid confusion.
- [Tooltips](https://docs.narrat.dev/features/tooltips.html) have been fixed and documented

### Docs

- Documented the [Godot plugin](https://docs.narrat.dev/plugins/godot/godot-plugin.html)
- Added an [FAQ](https://docs.narrat.dev/plugins/godot/godot-plugin.html)
- Documented [tooltips](https://docs.narrat.dev/plugins/godot/godot-plugin.html)

## [3.3.7](https://github.com/liana-p/narrat-engine/compare/v3.3.6...v3.3.7) (2023-10-08)

### Bug Fixes

- empty_layer bug, and transitioning for games not using overlayMode ([#158](https://github.com/liana-p/narrat-engine/issues/158)) ([8b829bc](https://github.com/liana-p/narrat-engine/commit/8b829bc864b8b699f4414f43c3d2d888c81c47bb))

## [3.3.6](https://github.com/liana-p/narrat-engine/compare/v3.3.5...v3.3.6) (2023-10-08)

### Features

- improve item received notification to not say the amount if onl… ([#157](https://github.com/liana-p/narrat-engine/issues/157)) ([f8e840a](https://github.com/liana-p/narrat-engine/commit/f8e840a4b57545bd45c27ad5dbae8da9a41faed8))

## [3.3.5](https://github.com/liana-p/narrat-engine/compare/v3.3.4...v3.3.5) (2023-09-25)

### Features

- narrat godot plugin now lets users override the config ([714b9cf](https://github.com/liana-p/narrat-engine/commit/714b9cf0cedc1b8aa77ba549936acf6b31a3f0dc))

## [3.3.4](https://github.com/liana-p/narrat-engine/compare/v3.3.3...v3.3.4) (2023-09-24)

### Features

- export godot plugin for use in projects ([a91bf28](https://github.com/liana-p/narrat-engine/commit/a91bf281b634483db035bba59df2c3f0d63beb38))

## [3.3.3](https://github.com/liana-p/narrat-engine/compare/v3.3.2...v3.3.3) (2023-07-25)

### Bug Fixes

- start menu audio wouldn't actually stop ([fe2be9f](https://github.com/liana-p/narrat-engine/commit/fe2be9f7a7b06238e2dc69edb34faa19f2498324))

### Features

- new audio-specific fade timings ([e43f1f4](https://github.com/liana-p/narrat-engine/commit/e43f1f43c1d71378c07e1487864001b12cd6352c))

## [3.3.2](https://github.com/liana-p/narrat-engine/compare/v3.3.1...v3.3.2) (2023-07-24)

### Bug Fixes

- dialog box text field now captures inputs properly and autofocuses ([#135](https://github.com/liana-p/narrat-engine/issues/135)) ([697cc8d](https://github.com/liana-p/narrat-engine/commit/697cc8d333d7616aa2a6da96c5ae43f588829787))

## [3.3.1](https://github.com/liana-p/narrat-engine/compare/v3.3.0...v3.3.1) (2023-07-21)

### Features

- video portraits, hidden portraits, custom size portraits ([#133](https://github.com/liana-p/narrat-engine/issues/133)) ([7e62501](https://github.com/liana-p/narrat-engine/commit/7e6250177772b276c85d5457ed263421a130613d))

# [3.3.0](https://github.com/liana-p/narrat-engine/compare/v3.2.15...v3.3.0) (2023-07-20)

### Features

- new feature for video backgrounds in screens ([#132](https://github.com/liana-p/narrat-engine/issues/132)) ([fa646e4](https://github.com/liana-p/narrat-engine/commit/fa646e4767da4ba600638031c2f21ef636a0bcbe))

## [3.2.15](https://github.com/liana-p/narrat-engine/compare/v3.2.14...v3.2.15) (2023-07-15)

### Bug Fixes

- bug where dialog panel would appear during screen transitions ([8edbd20](https://github.com/liana-p/narrat-engine/commit/8edbd201a8e0da02edd1e5e483de6db6e6ef93ee))

## [3.2.14](https://github.com/liana-p/narrat-engine/compare/v3.2.13...v3.2.14) (2023-07-15)

### Bug Fixes

- default font size fix + reenabled debug on game splash screen ([#129](https://github.com/liana-p/narrat-engine/issues/129)) ([3b945a3](https://github.com/liana-p/narrat-engine/commit/3b945a381dd7bcfa5aef7b32af71c4be21bb53b5))

## [3.2.13](https://github.com/liana-p/narrat-engine/compare/v3.2.12...v3.2.13) (2023-07-14)

### Features

- more gamepad menus (inventory and skills) ([#128](https://github.com/liana-p/narrat-engine/issues/128)) ([6c767de](https://github.com/liana-p/narrat-engine/commit/6c767de8cdda9d4cb1082289be1cc1fca10bd74a))

## [3.2.12](https://github.com/liana-p/narrat-engine/compare/v3.2.10...v3.2.12) (2023-07-13)

### Bug Fixes

- **buttons:** issue with changing button state after changing screens… ([#127](https://github.com/liana-p/narrat-engine/issues/127)) ([3de80f7](https://github.com/liana-p/narrat-engine/commit/3de80f78584ce4cd6a9d4e632e888ab2133a299f))

### Features

- new array functions ([#125](https://github.com/liana-p/narrat-engine/issues/125)) ([b03afab](https://github.com/liana-p/narrat-engine/commit/b03afab881467d1090eb49a1cb2a9c0681324ddb))

## [3.2.11](https://github.com/liana-p/narrat-engine/compare/v3.2.10...v3.2.11) (2023-07-11)

### Features

- new array functions ([#125](https://github.com/liana-p/narrat-engine/issues/125)) ([b03afab](https://github.com/liana-p/narrat-engine/commit/b03afab881467d1090eb49a1cb2a9c0681324ddb)) See [docs](https://docs.narrat.dev/commands/all-commands.html#array-transformation-functions)

## [3.2.10](https://github.com/liana-p/narrat-engine/compare/v3.2.9...v3.2.10) (2023-07-09)

## [3.2.9](https://github.com/liana-p/narrat-engine/compare/v3.2.8...v3.2.9) (2023-07-09)

### Bug Fixes

- gamepads now working in chrome ([5cd6549](https://github.com/liana-p/narrat-engine/commit/5cd65495a2d0b5c1c10179cb0b0bff7dec36ea67))

## [3.2.8](https://github.com/liana-p/narrat-engine/compare/v3.2.7...v3.2.8) (2023-07-09)

### Features

- gamepad UI improved to handle the saves picking menu ([#122](https://github.com/liana-p/narrat-engine/issues/122)) ([e1e62e8](https://github.com/liana-p/narrat-engine/commit/e1e62e868b6f65ee88860bf7ffaa31ff8075512e))
- New gamepad/keyboard input system working in more places and full viewport support ([#120](https://github.com/liana-p/narrat-engine/issues/120)) ([dacd1da](https://github.com/liana-p/narrat-engine/commit/dacd1da7bf4f8c884202cbfb738466cf0b2f8c01))

## [3.2.7](https://github.com/liana-p/narrat-engine/compare/v3.2.6...v3.2.7) (2023-07-06)

### Bug Fixes

- **sprites:** fix empty_sprite command not deleting all sprites ([#118](https://github.com/liana-p/narrat-engine/issues/118)) ([99bae2d](https://github.com/liana-p/narrat-engine/commit/99bae2dca2a9498bff83cbc39f17272915ff4a6a))

## [3.2.6](https://github.com/liana-p/narrat-engine/compare/v3.2.3...v3.2.6) (2023-07-05)

### Bug Fixes

- Issues with broken build, trying to fix by fixing dependencies and mistakes in new config code ([#116](https://github.com/liana-p/narrat-engine/issues/116)) ([f90bd3f](https://github.com/liana-p/narrat-engine/commit/f90bd3f9e5d63ca20a235e409d8c5b2f7c271c68))

## [3.2.6-alpha.2](https://github.com/liana-p/narrat-engine/compare/v3.2.6-alpha.1...v3.2.6-alpha.2) (2023-07-05)

### Bug Fixes

- mistake in save migration code ([6de08af](https://github.com/liana-p/narrat-engine/commit/6de08af8cf83178bbc2447435a11f9daba54b9c2))

## [3.2.6-alpha.1](https://github.com/liana-p/narrat-engine/compare/v3.2.3...v3.2.6-alpha.1) (2023-07-05)

### Bug Fixes

- save conversion ([7abe832](https://github.com/liana-p/narrat-engine/commit/7abe832c2e0680f67d9b70c4789fd4f742d2b852))

## [3.2.3](https://github.com/liana-p/narrat-engine/compare/v3.2.2...v3.2.3) (2023-07-05)

## [3.2.2](https://github.com/liana-p/narrat-engine/compare/v3.2.0...v3.2.2) (2023-07-05)

### Features

- **characters:** Ability to change the player character during the game ([#115](https://github.com/liana-p/narrat-engine/issues/115)) ([91205ce](https://github.com/liana-p/narrat-engine/commit/91205ce4a501a1108544b8936486802173594fa9)). See [documentation](https://docs.narrat.dev/features/changing-player-character.html#changing-the-player-and-game-characters-during-gameplay).

## [3.2.1](https://github.com/liana-p/narrat-engine/compare/v3.2.0...v3.2.1) (2023-07-04)

### Features

- **Screens:** Add a way to easily create empty screens ([#114](https://github.com/liana-p/narrat-engine/issues/114)) ([3f5488d](https://github.com/liana-p/narrat-engine/commit/3f5488d07cf3033248ba60d36828bf9c8d6deaa3)). See [documentation](https://docs.narrat.dev/features/viewport.html#empty-screens)

# [3.2.0](https://github.com/liana-p/narrat-engine/compare/v2.17.0...v3.2.0) (2023-07-02)

### Gamepad Support

There is now a first version of gamepad support. It can't interact with everything yet but it's possible to interact with the dialog panel, as well as open and close menus. More complete gamepad integration will come soon. see [PR](https://github.com/liana-p/narrat-engine/pull/89) for details.

### Bug Fixes

- issue with typescript compilation of vue files probably caused by a dep update ([90f9cf1](https://github.com/liana-p/narrat-engine/commit/90f9cf1b9b38d66a65823acc7c2bc981167a3a60))
- typo in template ([d772f54](https://github.com/liana-p/narrat-engine/commit/d772f544d5fad2044ceeb079030bd75eaedf52af))

### Features

- export more config types in the narrat lib for plugins use ([d80aca2](https://github.com/liana-p/narrat-engine/commit/d80aca2c48aa8d1262c82357f6b6eb5589c9f073))
- gamepad support first version ([#89](https://github.com/liana-p/narrat-engine/issues/89)) ([510c560](https://github.com/liana-p/narrat-engine/commit/510c560f1a1c06bfd7e2ae8d6a435813c6affc8e))
- Hot module reloading via vite plugin ([#86](https://github.com/liana-p/narrat-engine/issues/86)) ([c700d67](https://github.com/liana-p/narrat-engine/commit/c700d67e7ba520a46923e77187a80ea42f15be72))
- **WIP:** improve RPG demo to modernise scripting syntax ([2faaad6](https://github.com/liana-p/narrat-engine/commit/2faaad6a1ec3cca0bfdd0d475f61327119124d61))

## [3.1.2](https://github.com/liana-p/narrat-engine/compare/v3.1.1...v3.1.2) (2023-07-01)

## [3.1.1](https://github.com/liana-p/narrat-engine/compare/v3.1.0...v3.1.1) (2023-07-01)

### Features

- export more config types in the narrat lib for plugins use ([d80aca2](https://github.com/liana-p/narrat-engine/commit/d80aca2c48aa8d1262c82357f6b6eb5589c9f073))

# [3.1.0](https://github.com/liana-p/narrat-engine/compare/v3.0.2...v3.1.0) (2023-06-28)

### Bug Fixes

- issue with typescript compilation of vue files probably caused by a dep update ([90f9cf1](https://github.com/liana-p/narrat-engine/commit/90f9cf1b9b38d66a65823acc7c2bc981167a3a60))
- issue with sprites rendering duplicated on every layer instead of only the layer they should be on.

### Features

- `empty_sprites`: New [`empty_sprites`](https://docs.narrat.dev/commands/all-commands.html#screen-objects) command
- **Demo:** improved RPG demo to modernise scripting syntax ([2faaad6](https://github.com/liana-p/narrat-engine/commit/2faaad6a1ec3cca0bfdd0d475f61327119124d61)). See [PR](https://narrat.discourse.group/t/narrat-rpg-demo-updated-to-use-more-modern-syntax/38)

## [3.0.2](https://github.com/liana-p/narrat-engine/compare/v3.0.1...v3.0.2) (2023-06-24)

Release to make sure the create-narrat template uses at least narrat 3.0.1.

## [3.0.1](https://github.com/liana-p/narrat-engine/compare/v3.0.0...v3.0.1) (2023-06-24)

### Bug Fixes

- typo in template ([d772f54](https://github.com/liana-p/narrat-engine/commit/d772f544d5fad2044ceeb079030bd75eaedf52af))

# [3.0.0](https://github.com/liana-p/narrat-engine/compare/v2.17.0...v3.0.0) (2023-06-24)

### Features

#### Hot Module Reloading

- Hot module reloading via vite plugin ([#86](https://github.com/liana-p/narrat-engine/issues/86)) ([c700d67](https://github.com/liana-p/narrat-engine/commit/c700d67e7ba520a46923e77187a80ea42f15be72)).

This new feature treats `.narrat` as script files, which allows the development server to [hot reload](https://vitejs.dev/guide/features.html#hot-module-replacement) them.

This means that narrat scripts can be edited while playing a game, and when a file is saved the changes will be picked up live, without having to restart the game.

When a narrat file is hot-reloaded, all the labels in it are updated. The next time the game jumps to any of those labels, they will have the new version.

This should increase productivity by allowing people to make changes in the middle of a playthrough without needing to restart.

To make this change happen, the default structure of projects has changed. Narrat files are instead imported and listed in `src/scripts.ts`. The game template has been updated to default to this method, but existing games will need to make manual changes to implement this change.

# [2.18.0-alpha.3](https://github.com/liana-p/narrat-engine/compare/v2.18.0-alpha.2...v2.18.0-alpha.3) (2023-06-24)

# [2.18.0-alpha.2](https://github.com/liana-p/narrat-engine/compare/v2.18.0-alpha.1...v2.18.0-alpha.2) (2023-06-24)

# [2.18.0-alpha.1](https://github.com/liana-p/narrat-engine/compare/v2.17.0...v2.18.0-alpha.1) (2023-06-24)

- WIP: New module-based import of narrat scripts to enable usage of [HMR](https://vitejs.dev/guide/api-hmr.html) with the new vite-plugin-narrat

# [2.17.0](https://github.com/liana-p/narrat-engine/compare/v2.17.0-alpha.1...v2.17.0) (2023-06-21)

### Features

- **settings:** new game settings feature ([8864665](https://github.com/liana-p/narrat-engine/commit/8864665f94f97af4a187970cfe85649f371d2338)) See new [game settings docs](https://docs.narrat.dev/features/game-settings.html)
- **skillChecks:** new option to control whether rolls fail on equality or not ([9835cc3](https://github.com/liana-p/narrat-engine/commit/9835cc3a4104e9ee21b01bfb88100c408f1e76ec)). See [options docs](https://docs.narrat.dev/features/skills.html#skill-checks)
- **text:** autoplay now works on games without animate text ([af8e215](https://github.com/liana-p/narrat-engine/commit/af8e215f905827a2cb1efb77f3b98bf20578f560))

# [2.16.0](https://github.com/liana-p/narrat-engine/compare/v2.15.0...v2.16.0) (2023-06-17)

### Features

- **saving:** new dynamic label to run on game load ([6c3cb8b](https://github.com/liana-p/narrat-engine/commit/6c3cb8bd2c9a9bc51999fa4caa8eb6652a46e2f1)). See [docs on how to use it](https://docs.narrat.dev/features/save-and-load.html#run-a-function-on-game-load)

# [2.15.0](https://github.com/liana-p/narrat-engine/compare/v2.15.0-alpha.3...v2.15.0) (2023-06-16)

### Features

- **skillChecks:** new skill check config file with dice-based options ([c8389a0](https://github.com/liana-p/narrat-engine/commit/c8389a060a32d57b98c2219f46a5d4a6b1b4f091))

### BREAKING CHANGES

- The new skill check format requires creating a new skillChecks.yaml file, see https://docs.narrat.dev/features/skills.html#skill-checks and https://narrat.discourse.group/t/proposal-for-dice-based-skill-checks/24/8?u=liana for background info.

The new needed file should be listed in `config.yaml` as such:

```yaml
skillChecks: data/skillchecks.yaml
```

Then `skillChecks.yaml` should contain [valid config](https://docs.narrat.dev/features/skills.html#skill-checks).

# [2.15.0-alpha.3](https://github.com/liana-p/narrat-engine/compare/v2.15.0-alpha.2...v2.15.0-alpha.3) (2023-06-15)

### Bug Fixes

- **audio:** howler suspended context ([8411931](https://github.com/liana-p/narrat-engine/commit/8411931361b9d443b13053541dabdc552b6caf48))
- **audio:** trying to remove suspended audio context issue ([525374c](https://github.com/liana-p/narrat-engine/commit/525374cbba717f5b3479ce35143f5a72d6608173))
- **docs:** restore missing bit of readme for contributors docs ([f58d53b](https://github.com/liana-p/narrat-engine/commit/f58d53ba863e692c0b2e3bd54c9bff08f2857fcf))

# [2.15.0-alpha.2](https://github.com/liana-p/narrat-engine/compare/v2.14.3...v2.15.0-alpha.2) (2023-06-15)

### Features

- **skillChecks:** new skill check config file with dice-based options ([c8389a0](https://github.com/liana-p/narrat-engine/commit/c8389a060a32d57b98c2219f46a5d4a6b1b4f091))

### BREAKING CHANGES

- The new skill check format requires creating a new skillChecks.yaml file, see https://docs.narrat.dev/features/skills.html#skill-checks and https://narrat.discourse.group/t/proposal-for-dice-based-skill-checks/24/8?u=liana for background info.

The new needed file should be listed in `config.yaml` as such:

```yaml
skillChecks: data/skillchecks.yaml
```

Then `skillChecks.yaml` should contain [valid config](https://docs.narrat.dev/features/skills.html#skill-checks).

# [2.15.0-alpha.1](https://github.com/liana-p/narrat-engine/compare/v2.14.3...v2.15.0-alpha.1) (2023-06-14)

### chore

- **break:** breaking change commit ([8a28a4f](https://github.com/liana-p/narrat-engine/commit/8a28a4fb35d780904991906c0b95a4dcb04c952b))

### Features

- **skillChecks:** new skill check config file with dice-based options ([c8389a0](https://github.com/liana-p/narrat-engine/commit/c8389a060a32d57b98c2219f46a5d4a6b1b4f091))

### BREAKING CHANGES

- **break:** a new config file for skill checks is needed, and some config values for them have changed.

## [2.14.3](https://github.com/liana-p/narrat-engine/compare/v2.14.2...v2.14.3) (2023-06-11)

### Bug Fixes

- **docs:** fix dead link to items docs ([0c54914](https://github.com/liana-p/narrat-engine/commit/0c549142f43049b0a1c28addd983c33483eddbac))

### Features

- **choices:** choices with both skill checks and ifs working ([#73](https://github.com/liana-p/narrat-engine/issues/73)) ([227d054](https://github.com/liana-p/narrat-engine/commit/227d054295bf01099fb199b629995a356fe321db))

## [2.14.2](https://github.com/liana-p/narrat-engine/compare/v2.14.1-alpha.1...v2.14.2) (2023-06-11)

### Bug Fixes

- **template:** fix publishing issue with npm publish for create-narrat ([1000336](https://github.com/liana-p/narrat-engine/commit/1000336ba75a052eb0534b34cf6631ab3dff145a))

## [2.14.1-alpha.1](https://github.com/liana-p/narrat-engine/compare/v2.14.0...v2.14.1-alpha.1) (2023-06-11)

### Features

- **template:** narrat template improvements and updates + new doc pages ([#69](https://github.com/liana-p/narrat-engine/issues/69)) ([cd4a7c4](https://github.com/liana-p/narrat-engine/commit/cd4a7c403ca36c9ffc9efc3589d3548bf7c36806))

# [2.14.0](https://github.com/liana-p/narrat-engine/compare/v2.13.1...v2.14.0) (2023-06-11)

### Features

- **conditions:** new elseif conditions feature ([#68](https://github.com/liana-p/narrat-engine/issues/68)) ([1704e14](https://github.com/liana-p/narrat-engine/commit/1704e144ed0cf34c4a0f1fe580378673c530b22f))

# [2.14.0-alpha.1](https://github.com/liana-p/narrat-engine/compare/v2.13.1...v2.14.0-alpha.1) (2023-06-10)

### Features

- **conditions:** new elseif conditions feature ([#68](https://github.com/liana-p/narrat-engine/issues/68)) ([1704e14](https://github.com/liana-p/narrat-engine/commit/1704e144ed0cf34c4a0f1fe580378673c530b22f))

## [2.13.1](https://github.com/liana-p/narrat-engine/compare/v2.13.0...v2.13.1) (2023-04-16)

### Bug Fixes

- issue with create-narrat publish ([d1a1c95](https://github.com/liana-p/narrat-engine/commit/d1a1c95c3fdf8f429c650ef71a7583b68a029620))

### Features

- **audio:** new audio resume command and fix for playing audio that was paused ([#66](https://github.com/liana-p/narrat-engine/issues/66)) ([64713de](https://github.com/liana-p/narrat-engine/commit/64713debf5a86725568fb16eef812731c6607213))

# [2.13.0](https://github.com/liana-p/narrat-engine/compare/v2.13.0-alpha.1...v2.13.0) (2023-04-13)

### Bug Fixes

- **notifications:** notifications now disappear properly ([a1a8e21](https://github.com/liana-p/narrat-engine/commit/a1a8e219152c857bcb1857530e933d6d5cb2164a))

# [2.13.0-alpha.1](https://github.com/liana-p/narrat-engine/compare/v2.12.1...v2.13.0-alpha.1) (2023-04-13)

### Bug Fixes

- **build:** new release process is causing issues, trying a new version ([116b02f](https://github.com/liana-p/narrat-engine/commit/116b02f8320c5cfd79d44d54597cfbf3284884bc))
- create-narrat script issue fix ([1c6cda2](https://github.com/liana-p/narrat-engine/commit/1c6cda223de6a21e7150e1543258f7a701a0190d))

## [2.12.1](https://github.com/liana-p/narrat-engine/compare/v2.12.0...v2.12.1) (2023-04-12)

### Features

- **achievements:** achievement notifications ([#65](https://github.com/liana-p/narrat-engine/issues/65)) ([c6fe5b3](https://github.com/liana-p/narrat-engine/commit/c6fe5b3b69a9a24de7d4019c537b23e5380fc402))

# [2.12.0](https://github.com/liana-p/narrat-engine/compare/v2.10.4...v2.12.0) (2023-04-11) - Achievements!

## Achievements

See the new achievements feature:

https://docs.narrat.dev/features/achievements.html

### Bug Fixes

- issue with saving non-object values ([#42](https://github.com/liana-p/narrat-engine/issues/42)) ([41881df](https://github.com/liana-p/narrat-engine/commit/41881df425f1f25fa0d164dc38b8c13578b01a0d))
- save data issues ([#44](https://github.com/liana-p/narrat-engine/issues/44)) ([f67826c](https://github.com/liana-p/narrat-engine/commit/f67826c25050befdbb83e3293f68003594f98514))

### Features

- achievements and global save ([#47](https://github.com/liana-p/narrat-engine/issues/47)) ([669c120](https://github.com/liana-p/narrat-engine/commit/669c12092c5c0add7234544b2a11cb08cdb1280a))
- Apply configured audio file volume to played music and sound ([#43](https://github.com/liana-p/narrat-engine/issues/43)) ([63b56ca](https://github.com/liana-p/narrat-engine/commit/63b56ca117489341e4b437547bf2887a2a68ca18))
- component testing setup with vitest and jest-dom ([#46](https://github.com/liana-p/narrat-engine/issues/46)) ([cef092e](https://github.com/liana-p/narrat-engine/commit/cef092e4fad5acd64a9ba2251031f8021a827eb7)), closes [#45](https://github.com/liana-p/narrat-engine/issues/45)
- docs updates and automated release process ([#50](https://github.com/liana-p/narrat-engine/issues/50)) ([58fe210](https://github.com/liana-p/narrat-engine/commit/58fe21067a2c7a3933006d821c32797f966922a4))
- Fix and improve doc links in various places ([#48](https://github.com/liana-p/narrat-engine/issues/48)) ([abed47a](https://github.com/liana-p/narrat-engine/commit/abed47a98a904f4baa54f2670156938bb655df32))
- Get skill check ([#38](https://github.com/liana-p/narrat-engine/issues/38)) ([02b787e](https://github.com/liana-p/narrat-engine/commit/02b787e74c8d5e14d7f132feaaab335d8e8df212))
- more tests setup ([#49](https://github.com/liana-p/narrat-engine/issues/49)) ([984de73](https://github.com/liana-p/narrat-engine/commit/984de73c0f243a6bff0e85b6480cfd340f193f0f))
- sprite onclick arguments supports arguments ([#41](https://github.com/liana-p/narrat-engine/issues/41)) ([5c95e2f](https://github.com/liana-p/narrat-engine/commit/5c95e2f5fc0eeccec315d8d29b3c4424e1748ae7))

## Breaking Changes

- There is a new `saveFileName` string property that must be added to the `config.yaml` file. More info in the [saving and loading docs](https://docs.narrat.dev/features/save-and-load.html#saving-and-reloading-1).

# Narrat changelog

## [2.12.0] Achievements and global save data

## Achievements

See [achievements docs](https://docs.narrat.dev/features/achievements.html)

## Global Save Data

The engine now supports global save data. Global save data isn't associated with any save slot and is instead global for the entire game. This allows tracking meta data across multiple playthrough, or enabling features like achievements across multiple saves.

To use, set values in the `global` object instead of `data`. For example:

```narrat
main:
  talk player idle "hello world"
  add global.counter 1
  talk player idle "Global counter is %{$global.counter}"
```

Every time a new game is started, this script will increase the global counter despite it being a new save.

To reset global save data, use the `reset_global_save` command.

### Notable Change

There is a change to the name of the save file. It has been renamed because using a static name can make multiple games have their save files clash if hosted on the same website (for example games hosted on [itch.io](https://itch.io)).

The name of the save file is now generated based on the new `saveFileName` option configured in `config.yaml`.

## [2.11.1] Small bugfixes

- fix: there was an issue where it was possible to select a "hidden" choice (choice that didn't pass a condition) by pressing the corresponding keyboard number

## [2.11.0] Audio volume improvement and saves fix

- Audio volume in an individual audio file's config wasn't used properly and is now correctly mixed with the relevant volume for channels (by [@jornvandebeek](https://github.com/jornvandebeek))
- There was a problem where some game data didn't reset properly if a player continued playing after a save was made, went back to the main menu and reloaded the saved without reloading the browser

(technical note: pinia stores weren't all reset properly. If there are more bugs of this kind please signal them)

## [2.10.8] Fix to saves for non-object values

A bug had sneaked in where non-object values (strings, numbers, booleans) were not saved properly in the save file.

## [2.10.7] Passing arguments to sprite `onClick`

Arguments can now be passed to the `onClick` property of a sprite, by passing a string with the label and space-separated arguments.

It it also possible to make the `onClick` property be an object containing `label` (string), `method` (jump or run) and `args` (array of arguments) values for more advanced use cases.

Example:

```narrat
test_sprites_click:
  set data.sprite (create_sprite img/characters/cat_idle.webp 200 200)
  set data.sprite.onClick "some_label someArgument"
```

Clicking on the sprite will jump to `some_label` and pass as first argument the value `someArgument`

## [2.10.6] - New `get_skill_check` and `skill_check_result` functions

Those two new functions make it possible to access the data of a skill check.

- `get_skill_check` returns the skill check object for a given skill check label (contains `happened`, `succeeded` and `hidden`)
- `skill_check_result` returns the result of a skill check as `true` if succeeded or `false`

Example:

```narrat
test_skill_checks:
  choice:
    "test skill roll"
    roll testSkillCheck agility 50 "Test this skill roll":
      success:
        "You succeed!"
      failure:
        "You fail!"
    "no roll":
      "hello"
  var test (get_skill_check testSkillCheck)
  log $test
  log (skill_check_result testSkillCheck)
```

(See the logs in the js console after running this to see the skill check values appearing in it)

## [2.10.5] - Tooltip improvements

Tooltips now work inside the text of sprites in the viewport

## [2.10.4] - Bugfixes

- Improvement to error messages when the game tries to use characters that don't exist or have missing poses
- Fix for CRLF line endings causing the create-narrat script to fail with Yarn on unix systems
- Various new files are now exported in the narrat package (for development of plugins)

## [2.10.3] - Custom start menu buttons

New plugin API to add custom buttons to the start menu additionally to the basic ones.

See [Custom start menu buttons docs](https://docs2.narrat.dev/guides/custom-start-buttons)

## [2.10.2] - Sprites nesting fix

Fixed an edge case where sprites nesting would cause an infinite loop during saving

## [2.10.1] - Plugin API updates

Small fixes to the plugin API after recent changes. No other functional changes

## [2.10.0] - Nested sprites and texts in the viewport

### /!\ Breaking change

There is a small breaking change with the **Characters config**

The path to `characters.yaml` now needs to be specified in the `characters` key of the `config.yaml` file.

```yaml
characters: data/characters.yaml
```

The previous mention of the path to `characters.yaml` at the bottom of `src/index.ts` should be removed:

```ts
startApp({
  configPath: 'data/config.yaml',
  debug,
  logging: false,
});
```

### Rest of changes

### Nested sprites and texts

Previously there was a simple sprite feature to create and display individual sprites.

Those **sprites are now called `Screen Objects`**, and can be of different types (empty object, text or sprite for now).

They **can also be nested within in each other in a scene graph structure**, as you would see in many other game engine. Changing a parent will affect all the child objects within.

Usage example:

```nar
test_sprites_click:
  var sprite (create_sprite img/characters/cat_idle.webp 200 200)
  var sprite2 (create_sprite img/characters/cat_idle.webp 50 100 $sprite)
  var text (create_object 50 100 $sprite2)
  set text.anchor.x 0.5
  set text.anchor.y 0.5
  set text.width 200
  set text.height 200
  set text.text "Hello world!!!"
  wait 500
  set sprite.x 400
  wait 500
  set sprite.y 100
```

The script above would create a sprite, with another nested sprite in it, and a nested text at the end. Then by moving the first sprite, everything will move together.

### New options to disable buttons and sprite clicks during scripts by default

- By default, clicking on buttons or sprites will be disabled during scripts (ie. when the dialog panel appears)
- To change this behaviour, set `clickableDuringScriptsByDefault` to `true` in `buttons.yaml`. This will allow all buttons and sprites to be clickable during dialogs
- Individual buttons or sprites have a `scriptClickable` option which can be set to true or false to override the default behaviour.

Example:

```buttons.yaml
clickableDuringScriptsByDefault: false
```

```game.narrat
test_sprites_click:
var sprite (create_sprite img/characters/cat_idle.webp 200 200)
set sprite.onClick some_label
```

In this setup, the sprite will only be clickable during scripts.

if we set `set sprite.scriptClickable true`, then the sprite will be clickable during scripts too.

If we change the default options in `buttons.yaml` then all scripts will be clickable by default and we can disable them individually.

## [2.9.3] - Array find index function

A new helper function to find the index of an element in an array using a predicate to run a custom condition.

Syntax: `array_find_index [array] [predicate_label] [...args]`

The predicate is a label (used as a function) which will be called with each element of the array and should return true or false. When the predicate returns true, a match has been found and `array_find_index` will return the index of that match. The `array_find_index` function will also forward any other passed arguments to the predicate, useful for generic options to a function.

Example: We have an array with card objects in it and want to find the index of the card named "B" to delete it:

```nar
var card1 (new Object)
set card1.name "A"
var card2 (new Object)
set card2.name "B"
set data.deck (new Array $card1 $card2)
```

We can now create our custom predicate function to use with `array_find_index`

```nar
card_finder card name_to_match: // card is the array element, name_to_match is an extra parameter
  if (== $card.name $name_to_match):
    return true // If we found a card name that matches, return true
  else:
    return false
```

Then, to use this:

```nar
var index_to_delete (array_find_index $data.deck "card_finder" "B")
splice $data.deck $index_to_delete 1
```

## [2.9.2] - Time commands

New commands for getting and manipulating time, including reading total play time and session time. See [time functions docs](https://docs.narrat.dev/commandsall-commands#time-commands)

Fix: There was an issue when using the sprite `onClick` feature

## [2.9.1] - Array initialisation, data loading

It is now possible to initialise an array with values:

`var myArray (new Array 128 249 "hello")`

It is now possible to load a data file into a variable:

```yaml
---
black_lotus:
  image: img/characters/cat_idle.webp
blue_eyes_white_dragon:
  image: img/characters/inner_voice.webp
```

```narrat
set $data.cards (load_data data/cards.yaml)
var dragon (create_sprite $data.cards.blue_eyes_white_dragon 200 300)
```

## [2.9.0] - Arrays, tooltips, quest categories and other things

# ⚠️☢️ Breaking Changes ⚠️☢️

### String template syntax change

The use of variables inside string templates now requires prefixing with `$` like in other pieces of code. For example:

- old: `talk player idle "You have %{data.health} hp"
- new: `talk player idle "You have %{$data.health} hp"

This should be easy to do by simply doing a replace-all in your IDE from "%{" to "%{$"

### Quest categories

The config for quests now needs a config for categories. At the minimum, this needs to be added in the quests config file:

```yaml
categories:
  - id: default
    title: Quests
```

Example of a full file:

```yaml
categories:
  - id: default
    title: Quests

quests:
  breadShopping:
    title: Bread Shopping
    description: The helper cat asked you to buy bread for him.
    objectives:
      bread:
        description: Buy bread for the helper cat.
      delivery:
        hidden: true
        description: Deliver the bread to the helper cat.
```

## Other non-breaking changes

### Arrays

New array syntax! It is now possible to create arrays, and to dynamically access array indexes (or object properties) with variables.

See the [tweet explaining the feature](https://twitter.com/NarratEngine/status/1575809637277761542) or the [other tweet showing another example](https://twitter.com/NarratEngine/status/1575809637277761542).

There are lots of new commands for manipulating arrays which can be found in the [all commands list](https://docs.narrat.dev/commandsall-commands) docs page.

### Quest categories

Quests UI is now split between categories. See the breaking change above for an explanation on how to use them. It works the same way as item categories

### Tooltips

There is a new tooltip feature allowing keywords in text to automatically appear highlighted and show a tooltip on hover. To use this feature, the new `tooltip.yaml` config file is needed:

```yaml
options:
  width: 350
  keywordsPrefix: '@@'
tooltips:
  - keywords: [bread, breads]
    title: Bread
    description: Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking. Throughout recorded history and around the world, it has been an important part of many cultures' diet. It is one of the oldest human-made foods, having been of significance since the dawn of agriculture, and plays an essential role in both religious rituals and secular culture.
```

Then, in `config.yaml` add the path to the file:

```yaml
tooltips: data/tooltips.yaml
```

#### Tooltip options:

- `width`: Width of tooltip box in pixels
- `keywordsPrefix`: The prefix to use before words in scripts to make the tooltip appear

#### Tooltip config

- `keywords`: A list of all possible keywords to match for showing this tooltip. It's case insensitive
- `title`: The title of the tooltip popup that will appear
- `description`: The content of the tooltip popup

Then, to use in scripts, for example:

```narrat
main:
  talk player idle "I like @@bread"
```

Having one of the keywords defined in the tooltips with the `keywordsPrefix` before it will make it be detected as a keyword and show the tooltip

### Other things

- Items the player has 0 of will no longer appear in the inventory
- New `showIfEmpty` item config option to force an item to appear even if it's empty

## [2.8.1] - Various bugfixes

- There should be less bugs caused by using space to skip dialog
- Using autoplay hotkeys won't interfere with the debug jump to label tool anymore
- Menu tabs now correctly disappear if the feature isn't used
- The Escape shortcut to open the menu has been fixed
- Added clearer error messages when trying to use screens or buttons that don't exist

## [2.8.0] - Improved config files

### Breaking Change

The format of the config files has been improved.

- More consistent
- The engine can now validate the game's config file and give info about incorrect or missing fields.

Some of the fields in the config have slightly changed position, and some old options have been removed as they were replaced by others more recently.

### Dialog panel config

Previously the dialog panel config was split in two different parts. It now all goes into the `dialogPanel` at the root of the main config file:

```yaml
dialogPanel:
  overlayMode: true
  rightOffset: 100
  bottomOffset: 50
  width: 475
  height: 680
  textSpeed: 30
  animateText: true
  timeBetweenLines: 100
```

The previous values should be deleted

### Changes to split configs

Some of the split configs were directly a list of elements (like the quests config files or the screens file), which makes it impossible to add new options to those files without a breaking change.

Those files have been changed where needed to have the list of elements inside a specific key, so that new options can be added to those specific files.

This means existing configs will need to be updated in a few places, as explained below.

### Screens config

The screens config file now contains the screens list inside a `screens` property, to allow adding other options in the same file in the future.

Before:

```yaml
default:
  background: narrat
  buttons:
    - shopButton
overlay:
  background: img/backgrounds/overlay.webp
  buttons:
    - id: testButton
      enabled: true
      text: Test
      position:
        left: 500
        top: 300
        width: 200
        height: 50
      action: shopButton
```

After:

```yaml
screens:
  default:
    background: narrat
    buttons:
      - shopButton
  overlay:
    background: img/backgrounds/overlay.webp
    buttons:
      - id: testButton
        enabled: true
        text: Test
        position:
          left: 500
          top: 300
          width: 200
          height: 50
        action: shopButton
```

### Buttons config

Similar to the screens config, the buttons config now has buttons under the `buttons` property:

```yaml
buttons:
  parkButton:
    enabled: false
    text: Park
    position:
      left: 682
      top: 462
      width: 200
      height: 50
    anchor:
      x: 0.5
      y: 0.5
    action: parkButton
```

### Quests Config

Similar to the screens config, the quests list is now inside the `quest` key of the quests config file:

Before:

```yaml
breadShopping:
  title: Bread Shopping
  description: The helper cat asked you to buy bread for him.
  objectives:
    bread:
      description: Buy bread for the helper cat.
    delivery:
      hidden: true
      description: Deliver the bread to the helper cat.
```

After:

```yaml
quests:
  breadShopping:
    title: Bread Shopping
    description: The helper cat asked you to buy bread for him.
    objectives:
      bread:
        description: Buy bread for the helper cat.
      delivery:
        hidden: true
        description: Deliver the bread to the helper cat.
```

### Audio triggers

The `audioTriggers` part of the config has been moved inside the `audio` config

## [2.7.3] - Data save bug

Fixed a bug where contents of the data object would get overwritten after saving

## [2.7.2] - Sprites bugfix

Fixed a bug where sprites wouldn't be able to move after reloading the game

## [2.7.1] - Small bugfixes

Small bug fixes around items use

## [2.7.0] - Animated text and autoplay update

This update brings new features for text animation and autoplay, along with more customisation options to fully control the size and position of the dialogue panel.

Video showing the new features:

![Watch the video](https://www.youtube.com/watch?v=o_wRNp0h0DE)

### Text animation

Text can now be animated instead of printing instantly, as seen in the video above. The new options are:

```yaml
dialoguePanel:
  textSpeed: 30 # Each letter will take 30 milliseconds to appear
  animateText: true # Text will be animated
  timeBetweenLines: 100 # 100 milliseconds of wait time before going to the next line during autoplay
```

### Autoplay and skip

Two new keyboard shortcuts have been added for autoplay and skip modes

- `a`: Toggle auto play
- `s`: Toggle skip

Auto play mode will make dialogue keep playing automatically (waiting the appropriate amount of time between lines), and pause when a choice is reached.

Skip mode will skip all dialogue very fast and stop once a choice is reached or the dialogue is finished.

There are also two buttons in the UI to toggle those two modes, which can be positioned or hidden with CSS.

### New layout options for the dialogue panel

The `dialogPanel` part of the `layout` config can now have a bottom offset and a height. This allows positioning and sizing of te dialogue panel anywhere. For example, a "traditional" VN game layout can be reproduced by making the dialogue panel wide with a small height and positioning it near the bottom of the page.

```yaml
layout:
  dialogPanel:
    overlayMode: true
    rightOffset: 100
    bottomOffset: 50
    width: 475
    height: 680
```

### Improved game menu

The game menu has been improved and is now split in two parts: The system menu (which contains options and the quit/return to menu) and the "menu" containing game-specific menus like inventory, quests etc.

The game menu also now has tabs to switch between the different sections like inventory and skills, rather than having multiple buttons at the bottom of the screen.

Quests have a better layout with a quest list on the left and details on the right.

### Item categories

Items now support categories. By default items without a category go in the "default" category (appearing as "Items" in the game).

The format of the items config has changed to allow to define categories:

Example:

```yaml items.yaml
---
categories:
  - id: default
    title: Items
  - id: books
    title: Books

items:
  bread: # Has no category, will go in the default category
    name: Bread
    description: A bread in the game.
    icon: img/items/bread.webp
    onUse:
      action: jump
      label: eat_bread
  book:
    name: Ominous Book
    description: 'An ominous book.'
    icon: img/items/book.webp
    onUse:
      action: run
      label: read_book
    tag: always_interactable
    category: books # Will go in the books category
```

## [2.6.4] Repeatable skill rolls

A skill roll can now be tagged as repeatable:

```narrat
main:
  jump test_skills_reset

test_skills_reset:
  choice:
    "Skill check test"
    roll testSkillsReset agility 50 "Test this skill roll" repeatable: // The "repeatable" tag here will allow players to retry the roll
      success:
        "You succeed!"
      failure:
        "You fail!"
    "Other choice":
      "Other choice"
  jump main
```

When a roll is repeatable, the player will be allowed to keep trying it every time they come across it, even if it has failed before. If it has already succeeded, it will be skipped as usual

There is also0 a `reset_roll` function to programmatically reset a skill check in the script, for more granular control:

```narrat
main:
  jump test_skills_reset

test_skills_reset:
  choice:
    "Skill check test"
    roll testSkillsReset agility 50 "Test this skill roll":
      success:
        "You succeed!"
      failure:
        "You fail!"
    "Other choice":
      "Other choice"
  reset_roll testSkillsReset // This will completely reset the state of the skill roll, no matter if it failed or not
  jump main
```

## [2.6.2]

Fixed a bug with reloading audio saves when audio was previously stopped

⚠️ Saves created with 2.6.1 might have an issue with audio data and need to be deleted

## [2.6.1]

Fixed a bug in edge cases with saves

## [2.6.0] New save system and improved default CSS design

The save system has been reworked to be easier to understand and less buggy.

⚠️ Breaking Change: Because there are no existing games with saves out there, migration code for previous save file versions has been deleted to start from a clean slate. This means old versions of save will be automatically reset (or potentially break) when updating the engine.

### Fixed save slots amount

The new system has a fixed amount of save slots allocated to a game, defined in the save part of the config.

In manual mode, one of those slots is the auto save and the others are for manual saves the players may create. In `game-slots` mode, each slot corresponds to a playthrough, like before.

```yaml
saves:
  mode: manual
  slots: 10
```

The rest of the saving system functions as it used to.

### Bug fixes

Some issues with how data was saved (especially when not reloading the page) were identified and fixed.

### CSS Design

The default CSS design has been improved to look nicer. It's mostly changes to default color so it shouldn't impact existing games much. A few new CSS variables have been added to make customising buttons and modals easier:

```css
--light-gradient: linear-gradient(to right, var(--light-1), var(--light-2));
--light-background: rgba(255, 255, 255, 0.3);
--button-background: var(--light-gradient);
--button-text-color: var(--text-color);
--modal-background: rgba(0, 0, 0, 0.7);
```

## [2.5.1] Button improvements

### Button text string interpolation

Buttons text can now use string interpolation to display variable values. Example:

```yaml
buttons:
  - id: shopButton
    text: '%{shopName} Shop'
```

### Button custom CSS class

Buttons have an optional `cssClass` property, to allow giving them a specific css class:

```yaml
buttons:
  - id: shopButton
    cssClass: my-css-class
```

Can be used to for example easily give the same styling to a range of buttons, or to give them hover styling

### New audio triggers

There are 3 new audio triggers to play sound effects when interacting with buttons, sprites and items. Example:

```yaml
audioTriggers:
  onButtonClicked: click
  onSpriteClicked: click
  onItemUsed: click
```

## [2.5.0] Mobile layout and new dialog panel overlay mode

### Mobile layout

Portrait mode mobile device layout support has been fixed and improved. The `layout.verticalLayoutThreshold` part of the config decides which screen width threshold will trigger the change between portrait and landscape.

There are also new options to give an offset to character portraits depending on the orientation of the device, to make it possible to control their position. In the layout config:

```yaml
portraits:
  width: 150
  height: 225
  offset:
    landscape:
      right: 10
      bottom: 0
    portrait:
      right: 10
      bottom: 0
```

### New dialog panel overlay mode

There is now an option to make the dialog panel appear in overlay mode. Instead of it being on the right of the viewport, it will appear on top of the viewport when a script is active. This allows the viewport to use the full width of the screen when not in dialogues.

The new `dialogPanel` part of the layout config controls this option:

```yaml
layout:
  dialogPanel:
    overlayMode: true # True activates overlay mode
    rightOffset: 50 # In overlay mode, the dialog panel will be moved to the left by this amount when overlayed.
```

## [2.4.1] Fix to multiple layers clickthrough

Fixed a bug where a higher layer of screen in the viewport could block clicks through to the previous layers.

## [2.4.0] Sprites support

The engine now supports dynamic sprites in the viewport.

The `create_sprite` function returns an object that can be manipulated to move sprites, change their anchor, opacity, scale and more.

Usage example:

```narrat
test_sprites:
  var sprite1 (create_sprite img/sprites/test_sprite.webp 200 500)
  set sprite1.anchor.y 1
  set sprite1.scale 0.5
  var sprite2 (create_sprite img/sprites/test_sprite.webp 500 700)
  set sprite2.anchor.y 1
  var pos 200
  wait 20
  set sprite1.x 250
  wait 20
  set sprite1.x 300
```

## 2.3.5

Fixed a bug in the previous release when emptying an already empty layer

## [2.3.4] Screen transitions fixes and improvements

- fix: transitions no longer fail when starting from an empty screen layer
- fix: Loading a game save where a layer was emptied doesn't crash anymore
- feature: The `empty_layer` command can now use transitions: `empty_layer 0 slide-right 2000`

## [2.3.3] Split config files support

The config can now be split in multiple files to be easier to edit. Possible files are:

- screens
- buttons
- skills (contains skills, options and skillOptions)
- scripts
- audio (contains files for list of audio, and options for audioOptions)
- items
- quests

To use a split config file, simply replace the value of that object in the config with the path of the file that contains the config. Example:

Before:

config.yaml

```yaml (config.yaml)
screens:
  default:
    background: narrat
  # ... Rest of the screens config
```

After:

config.yaml

```yaml (config.yaml)
screens: data/screens.yaml
```

screens.yaml

```yaml
default:
  background: narrat
map:
  # Rest of the config
```

For an example, see the config files in the [default example](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games/default/data)

## [2.3.2] Yaml support

The engine now supports `yaml` config files. The `config.json` and `characters.json` can now be written in yaml. The engine will detect which one of the two is being used based on the file extension in the path.

Websites like [json2yaml](https://www.json2yaml.com) can easily convert existing json files into yaml. Then it's just a matter of naming the file `config.yaml` instead of `config.json`, and updating the path that's passed to narrat in `src/index.ts`.

## 2.3.1

fix: A bug where manual saves would get overriden as autosaves in manual save mode has been fixed.

## 2.3.0

### Improved plugin API

The plugin API has been improved to allow for more features (not documented yet).

There is now an [example plugin](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat-plugin-counter) in the repo that serves as an example of how to write plugin.

There is also a [create-narrat-plugin](https://github.com/liana-p/narrat-engine/tree/main/packages/create-narrat-plugin) tool to easily create a plugin project, similar to the create-narrat tool.

## 2.2.18

### New config options to customise the engine splash screen and game splash screen

It is now possible to add a `splashScreens` option to `config.json`, where the following values can be used (all optional).

**Note:** In debug mode, the engine splash screen is automatically skipped to save development time, regardless of options. Change debug to false in `src/demo.ts` if you want to see splash screens.

```ts
  splashScreens: {
    engineSplashScreen?: {
      skip?: boolean;
      fadeDuration?: number;
      timeBeforeFadeout?: number;
      overrideText?: string;
      overrideLogo?: string;
    };
    gameSplashScreen?: {
      startButtonText?: string;
    };
  };
```

Example:

```json
{
  "splashScreens": {
    "engineSplashScreen": {
      "timeBeforeFadeout": 3,
      "fadeDuration": 2
    },
    "gameSplashScreen": {
      "startButtonText": "Start Game"
    }
  }
}
```

## 2.2.17

### Create narrat tool updated

The create narrat tool has been updated with a more recent demo, and a template based on the RPG demo.

### More convenient `startApp` function

Optional backwards-compatible convenience change to the `startApp` function:

Previously, `startApp` was split into two different options objects for no good reason:

```ts
startApp(
  {
    baseAssetsPath: assetsPath,
    baseDataPath: dataPath,
    charactersPath: `${dataPath}data/characters.json`,
    configPath: `${dataPath}data/config.json`,
  },
  {
    logging: false,
    debug,
  },
);
```

Now, it is possible to put all those values in one object (but it's backwards compatible so existing code will work just as it did before):

```ts
startApp({
  baseAssetsPath: assetsPath,
  baseDataPath: dataPath,
  charactersPath: `${dataPath}data/characters.json`,
  configPath: `${dataPath}data/config.json`,
  logging: false,
  debug,
});
```

### New `baseDataPath` option in startApp

(Optional) If for whatever reason you want data assets (scripts) to be located in a different base folder than the default, you can pass this option as in the example above.

### Internal repo changes

Internal changes to repository structure to make it easier to develop example games and the narrat template games (templates are now taking from example games to avoid duplication). The repo also stopped using git LFS and is reusing common assets across examples to avoid more asset duplication.

This Shouldn't affect end users

## 2.2.16

Nicer loading and game splash screen feature

## 2.2.15

### Manual saves

The engine now has a feature to use manual saves in a game instead of the default system of save slots per game that auto save.

In config.json, setting `saves.mode` to `manual` will enable this feature. The default is `game-slots` which is the existing behaviour (where each game has a single save slot and keeps saving in that slot).

To summarise:

- `game-slots`: Save mode where each press of "New game" creates a save slot for that playthrough, and the game auto-saves in that slot every time. If loading a save, the game will auto-save in the slot that was just loaded. Each save slot is basically a linear playthrough where the save gets auto erased whenever the game auto saves.
- `manual`: Save mode where there is a single global auto save used no matter which save gets loaded, but manual saves won't be overwritten unless the player chooses to overwrite them

With this, there are two new commands:

`save`: Lets the player choose where to save the game to a manual save slot
`save_prompt`: Asks the player if they want to save, then does the same thing as `save`

Syntax: `save [save_name]`: The first argument is an optional name for the save slot. Can be used for auto-naming saves with for example the current chapter or other. Otherwise it defaults to generating a name based on the save's number.

**Note:** Saves still only save data when jumping labels, so the data that gets saved in a manual save will be the data at the point where the jump to the current label happened.

## 2.2.14

- Bugfix: An edge case caused by a [bug on firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=706773) would cause keyboard events to stop working after a button has been clicked with the recent update that auto disables them, so this has been fixed by not using a native button to avoid having it keyboard selectable
- Internal architecture updated to be a monorepo, with pnpm now used as a package manager for internal development. Shouldn't affect users

## 2.2.12 and 2.2.13

Internal architecture updates to support the new [create-narrat](https://github.com/liana-p/narrat-engine/tree/main/packages/create-narrat) tool to generate narrat projects automatically.

The narrat template is now retired in favor of this new tools, and there are now multiple choices of templates in the create-narrat tool for people to use when setting up projects.

## 2.2.11

### Transitions feature

See [Transitions](https://docs.narrat.dev/features/transitions) docs for more info

## 2.2.10

New function to return to the main menu from a script: `menu_return`

## 2.2.8

- Bugfix to inventory items that use the `run` command in the middle of a running dialogue

### New features

- Screen buttons can have a `tag`, which works the same as interaction tags for inventory items. The default tag gets disabled inside scripts, and all buttons have the `default` tag by default. This makes it possible for buttons to automatically be greyed when entering a dialogue, without having to manually disable them or change screen.
- New config option: `gameFlow.labelToJumpOnScriptEnd`: When the game reaches script end (when it shows the debug message about the script being finished), if this option is present it will instead jump to the provided label. This allows automatic jumping back to a map screen label or other whenever dialogues end.

## 2.2.4 - 2.2.7

Various bugfixes to previous changes

## 2.2.3

New `think` command. Works the same as talk, but doesn't wrap text in quotes.

It also has custom CSS so each version of text can be customised. talk commands add the CSS class `talk-command`, think: `think-command`, and the basic text command adds `text-command`.

Example:

```py
think player idle "I wonder if I could eat a whole pizza in 28 seconds"
```

## 2.2.2

New notification commands and options:

- `disable_notifications`: Disables notifications
- `enable_notifications`: Enables notifications

New config option: `skillOptions.notifyLevelUp` (boolean). Default: true. If set to false, will disable notifications from level ups for the whole game.

## 2.2.1

Notifications can now use html tags and string interpolation

Example: `notify "Hello <span style='color:red;'>%{playerName}</span>"` will work

## 2.2.0

Audio improvements:

- New audio mode: `ambiant` for ambiant music/sound
- New audio channels feature: Optional `channel` parameter in `play`, `stop` and `pause` commands to choose a channel (defaults to 0). This allows having multiple musics, or multiple ambiant sounds to play at once.

Examples:

- `play music calm` will play the music `calm` on channel 0.
- `wait 2000`
- `play music calm 1` will play the music `calm` on channel 1. Because it's a different channel, the musics will superpose
- `wait 2000`
- `stop music 1` will stop the music on channel 1.
- `play ambiant forest` will play the ambiant sound `forest` on channel 0. This is a different audio mode, so it will be played independently of the musics.

Sounds now also use channels, but they ignore all the code related to fading musics in and out, or stopping the previous audio on the channel (because sounds are meant to be a one off and people shouldn't have to bother keeping track of sound channels).

To stop the last audio played on the channel `stop sound` works. It is still possible to use channels with sounds (`play sound bang 1` then later `stop sound 1`), but it shouldn't be necessary.

## 2.1.6

Fixed an issue where the `random` command didn't accept 0 as a number

## 2.1.5

Bugfixes related to save slots edge cases

## 2.1.4

New math commands:

- `floor`: Turns a number into an integer (whole number), rounding down.
- `ceil`: Turns a number into an integer (whole number), rounding up.
- `round`: Rounds a number to the nearest integer.
- `sqrt`: Square root of a number.
- `^`: Exponentiation.

Also, the `set_level` and `add_level` commands will give a warning and auto round values passed if they're not whole numbers.

### Save slots

The engine now supports save slots. The "Load game" button will open a window for the player to choose a save file to load.

There is also a new "Continue" button that will appear if the player has already played to continue playing on the same slot as last time.

## 2.1.3

There is now access to the game's config and app options in script, notably useful to check if the game is in debug mode. New available options:

`$config`: The game's config.
`$gameOptions`: The options passed when launching the game with `startApp`

Example:

```rpy
main:
  if $gameOptions.debug:
    "Do something in debug mode"
```

## 2.1.2

### Internal Refactor

The scripting engine has been refactored internally to differentiate between blocks and frames. A frame in the stack is now a function call (running a label or jumping), whereas blocks are for branching. That means any block inside a frame still has access to the same scoped variables (which are stored in the frame), and `return` can now be called anywhere inside a function and will interrupt the function and return, like in other languages.

### Bugfixes

- There was an issue with the `text` command from the fix in 2.1.1, now solved
- There were various issues affecting performance and logic in keyboard handling with the dialogue box which are now fixed
- Added a bit of debouncing on the keyboard events because there was an issue when speeding through games

### Keyboard events in production

Previously, the engine was using a `keydown` event for picking choices with the keyboard. This allowed speeding through the game quickly, but shouldn't be possible in production.

The engine now instead uses a `keyup` event if the debug mode is up, to make it impossible to speed through the game by holding space for normal players.

## 2.1.1

fix: The `text` command (default command for printing text without using `talk`) was adding quotes around text since 2.0.0. This is now fixed.

## 2.1.0

### ⚠️ Breaking Change ⚠️

Narrat has been updated to use [vite 3](https://vitejs.dev/blog/announcing-vite3.html#the-ecosystem-is-ready-for-v3). The only breaking change is that the path of the narrat CSS file has changed:

In the game's `index.ts` the import of CSS needs to change. Before:

`import 'narrat/dist/lib.css';`

After:

`import "narrat/dist/style.css";`

Many new features, TODO: fill changelog.

### Data shorthand

It is now no longer necessary to prefix things with `data` when setting or getting variables.

For example `set player.name` is equivalent to `set data.player.name`.

The way the system works when looking up variables is:

- Return if there's a base variable in the lookup state matching (for example `data`, `skills` etc)
- Otherwise if a variable exists in the local scope (created with `var`) use that
- Otherwise default to assuming we're editing something inside `data`

### New example RPG game

There is now an example [dungeon crawler turn based RPG](https://github.com/liana-p/narrat-engine/tree/main/examples/rpg) game made as a test to push the engine and scripting features. It is not meant to be a full game, but can be a useful reference for advanced usage.

### Anchor feature for buttons

There is now an optional `anchor` property for buttons, useful for anchoring a buttom from its center or any other place.

Example:

```json
{
  "buttons": {
    "go_front": {
      "enabled": false,
      "background": "img/ui/front.png",
      "position": {
        "left": 440,
        "top": 120,
        "width": 96,
        "height": 96
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      },
      "action": "choose_front"
    }
  }
}
```

### Base assets path

There is now a way to pass a base assets path to narrat, which will be prepended to the path of any assets that need to be loaded by the engine (this was needed to implement the multiple demos in a single repo).

The option is `baseAssetsPath` which can be passed in the first options object of `startApp`.

See the `demo.ts` file for an example of how to use it.

### Game examples now in the repo

The repo has been restructures to allow having multiple example games directly inside it.

The `examples/` folder contains a subfolder for each demo game, where the data/asset files for a game can be placed.

To run an example game, the dev script needs to be run with a special environment variable pointing to the path of the game to run. For example, a command has been added to run the rpg game:

`npm run rpg` -> Runs `cross-env VITE_EXAMPLE=examples/rpg npx vite dev`

Demo games can also be built from the repo. For example:

`npm run build-rpg` -> Runs `cross-env VITE_DEMO_BUILD=rpg npx vite build && shx cp -r examples/rpg/* built-example/rpg`. The built game is then available in the `built-example/rpg` folder.

### New commands

Added a lot of new commands while making the RPG example.

#### Math operations

- Negate numbers: `neg 1` -> returns -1
- Absolute function: `abs -1` -> returns 1
- Min - returns lowest passed number: `min 1 2` -> returns 1
- Max - returns highest passed number: `max 1 2` -> returns 2
- Clamp - returns number between min and max: `clamp 1 2 3` -> returns 2 (syntax: `clamp [min] [max] [value]`)

#### Random generation

- Random number: `random 1 10` -> returns an **integer** random number between 1 and 10 (inclusive)
- Random float: `random_float 1 10` -> returns a float between 1 and 10
- Random from args: `random_from_args "a thing" "another thing" 2 "things can be any value"` -> returns a random item from the list of arguments

#### Strings

- Concat: `concat "a" "b"` -> returns "ab" (Syntax: `concat [string1] [string2] [string3]...`)
- Join: `join ", " "a" "b"` -> returns "a, b" (Syntax: `join [separator] [item1] [item2] [item3] ...`)

#### Skills

- Set level: `set_level agility 1` -> sets the level of the skill "agility" to 1
- Get level: `get_level agility` -> returns the level of the skill "agility"
- Get xp: `get_xp agility` -> returns the xp of the skill "agility"

#### Utility

- Log: `log $someVariable` -> logs the value of the variable $someVariable to the console (Syntax: `log [value1] [value2] [value3]...`). Can be used to log anything for debugging

## 2.0.12

New layers feature: Multiple screens can be overlaid on top of each other in layers.

Layers are defined by their number, being displayed from 0 to x. By default, the `set_screen` command sets a screen on the first layer, as it did before. To set a screen on a different layer, pass the layer number as a second parameter.

```py
set_screen my_screen 1
// do stuff, then remove the overlay
empty_layer 1
```

## 2.0.11

feature: The left-side viewport now uses DOM instead of canvas so screens and buttons can use animated gifs or webp.

The config has optionally been made easier to edit, with no need to define images in the `images` part of the config. buttons can also now be optionally defined inside the screen directly. The config is still compatible with the old syntax.

Example:

```json
{
  "screens": {
    "default": {
      "background": "narrat"
    },
    "map": {
      "background": "img/backgrounds/map.png",
      "buttons": [
        {
          "id": "shopButton",
          "enabled": false,
          "background": "img/ui/shop-button.png",
          "position": {
            "left": 38,
            "top": 6,
            "width": 255,
            "height": 226
          },
          "action": "shopButton"
        },
        {
          "id": "parkButton",
          "enabled": false,
          "background": "img/ui/park-button.png",
          "position": {
            "left": 632,
            "top": 86,
            "width": 255,
            "height": 226
          },
          "action": "parkButton"
        }
      ]
    }
  }
}
```

## 2.0.10

fix: `quest_completed?` now returns the correct value

## 2.0.9

Internal engine changes, shouldn't impact users.

Refactor to the VM and commands system to handle the way the stack flows better. Commands don't have to call `nextLine` on the VM to run the next line, instead the VM properly knows when a command is truly finished and controls the program's flow.

Also renamed `stacks` to `frames`, as the stack is the array that contains the frames and this was confusing.

## 2.0.8

- Fix: Auto scrolling when new text is added now works properly
- Fix: error when using set_stat or add_stat with a value of 0

## 2.0.7

Fixed an error where the `roll` function always returned true even if the skill check failed

## 2.0.6

Fixed a reggression bug introduced in 2.x where player choices weren't printed anymore in the dialogue history after making a choice.

## 2.0.4

Fixed more audio edge cases around race conditions

## 2.0.1

Fixed audio bug around loading

### New feature: Text Fields

New text fields feature to let players type answers to questions.

Usage: `text_field [prompt]`

Example:

```py
main:
  set player.name (text_field "Enter your name")
  "Your name is %{playerName}"
```

## 2.0.0

The narrat 2.0.0 branch is now the main branch.

Narrat 1.x has been deprecated and moved to the `v1-latest` tag on npm.

To install old v 1.x for legacy games, use `npm install narrat@v1-latest` instead of just `npm install narrat`

To know more about how to update a game to 2.x, see the [narrat 2.0.0 docs](https://docs.narrat.dev/readme/narrat-2.0)

## 2.0.0-rc4

### Important Note

The main CSS file from narrat must now be imported in games using it to have the default CSS.

Simply add `import 'narrat/dist/style.css';` at the top of your `index.ts` (before your own CSS).

### Switch to vite

To make developping narrat easier, the bundler used has been switched from rollup to vite. Vite is recommended as the standard for Vue these days, and the rollup vue plugin is deprecated. The update was necessary to support more recent features.

This has no impact on end users, other than having to import the CSS file as explained above.

## 2.0.0-rc3

- Improvements to debugging to show more useful info on parser/runtime errors
- Corrected display of line numbers in errors
- Made parser continue parsing after errors to make it easier to see all errors at once and to be able to play the game even if there are parser errors

## 2.0.0-rc1

### Narrat 2.0

### What changed in narrat 2.0

Narrat has a **new language syntax** in 2.0.0 - The parser has been improved to turn the narrat scripting into a full programming language with support for expressions, variables and functions

The syntax is generally the same so existing scripts would mostly work, except for the use of `$if` (which used to be a hack by sending your code to JavaScript [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)).

### Script updating tool

There is a [script updating tool](https://github.com/liana-p/narrat-engine-Script-Updater) which can be used to help automatically update existing scripts from 1.x to work with the new syntax.

{% hint style="danger" %}
The old syntax is largely compatible, but the $if instruction works very differently now. The script will update those $if instructions to match the new system, but might fail at updating long series of conditions in $if
:::

### Installing narrat 2.0

Narrat 2.0 is currently published under a different tag to avoid people on 1.x accidentally installing it.

To install narrat to, run `npm install narrat@next`. The `next` tag is where the latest 2.x version is published.

### Expressions

Expressions are now a first party feature. An expression is any operation between parenthesis. Any command in the game can be used as an expression, if it returns a value. For example `(+ 2 3)` is an expression that would get evaluated to `5`.

### Syntax for using commands

The syntax for using commands hasn't changed, but it's been formalised.

The format for any operation is `[operator] [arg1] [arg2] [arg3] ...`. Operator is the command's keyword (like `talk`, `set`, `if` etc).

For example:

`set data.player.score 3` is the operator `set` with arguments `data.player.score` and `3`.

`set data.player.score (+ $data.player.score 2)`

The first command would set `3` in `data.player.score`.

The second command is also a set on `data.player.score`, but the second argument (the value) is an expression itself: `(+ $data.player.score 2)`. So the final resulting command is effectively `set data.player.score 5`.

### Using Variables

To use a variable's value in a command, prefix its name with `$` as in the example above. In the case of the `set` command, we want to pass to set the variable's name, not its value, so we don't use `$` at the start.

Variables are also available in string interpolation as before, to insert variables in text:

`talk player idle "Hello %{data.player.name}"`

### New If syntax

The previous `$if` is gone, now `if` is a command itself, which takes one argument: the condition. If the condition is true it plays the next branch, and it can have an optional else branch.

Example:

```py
set data.age 25
if (> $data.age 18):
  "The player is an adult"
else:
  "The player is not an adult"
```

#### More details on syntax and expressions

More complex example:

```py
main:
  set data.winThreshold 10
  set data.player.score 5
  set data.player.scoreBonus 5
  if (== (+ $data.player.score $data.player.scoreBonus) $data.winThreshold):
    "The player won!"
```

In this example, the script stores a few variables, and then uses them in an `if` to compare their value. The `==` operation returns true if all arguments are equal, while the `+` operation adds values together and returns the result.

Here's how the code above would get broken down as the expressions get calculated:

```py
if (== (+ $player.score $player.scoreBonus) $data.winThreshold):
if (== 10 $data.winThreshold):
if (== 10 10):
if true
```

### New operators

A lot of new operators have been added to be able to perform basic operations with the new scripting system:

- `+`, `-`, `*`, `/` : Will add/substract/etc arguments passed and return the value. Can take infinite arguments
- `||` and `&&` : Will or/and all arguments passed and return true or false. Inifinite arguments
- `>`, `>=`, `<`, `<=`, `==`, `!=` : Compares arguments 1 and 2, returns true or false. Note: equality uses truthy equality, not strict equality
- `!`: Negates argument 1
- `?`: Ternary operation. Arg 1 is the condition, 2 is what gets returned on success, 3 what gets returned on failure

### New helper functions

New helper functions for easily checking quests and inventory without long lines:

- `quest_completed? [questId]`: Returns true if the quest `questId` is completed
- `objective_completed? [questId] [objectiveId]`: Same for an objective
- Also quest_started and `objective_started`
- `has_item? [itemId] [amount (optional)]`: Returns true if the player has an item (if amount is passed, the player needs to have amount or more of it)
- `item_amount? [itemId]` Returns how many of an item the player has.

### Local variables

Local variables can now be declared. They exist inside the scope in which they are declared. Example

```python
main:
  run variables_test
  "The variable 'test' is now undefined because we left the scope it was created in: %{test}"

variables_test:
  var test 1
  "Test value is %{test}"
```

### Function with arguments and return values

Labels are now "functions" and can take arguments or return values.

Example:

```
main:
  var meal (run takeout_menu Cake)
  "The player chose to eat %{meal}"

takeout_menu third_option:
  var meal ""
  choice:
    talk helper idle "Which meal do you want?"
    "Pizza":
      set meal pizza
    "Burger":
      set meal burger
    "%{third_option}":
      set meal $third_option
  talk helper idle "Chosen %{meal}"
  return $meal

```

### Other new features

#### Audio triggers

New audio triggers feature to play sounds on certain events in the game.

Simply add the sounds to the config:

```json
  "audioTriggers": {
    "onPlayerAnswered": "click",
    "onPressStart": "game_start",
    "onSkillCheckFailure": "failure",
    "onSkillCheckSuccess": "success"
  }
```

Keys are event names, and values are the id of an audio you've defined in the config. For now all the available events are the ones above. Once defined, the sound will play every time that event is triggered.

## 1.3.3

1.x branch is now deprecated as 2.x is being pushed to main.

See [Narrat 2.0 update](https://docs.narrat.dev/readme/narrat-2.0) docs for more info on how to update to 2.x

The main breaking change is the syntax for $if has changed, and also a CSS file needs to be imported in the game's `index.ts`:

`import 'narrat/dist/lib.css';`

## 1.3.2

- Improvement to variables editor for debugging
- Bugfixes to access quests in conditions

## 1.3.1

New feature to "use" items.

In an item config, an optional `onUse` value is available, which cn be set to a label to jump to when using the item.

There are also interaction groups which allow scripts to toggle on/off whether using items is allowed. They can be configured to automatically be turned off during dialogue scripts (to avoid bugs/side effects that jumping to an item's label would cause halfway through dialogue).

Config:

```json
  "items": {
    "bread": {
      "name": "Bread",
      "description": "A bread in the game.",
      "icon": "img/items/bread.png",
      "onUse": {
        "action": "jump",
        "label": "eat_bread"
      },
      "tag": "default"
    },
    "book": {
      "name": "Ominous Book",
      "description": "An ominous book",
      "icon": "img/items/book.png",
      "onUse": {
        "action": "run",
        "label": "read_book"
      },
      "tag": "always_interactable"
    }
  },
  "interactionTags": {
    "default": {
      "onlyInteractOutsideOfScripts": true
    }
  }
```

The `onUse` `action` property can be either `jump` or `run`, allowing to either jump to a script, or run a script as a function (see [1.3.0 changes](#1.3.0) or [functions docs](https://docs.narrat.dev/features/functions)), which effectively allows interrupting the current dialogue to run an item's function before going back to it.

The `tag` property on an item data sets which interaction group it is part of. This allows fine control of which items can be allowed to be used when. For example, some items might be available to use all the time, while some should only be allowed to be used at certain points.

By default if not provided, items have the `default` tag, and the default configuration has the `default` tag set to use `onlyInteractOutsideOfScripts`, which automatically disables interaction during scripts to avoid issues.

In the example above, the bread can only be interacted with outside of scripts and will use a jump to a label, while the book can be interacted with at any time and will use a `run`, effectively running a label as a function and then going back to where the script was.

In scripts, interaction tags can be controlled:

```py
main:
  disable_interaction someTag
  talk player idle "Impossible to use items with the tag someTag for now"
  enable_interaction someTag
  talk player idle "It is now possible to use items with the tag someTag"
```

## 1.3.0

New `run` function to run a label as a "function"

The difference between this and jump is that using `run` will go back to where you were before once the label is over.

For example:

```py
main:
  set data.counter 1
  jump functions_test

functions_test:
  run some_function
  talk player idle "Back to functions_test"
  run some_function
  talk player idle "We're back again"

some_function:
  talk player idle "Ran the function %{data.counter} times"
  add data.counter 1
```

In this example when running `functions_test`, the script in `some_function` will be ran, then the execution comes back to do the rest of `functions_test`.

**Note:** Saving still only happens when _jumping_ to a label, because being at a specific label is the only way to make sure a save file can keep working if the code of the game gets changed in an update.

## 1.2.1

Improved reset feature when returning to main menu to avoid potential bugs

## 1.2.0

## Quests system

There is a new quests system.

Quests can be defined in the config:

```json
  "quests": {
    "breadShopping": {
      "title": "Bread Shopping",
      "description": "The helper cat asked you to buy bread for him.",
      "objectives": {
        "bread": {
          "description": "Buy bread for the helper cat."
        },
        "delivery": {
          "description": "Deliver the bread to the helper cat."
        }
      }
    }
  }
```

Scripts can interact with the quest system:

- Start Quest: `start_quest breadShopping`
- Start objective: `start_objective breadShopping delivery` (for hidden objectives)
- Complete objective: `complete_objective breadShopping bread`
- Complete quest: `complete_quest breadShopping`

Example demo:

```py
quest_demo:
  set_button shopButton true
  set_button parkButton false
  jump bread_quest

bread_quest:
  choice:
    talk helper idle "Can you get 2 pieces of bread for me?"
    "Yes":
      talk helper idle "Thanks, that's very nice!"
      talk helper idle "I'll be waiting for you at the park"
      jump bread_start
    "No":
      talk helper idle "Oh, okay"
      jump quest_demo

bread_start:
  start_quest breadShopping
  talk inner idle "Time to go to the shop to buy some bread then."
  set_screen map
  set_button shopButton true

shopButton:
  set_screen default
  "You visit the bread shop"
  talk shopkeeper idle "Hello, I'm a little baker selling bread!"
  set data.breadPrice 5
  jump shop_menu

parkButton:
  choice:
    talk helper idle "Ah, so do you have my bread?"
    "Yes!" $if this.items.bread.amount >= 2:
      talk helper idle "Thanks a lot!"
      complete_objective breadShopping delivery
      complete_quest breadShopping
    "No :(":
      talk helper idle "Oh okay"
  set_button parkButton false

shop_menu:
  choice:
    talk shopkeeper idle "So, do you want some bread?"
    "Buy bread (costs %{data.breadPrice})" $if this.stats.money.value >= this.data.breadPrice:
      add_item bread 1
      $if this.data.breadPrice === 5:
        add_stat money -5
      else:
        add_stat money -4
      jump map_update
    roll bread_haggle haggling 50 "Try to haggle for bread" hideAfterRoll:
      success "You explain that helper cat needs bread to feed his poor family":
        set data.breadPrice 4
        talk shopkeeper idle "I guess I can sell you bread for 4 coins"
        jump shop_menu
      failure "You try to pity trip the shopkeeper but he won't bulge":
        talk shopkeeper idle "The price is 5 coins, nothing less, nothing more."
        jump shop_menu
    "Exit":
      jump map_update

map_update:
  $if this.items.bread.amount >= 2:
    complete_objective breadShopping bread
    talk inner idle "I've got enough bread now, I'm going to go to the park."
    start_objective breadShopping delivery
    set_screen map
    set_button parkButton true
    set_button shopButton false
  else:
    talk inner idle "Hmm, I still need to buy more bread for helper cat."
    set_screen map
```

## 1.1.0

### Inventory system

There is a new inventory system.

Possible items can be defined in the config:

```json
  "items": {
    "bread": {
      "name": "Bread",
      "description": "A bread in the game.",
      "icon": "img/items/bread.png"
    }
  }
```

Then items can be added/removed in scripts:

```py
main:
  add_item bread 15
  remove_item bread 10
  $if this.items.bread.amount > 0:
    talk helper idle "You have %{items.bread.amount} bread"
  else:
    talk helper idle "You have no bread"
```

## 1.0.0

### State management rewrite

Rewrote the state management of the engine using [pinia](https://pinia.vuejs.org/) instead of Vuex for state management.

This allows the state to be more modular, easy to use and better compatible with Vue.js devtools for development of the engine, as pinia is now the official vue state management library.

The version has been bumped to 1.0.0 as it's a major rewrite. No bugs have been found when testing though.

### Save files breaking change

The save file format has changed, so saved games from previous versions would break. As no one is using this engine in production for now, this isn't an issue.

A new `version` string has been added to save files, so that in the future it will be possible to add migrations from older save files to newer ones if needed

## Updated Vue version

The Vue dependency version has been updated to the current latest (3.2.37)

## Vuex peer dependency deleted

Vuex is no longer a peer dependency, and has been replaced with pinia.

## 0.11.1

Fixed an error in how the narrat packaged is exported

## 0.11.0

### New Plugin system!

There is now a plugin system developers can use to add new functionality to narrat (more documentation soon). See the [narrat-bitsy](https://github.com/liana-p/narrat-engine-bitsy) plugin for an example.

## 0.10.0

### New XP System

- XP can be accumulated to level
- config option: `skillOptions.xpPerLevel`
- Use `add_xp` in script tso add xp, just like adding levels
- XP now displayed in skills menu

### Other improvements

- Improvements in skill checks display and difficulty
- Bug fixes to skill check edge cases
- Fixed a bug when not having a default title screen music
- Added a new `hideAfterRoll` option to skill checks to hide their choice after they've happened once
- Refactored skill check code for internal consistency between the different ways they're run
- New CSS variables and classes to customise the look of skill check prompts

## 0.9.4

- Fixed a bug when going back to the main menu and reloading the save without refreshing the page
- New `defaultMusic` option in audio options for title screen music

## 0.9.3

- Fixed a bug when loading a saved game

## 0.9.2

- Added new CSS variables and id/classes to make it easier to theme games

Current CSS variables list (Look at [main.css](https://github.com/liana-p/narrat-engine/blob/main/src/sass/main.css) in the narrat repo for up to date version):

```css
:root {
  --bg-color: #131720;
  --text-color: #d9e1f2;
  --primary: hsl(255, 30%, 55%);
  --focus: hsl(210, 90%, 50%);
  --secondary: #42b983;
  --border-color: hsla(0, 0%, 100%, 0.2);
  --light-1: hsl(210, 30%, 40%);
  --light-2: hsl(255, 30%, 50%);
  --light-background: linear-gradient(to right, var(--light-1), var(--light-2));
  --shadow-1: hsla(236, 50%, 50%, 0.3);
  --shadow-2: hsla(236, 50%, 50%, 0.4);
  --hud-background: rgba(0, 0, 0, 0.4);
  --hud-text-color: var(--text-color);
  --notifications-bg: darkslateblue;

  --skills-text-background: rgba(0, 0, 0, 0.5);
  --skills-text-color: var(--text-color);
  --skills-level-background: rgba(0, 0, 0, 0.5);
  --skills-level-color: orange;
}
```

Can be edited in a game's CSS file by overriding those variables in a more specific selector. For example:

```css
#app {
  --bg-color: white;
  --text-color: black;
}
```

would override the background and text colors of the game

## 0.9.1

- Fixed a file capitalisation error in 0.9.0

## 0.9.0

### Breaking Changes

New config options for skills:

- `icon`: Path to the image to use for the skill's icon (currently the skill widget is 200x300, but you can override the CSS if needed)
- `hidden`: Optional boolean to make the skill hidden until it is "obtained". A skill that is configured to be hidden will only start appearing in the skills menu once it's above level 0

Example skills config:

```json
  "skills": {
    "agility": {
      "name": "Agility",
      "description": "How good you are at moving around.",
      "startingLevel": 0,
      "icon": "img/skills/agility.jpg",
      "hidden": true
    },
    "logic": {
      "name": "Logic",
      "description": "How good you are at solving problems",
      "icon": "img/skills/logic.jpg",
      "startingLevel": 0
    }
  },
```

### Bug Fixes

- Music could play multiple times at once when replaying the same music

### New Features and improvements

#### Development and debug

- Improved debug menu with a **variable editor** to view and edit values in the `data` object.
- Also added a separate editor for the entire engine/app state. Can be useful for debugging complex bugs by exploring the state of the app.
- New **Quick label jump** feature to easily jump to specific labels for testing. Press **J** to open and type the name of a label then select a result with up/down arrows and press Enter
- New keyboard shortcut to open debug menu (**d**)
- Added a debug info panel on the main starting screen of the game with info on the shortcuts

#### Engine improvements

- Menu modal improved to be more compact with a cleaner design
- Added fade in and fade outs when changing music (configurable in config)
- **Improved the default UI** to be more pleasing to look at
- Added a **return to Main Menu** button to the main menu for resetting the game
- New **Skills Menu** allowing players to view their skills:
  - It only appears if the game has skills configured
  - It shows skill icons, name and current level on a grid
  - Clicking on a skill opens a skill page with more detailed info and the skill description
  - The skill menu button is next to the usual menu button

## 0.8.5

- Fixed a bug with `clear_dialog` that was disabling all interaction upon use

## 0.8.4

- Fixed many issues with save being broken (it didn't properly save the name of the last label the player was on, effectively restarting the game from scratch every time)
- Added new things to the save function so their state gets reloaded properly on game launch:
  - Current music now gets saved and restarts when reloading the game, if any is active
  - Stats (the ones in the HUD) now get saved
  - Current screen is also saved
- Removed many useless spammy `console.log` and added a `Logger` in the code so that most logs (outside of errors/important logs) will only appear in debug mode.

## 0.8.3

- Fixed bug where menu button would move up as more text gets added to the game

## 0.8.2

- Added css to hide scrollbars in the game UI
- Added a new Menu button with the options to quit and change volume
- Removed volume slider from the HUD and moved it to the new menu

## 0.8.1

- Fixed a bug in accessing values inside conditions caused by changed in 0.7.2

## 0.8.0

- Changed the `set` method to access things without caps (`data`, `skills`, `buttons` instead of `DATA`, `SKILLS`, `BUTTONS`) for consistency.
- Changed string interpolation to have more accessible objects, now values in `data` need to be accessed with `%{data.something}` instead of just `%{something}`
- Now possible to access skill levels in string interpolation with `%{skills.someSkill.level}`
- Improvements to how skill checks are printed to be less awkward

## 0.7.1

- Added `stop` and `pause` functions which work similarly to play for stopping or pausing audio.

## 0.6.5

- Audio and music options from the config now get passed to howler
- Renamed `path` to `src` in audio config (to be consistent with howler)

## 0.6.0

Added stats feature for tracking numbers and displaying them in the hud

Example config:

```
  "hudStats": {
    "money": {
      "icon": "img/ui/money.png",
      "name": "Money",
      "startingValue": 0,
      "minValue": 0
    },
    "energy": {
      "icon": "img/ui/energy.png",
      "name": "Energy",
      "startingValue": 10,
      "minValue": 0,
      "maxValue": 10
    }
  }
```

## 0.5.4

- Improved responsive layout and fixed some issues in it

New config keys required in the layout part of the config (to be documented):

```
  "layout": {
    "backgrounds": {
      "width": 880,
      "height": 720
    },
    "dialogBottomPadding": 70,
    "minTextWidth": 475,
    "mobileDialogHeightPercentage": 60,
    "verticalLayoutThreshold": 1000,
    "portraits": {
      "width": 100,
      "height": 100
    }
  },
```

## 0.4.0

Added responsive layout for mobile and small screens. Still in progress, but functionnal enough to be better than before so I'm releasing it.

## 0.3.4

- Improved string templating to work with deep nesting and also inside choice text

## 0.3.3

- Now detects indentation size and can support any indentation size

## 0.3.2

- Added a new `add_level` function for increasing the level of a skill. Example: `add_level someSkill 1` will increase the player's level in `someSkill` by 1
- Added a new `notify` function for displaying a notification toast that disappears after a few seconds (duration configurable in `config.json`). Example: `notify "Hello, this is a notification"`.

## 0.3.1

Added new config options for controlling how skill rolls are done and the display of their difficulty

## 0.3.0

Breaking changes around renaming data access from scripts

### New Add Command

New `add` command, works the same way as `set` but increments the value based on the existing value, ie. `set SKILLS.someSkill.level 2` will increment `someSkill.level` by 2.

### Skills

- Now possible to set the starting value of a skill (in the config)
- Now possible to edit a skill's value with `set SKILLS.someSkill.level 2` for example
- Skillcheck command renamed to roll (`if this.roll("someSkillCheck", "testSkill", 40);`)

### General

The `set` and `$if` command now refer to data in caps and have access to more data:

- `set SKILLS.someSkill.level [value]` Sets the value of a skill
- `set DATA.someData [value]` Sets a value in the data object (data is for any game-created variables)
- `$if this.SKILLCHECKS.someSkillCheck.passed` now available for checking if a skillcheck has already been passed

## 0.0.14

- Added the changelog (manually made for now)

## 0.0.13

- Added debug menu for jumping to labels (currently doesn't support production builds disabling it)
- Added saving and loading of the game (works by storing data, skills, skillchecks etc. When the game is reloaded, it is brought back at the last label visited)
- Fixed a bug where conditional choices would play the wrong result if a choice is removed due to a condition
- Made script loading and compilation happen during the initial loading, so everything is ready to play when pressing start game
- Skill checks now also save and load their data, so a failed check becomes impossible to choose, and a succeeded skill check can be skipped if shown again
