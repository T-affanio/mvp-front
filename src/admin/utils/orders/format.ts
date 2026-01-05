export function formatOrderNumber(num: number) {
  return String(num).padStart(3, "0");
}
