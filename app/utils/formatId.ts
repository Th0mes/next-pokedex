export function formatId(input: number): string {
  const formattedId = input.toString().padStart(4, "0");

  return `#${formattedId}`;
}
