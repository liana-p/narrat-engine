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

// Default values
export const DEFAULT_DIALOG_WIDTH = 400;
export const DEFAULT_TEXT_SPEED = 20;
