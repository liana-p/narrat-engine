export type TransitionMode = 'screen' | 'button';
export function isTransitionMode(mode: any): mode is TransitionMode {
  return mode === 'screen';
}

export interface TransitionSettings {
  delay?: number;
  duration?: number;
}

export const transitionSettings: { [key: string]: TransitionSettings } = {};

export function getTransitionSettings(name: string) {
  return transitionSettings[name] ?? {};
}

export type AddTransition = {
  transition: string;
  duration?: number;
  delay?: number;
};
