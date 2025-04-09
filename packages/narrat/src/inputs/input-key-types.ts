/* eslint-disable no-unused-vars */
export enum KeyboardKey {
  Arrow_Left = 'Arrow_Left',
  Arrow_Right = 'Arrow_Right',
  Arrow_Up = 'Arrow_Up',
  Arrow_Down = 'Arrow_Down',
  Enter = 'Enter',
  Escape = 'Escape',
  Space = 'Space',
  Backspace = 'Backspace',
  Key_A = 'Key_A',
  Key_B = 'Key_B',
  Key_C = 'Key_C',
  Key_D = 'Key_D',
  Key_E = 'Key_E',
  Key_F = 'Key_F',
  Key_G = 'Key_G',
  Key_H = 'Key_H',
  Key_I = 'Key_I',
  Key_J = 'Key_J',
  Key_K = 'Key_K',
  Key_L = 'Key_L',
  Key_M = 'Key_M',
  Key_N = 'Key_N',
  Key_O = 'Key_O',
  Key_P = 'Key_P',
  Key_Q = 'Key_Q',
  Key_R = 'Key_R',
  Key_S = 'Key_S',
  Key_T = 'Key_T',
  Key_U = 'Key_U',
  Key_V = 'Key_V',
  Key_W = 'Key_W',
  Key_X = 'Key_X',
  Key_Y = 'Key_Y',
  Key_Z = 'Key_Z',
}

export enum GamepadKey {
  Dpad_Up = 'Dpad_Up',
  Dpad_Down = 'Dpad_Down',
  Dpad_Left = 'Dpad_Left',
  Dpad_Right = 'Dpad_Right',
  Left_Thumbstick_Up = 'Left_Thumbstick_Up',
  Left_Thumbstick_Down = 'Left_Thumbstick_Down',
  Left_Thumbstick_Left = 'Left_Thumbstick_Left',
  Left_Thumbstick_Right = 'Left_Thumbstick_Right',
  Left_Thumbstick_Press = 'Left_Thumbstick_Press',
  Right_Thumbstick_Up = 'Right_Thumbstick_Up',
  Right_Thumbstick_Down = 'Right_Thumbstick_Down',
  Right_Thumbstick_Left = 'Right_Thumbstick_Left',
  Right_Thumbstick_Right = 'Right_Thumbstick_Right',
  Right_Thumbstick_Press = 'Right_Thumbstick_Press',
  FaceButton_Left = 'FaceButton_Left',
  FaceButton_Right = 'FaceButton_Right',
  FaceButton_Top = 'FaceButton_Top',
  FaceButton_Bottom = 'FaceButton_Bottom',
  Shoulder_Left = 'Shoulder_Left',
  Shoulder_Right = 'Shoulder_Right',
  Trigger_Button_Left = 'Trigger_Button_Left',
  Trigger_Button_Right = 'Trigger_Button_Right',
  Special_Left = 'Special_Left',
  Special_Right = 'Special_Right',
  Special_Third = 'Special_Third',
}

export enum GamepadAxis {
  Left_Thumbstick_X = 'Left_Thumbstick_X',
  Left_Thumbstick_Y = 'Left_Thumbstick_Y',
  Right_Thumbstick_X = 'Right_Thumbstick_X',
  Right_Thumbstick_Y = 'Right_Thumbstick_Y',
}

// Maps a gamepad axis to the gamepad buttons that can be triggered by the axis negative and positive values
export const gamepadAxisDirectionToGamepadKey: Record<
  GamepadAxis,
  [GamepadKey, GamepadKey]
