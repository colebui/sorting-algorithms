/** Generate a random array of unique integers */
export function generateRandomArray(size: number, min = 5, max = 100): number[] {
  const values = new Set<number>();
  while (values.size < size) {
    values.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return [...values];
}

/** Parse a comma-separated string into an array of integers */
export function parseCustomArray(input: string): number[] | null {
  const parts = input.split(',').map((s) => s.trim());
  const nums = parts.map(Number);
  if (nums.some((n) => isNaN(n) || !Number.isInteger(n))) return null;
  if (nums.length < 2 || nums.length > 30) return null;
  return nums;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
