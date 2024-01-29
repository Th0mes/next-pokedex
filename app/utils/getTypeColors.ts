import { typeColors } from "../constants/typeColors";

export type TYPE_COLORS = keyof typeof typeColors;
export function getTypeColors(color: keyof typeof typeColors) {
  return typeColors[color];
}
