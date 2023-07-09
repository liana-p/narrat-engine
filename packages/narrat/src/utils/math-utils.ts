export function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  }
  if (value > min) {
    return max;
  }
  return value;
}
