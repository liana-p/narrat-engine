import { getButtonConfig } from '@/config';
import { ScreenObjectState } from '@/stores/screen-objects-store';
import { isViewportElementClickable } from './viewport-utils';
import { useScreens } from '@/stores/screens-store';

export interface RenderingState {
  selected: boolean;
  clickable: boolean;
  viewportClickable: boolean;
  transitioning: boolean;
  greyed?: boolean;
  hidden?: boolean;
  cssClass?: string;
}
export function getCSSClassForObject(state: RenderingState) {
  const css: Record<string, boolean> = {};
  if (state.selected) {
    css.selected = true;
  }
  if (state.clickable && state.viewportClickable && !state.transitioning) {
    css.interactable = true;
  }
  if (!state.clickable || !state.viewportClickable) {
    css['nrt-disabled'] = true;
  }
  if (state.transitioning) {
    css.transitioning = true;
  }
  if (state.greyed) {
    css.greyed = true;
  }
  if (state.hidden) {
    css.hidden = true;
  }
  if (state.cssClass) {
    css[state.cssClass] = true;
  }
  return css;
}

export function getRenderingStateForScreenObject(
  state: ScreenObjectState,
  selected: boolean,
  transitioning: boolean,
): RenderingState {
  return {
    selected,
    clickable: state.onClick !== undefined,
    viewportClickable: isViewportElementClickable(state)!,
    transitioning,
    greyed: false,
    hidden: false,
    cssClass: state.cssClass,
  };
}

export function getRenderingStateForButton(
  button: string,
  selected: boolean,
  transitioning: boolean,
): RenderingState {
  const buttonConfig = getButtonConfig(button);
  const state = useScreens().getButtonState(button);
  return {
    selected,
    clickable: useScreens().isButtonInteractible(button),
    viewportClickable: isViewportElementClickable(buttonConfig)!,
    transitioning,
    greyed: state === 'greyed',
    hidden: state === 'hidden' || state === false,
    cssClass: buttonConfig.cssClass,
  };
}

export function getCSSClassForButton(
  button: string,
  selected: boolean,
  transitioning: boolean,
) {
  return getCSSClassForObject(
    getRenderingStateForButton(button, selected, transitioning),
  );
}
export function getCSSClassForScreenObject(
  state: ScreenObjectState,
  selected: boolean,
  transitioning: boolean,
) {
  return getCSSClassForObject(
    getRenderingStateForScreenObject(state, selected, transitioning),
  );
}
