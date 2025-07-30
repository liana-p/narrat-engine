export function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

export function keepDecimals(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function decimalClamp(
  value: number,
  min: number,
  max: number,
  decimals: number,
): number {
  const clampedValue = clamp(value, min, max);
  return keepDecimals(clampedValue, decimals);
}
