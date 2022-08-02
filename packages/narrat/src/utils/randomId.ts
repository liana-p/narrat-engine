export function randomId() {
  return `${Date.now()}-${Math.floor(
    Math.random() * 100000000000,
  )}-${Math.floor(Math.random() * 100000000000)}`;
}
