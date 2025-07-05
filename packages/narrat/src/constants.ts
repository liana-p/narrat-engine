import { ScreenConfig } from './config/screens-config';
import { LogLevel } from './types/logging-types';

export const PRE_SIGNAL = '###_--_~=:;';
export const JUMP_SIGNAL = `###_--_~=:;_JUMP`;
export const RETURN_SIGNAL = `###_--_~=:;_RETURN`;
export const OK_SIGNAL = `###_--_~=:;_OK`;
export const STOP_SIGNAL = `###_--_~=:;_STOP`;
export type ReturnSignal =
  | typeof JUMP_SIGNAL
  | typeof RETURN_SIGNAL
  | typeof OK_SIGNAL
  | typeof STOP_SIGNAL;

export function isReturnSignal(s: string): s is ReturnSignal {
  return (
    s === JUMP_SIGNAL ||
    s === RETURN_SIGNAL ||
    s === OK_SIGNAL ||
    s === STOP_SIGNAL
  );
}
export const VERSION = import.meta.env.VITE_BUILD_VERSION;
export const BUILD_DATE = new Date(import.meta.env.VITE_BUILD_DATE);
export const PRODUCTION = import.meta.env.VITE_BUILD_MODE === 'production';
export const GIT_INFO = {
  branch: import.meta.env.VITE_GIT_BRANCH,
  commit: import.meta.env.VITE_GIT_COMMIT,
};
export const LOG_LEVEL = PRODUCTION ? LogLevel.WARN : LogLevel.DEBUG;

// Default values
export const DEFAULT_DIALOG_WIDTH = 400;
export const DEFAULT_TEXT_SPEED = 20;
export const MIN_DIALOG_TIME_ON_SCREEN = 750;
export const EMPTY_SCREEN = '@empty';
export const defaultScreenConfig: ScreenConfig = {
  background: EMPTY_SCREEN,
};
