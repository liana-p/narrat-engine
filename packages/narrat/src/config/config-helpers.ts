import deepmerge from 'deepmerge';
import { Config, ConfigKey } from './config-output';
import { transitionSettings } from '@/utils/transition';

function processScreenConfig(
  fullConfig: Config,
  screens: Config['screens'],
): Config['screens'] {
  for (const key in screens.screens) {
    const screen = screens.screens[key];
    if (screen.buttons) {
      for (const [index, button] of screen.buttons.entries()) {
        // If the button is a config object, add it to the buttons config, and also create its state
        if (typeof button === 'object') {
          fullConfig.buttons.buttons[button.id] = button;
          // Change the inline config to be a string again
          screen.buttons[index] = button.id;
        }
      }
    }
  }
  return screens;
}

function processCommonConfig(
  fullConfig: Config,
  common: Config['common'],
): Config['common'] {
  if (common.transitions) {
    for (const key in common.transitions) {
      if (!transitionSettings[key]) {
        transitionSettings[key] = common.transitions[key];
      } else {
        Object.assign(transitionSettings[key], common.transitions[key]);
      }
    }
  }
  return common;
}

function processConfigModule<Key extends keyof Config>(
  key: Key,
  fullConfig: Config,
  newValue: Config[Key],
): Config[Key] {
  switch (key) {
    case 'screens':
      return processScreenConfig(
        fullConfig,
        newValue as Config['screens'],
      ) as Config[Key];
    case 'common':
      return processCommonConfig(
        fullConfig,
        newValue as Config['common'],
      ) as Config[Key];
    default:
      return newValue;
  }
}

export function processConfigUpdate<Key extends ConfigKey>(
  config: Config,
  configKey: Key,
  newValue: any,
) {
  const oldValue = config[configKey];
  const overwriteMerge = (
    destinationArray: any,
    sourceArray: any,
    options: any,
  ) => sourceArray;
  if (newValue) {
    let mergedValue = deepmerge<Config[Key]>(oldValue, newValue, {
      arrayMerge: overwriteMerge,
    });
    mergedValue = processConfigModule(configKey, config, mergedValue);
    return mergedValue;
  }
}
