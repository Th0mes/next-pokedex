import { z } from "zod";

export type IPokemonCard = z.infer<typeof pokemonCardSchema>;
export const pokemonCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.string()),
  imageUrl: z.string(),
});

export type IPokemonCards = z.infer<typeof pokemonCardsSchema>;
export const pokemonCardsSchema = z.array(pokemonCardSchema);
