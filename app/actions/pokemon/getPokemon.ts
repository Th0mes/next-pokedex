"use server";

import {
  pokemonCardsSchema,
  type IPokemonCards,
} from "@/schemas/pokemon/pokemonCard";
import type { PokemonResults, PokeApiResponse } from "@/schemas/api/pokeApi";
import { type IApiError, apiErrorSchema } from "@/schemas/api/api";

export async function getPokemon(
  offset: number = 0,
  limit: number = 20
): Promise<IPokemonCards | IApiError> {
  try {
    const res = await fetch(
      `${process.env.POKE_API_URL}/pokemon?offset=${offset}&limit=${limit}`
    );

    if (!res.ok) {
      return apiErrorSchema.parse({
        error: "Failed to fetch Pokémon list",
        status: res.status,
      });
    }

    const { results } = (await res.json()) as PokeApiResponse;

    const pokemonResponses = (await Promise.all(
      results.map(async (p) => {
        const res = await fetch(p.url);
        if (!res.ok) {
          return apiErrorSchema.parse({
            error: `Failed to fetch ${p.name}`,
            status: res.status,
          });
        }
        return res.json();
      })
    )) as PokemonResults;

    const formattedPokemonCards = pokemonResponses.map((el) => ({
      id: el.id,
      name: el.name,
      types: el.types.map(({ type }) => type.name),
      imageUrl: el.sprites.other["official-artwork"].front_default,
    }));

    const pokemonCards: IPokemonCards = pokemonCardsSchema.parse(
      formattedPokemonCards
    );

    return pokemonCards;
  } catch (error) {
    console.error("An error occurred:", error);
    return apiErrorSchema.parse({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
