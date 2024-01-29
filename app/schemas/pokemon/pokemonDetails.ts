import { z } from "zod";

export type PokemonDetails = z.infer<typeof pokemonDetailsSchema>;
export const pokemonDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  height: z.number(),
  weight: z.number(),
  base_experience: z.number().optional(),
  imageUrl: z.string(),
  stats: z.object({
    HP: z.number(),
    Attack: z.number(),
    Defense: z.number(),
    "Special Attack": z.number(),
    "Special Defense": z.number(),
    Speed: z.number(),
  }),
  types: z.array(z.string()),
  abilities: z.array(z.string()),
  heldItems: z.array(z.string()),
  evolution: z.array(
    z.object({
      id: z.number(),
      imageUrl: z.string(),
    })
  ),
});