> = {
  [GamepadAxis.Left_Thumbstick_X]: [
    GamepadKey.Left_Thumbstick_Left,
    GamepadKey.Left_Thumbstick_Right,
  ],
  [GamepadAxis.Left_Thumbstick_Y]: [
    GamepadKey.Left_Thumbstick_Up,
    GamepadKey.Left_Thumbstick_Down,
  ],
  [GamepadAxis.Right_Thumbstick_X]: [
    GamepadKey.Right_Thumbstick_Left,
    GamepadKey.Right_Thumbstick_Right,
  ],
  [GamepadAxis.Right_Thumbstick_Y]: [
    GamepadKey.Right_Thumbstick_Up,
    GamepadKey.Right_Thumbstick_Down,
  ],
};

export const gamepadIndexToGamepadButton: Record<number, GamepadKey> = {
  0: GamepadKey.FaceButton_Bottom,
  1: GamepadKey.FaceButton_Right,
  2: GamepadKey.FaceButton_Left,
  3: GamepadKey.FaceButton_Top,
  4: GamepadKey.Shoulder_Left,
  5: GamepadKey.Shoulder_Right,
  6: GamepadKey.Trigger_Button_Left,
  7: GamepadKey.Trigger_Button_Right,
  8: GamepadKey.Special_Left,
  9: GamepadKey.Special_Right,
  10: GamepadKey.Left_Thumbstick_Press,
  11: GamepadKey.Right_Thumbstick_Press,
  12: GamepadKey.Dpad_Up,
  13: GamepadKey.Dpad_Down,
  14: GamepadKey.Dpad_Left,
  15: GamepadKey.Dpad_Right,
  16: GamepadKey.Special_Third,
};

export const gamepadAxisIndexToGamepadAxis: Record<number, GamepadAxis> = {
  0: GamepadAxis.Left_Thumbstick_X,
  1: GamepadAxis.Left_Thumbstick_Y,
  2: GamepadAxis.Right_Thumbstick_X,
  3: GamepadAxis.Right_Thumbstick_Y,
};

export const gamepadButtonEnumToGamepadButtonNumber: Record<
  GamepadKey,
  number
> = Object.fromEntries(
  Object.entries(gamepadIndexToGamepadButton).map(([key, value]) => [
    value,
    parseInt(key),
  ]),
) as Record<GamepadKey, number>;

export const keyboardKeyStringToKeyboardKey: Record<string, KeyboardKey> = {
  ArrowLeft: KeyboardKey.Arrow_Left,
  ArrowRight: KeyboardKey.Arrow_Right,
  ArrowUp: KeyboardKey.Arrow_Up,
  ArrowDown: KeyboardKey.Arrow_Down,
  Enter: KeyboardKey.Enter,
  Escape: KeyboardKey.Escape,
  Space: KeyboardKey.Space,
  Backspace: KeyboardKey.Backspace,
  a: KeyboardKey.Key_A,
  b: KeyboardKey.Key_B,
  c: KeyboardKey.Key_C,
  d: KeyboardKey.Key_D,
  e: KeyboardKey.Key_E,
  f: KeyboardKey.Key_F,
  g: KeyboardKey.Key_G,
  h: KeyboardKey.Key_H,
  i: KeyboardKey.Key_I,
  j: KeyboardKey.Key_J,
  k: KeyboardKey.Key_K,
  l: KeyboardKey.Key_L,
  m: KeyboardKey.Key_M,
  n: KeyboardKey.Key_N,
  o: KeyboardKey.Key_O,
  p: KeyboardKey.Key_P,
  q: KeyboardKey.Key_Q,
  r: KeyboardKey.Key_R,
  s: KeyboardKey.Key_S,
  t: KeyboardKey.Key_T,
  u: KeyboardKey.Key_U,
  v: KeyboardKey.Key_V,
  w: KeyboardKey.Key_W,
  x: KeyboardKey.Key_X,
  y: KeyboardKey.Key_Y,
  z: KeyboardKey.Key_Z,
};

export const keyboardKeyEnumToKeyboardKeyString: Record<KeyboardKey, string> =
  Object.fromEntries(
    Object.entries(keyboardKeyStringToKeyboardKey).map(([key, value]) => [
      value,
      key,
    ]),
  ) as Record<KeyboardKey, string>;
