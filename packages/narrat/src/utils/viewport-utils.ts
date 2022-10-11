import { buttonsConfig } from '@/config';
import { ButtonConfig } from '@/config/buttons-config';
import { useMain } from '@/lib';
import { ScreenObjectState } from '@/stores/screen-objects-store';

export function isViewportElementClickable(
  conf: ButtonConfig | ScreenObjectState,
) {
  if (!useMain().inScript) {
    return true;
  }
  const clickableByDefault = buttonsConfig().clickableDuringScriptsByDefault;
  if (clickableByDefault) {
    if (conf.scriptClickable === false) {
      return false;
    }
    return true;
  }
  if (!clickableByDefault) {
    if (conf.scriptClickable === true) {
      return true;
    }
    return false;
  }
}
