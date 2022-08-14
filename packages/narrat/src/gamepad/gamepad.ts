const gamepads: { [key: string]: Gamepad } = {};

function gamepadHandler(event: GamepadEvent, connecting: boolean) {
  const gamepad = event.gamepad;
  // Note:
  // gamepad === navigator.getGamepads()[gamepad.index]

  if (connecting) {
    gamepads[gamepad.index] = gamepad;
    console.log(
      'Gamepad connected at index %d: %s. %d buttons, %d axes.',
      gamepad.index,
      gamepad.id,
      gamepad.buttons.length,
      gamepad.axes.length,
    );
  } else {
    delete gamepads[gamepad.index];
    console.log(
      'Gamepad disconnected from index %d: %s',
      gamepad.index,
      gamepad.id,
    );
  }
}

window.addEventListener(
  'gamepadconnected',
  (e) => {
    gamepadHandler(e, true);
  },
  false,
);
window.addEventListener(
  'gamepaddisconnected',
  (e) => {
    gamepadHandler(e, false);
  },
  false,
);

export function getGamepad(): Gamepad | null {
  const gamepadsArray = Object.values(gamepads);
  if (gamepadsArray.length > 0) {
    return gamepadsArray[0];
  }
  return null;
}
