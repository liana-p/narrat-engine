export async function wait(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds));
}
