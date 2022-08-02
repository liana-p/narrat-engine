export function timeout(durationMs: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, durationMs);
  });
}
