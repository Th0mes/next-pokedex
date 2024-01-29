import { z } from "zod";

export type PokemonResults = z.infer<typeof pokemonResultsSchema>;
export const pokemonResultsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    url: z.string(),
    sprites: z.object({
      other: z.object({
        "official-artwork": z.object({
          front_default: z.string(),
        }),
      }),
    }),
    types: z.array(
      z.object({
        slot: z.number(),
        type: z.object({
          name: z.string(),
          url: z.string(),
        }),
      })
    ),
  })
);

export type PokeApiResponse = z.infer<typeof pokeApiResponseSchema>;
export const pokeApiResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: pokemonResultsSchema,
});
