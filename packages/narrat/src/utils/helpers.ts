export function aspectRatioFit(
  screenWidth: number,
  screenHeight: number,
  gameWidth: number,
  gameHeight: number,
) {
  const widthRatio = screenWidth / gameWidth;
  const heightRatio = screenHeight / gameHeight;
  const bestRatio = Math.min(widthRatio, heightRatio);
  return bestRatio;
}

export function screenToCanvas(
  x: number,
  y: number,
  element: HTMLCanvasElement,
) {
  const rect = element.getBoundingClientRect();
  const ratio = element.width / rect.width;
  const canvasX = x - rect.x;
  const canvasY = y - rect.y;
  const scaledX = canvasX * ratio;
  const scaledY = canvasY * ratio;
  return {
    x: scaledX,
    y: scaledY,
  };
}

export function aabb(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
) {
  return !(ax + aw < bx || ay + ah < by || ax > bx + bw || ay > by + bh);
}
