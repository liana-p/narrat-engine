export interface TransitionState extends AddTransition {
  oldScreen?: string | null;
  duration: number;
  resolve: () => void;
}
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

export function generateTransitionState(
  transition: AddTransition,
  oldScreen: string | null,
  resolve: () => void,
): TransitionState {
  const settings = getTransitionSettings(transition.transition);
  const duration = transition.duration ?? settings.duration ?? 500;
  const delay = transition.delay ?? settings.delay ?? 0;
  const transitionState = {
    ...transition,
    resolve,
    duration,
    delay,
    oldScreen,
  };
  return transitionState;
}

export type AddTransition = {
  transition: string;
  duration?: number;
  delay?: number;
};
