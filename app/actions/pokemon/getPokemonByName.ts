"use server";

import { type IApiError, apiErrorSchema } from "@/schemas/api/api";
import type { PokemonResults } from "@/schemas/api/pokeApi";
import type { IPokemonCards } from "@/schemas/pokemon/pokemonCard";

export async function getPokemonByName(
  searchTerm: number | string
): Promise<IPokemonCards | IApiError> {
  try {
    const data = await fetch(
      `${process.env.POKE_API_URL}/pokemon?limit=10000&offset=0`
    );

    if (!data.ok) {
      return {
        error: "Failed to fetch Pokémon list",
        status: data.status,
      };
    }

    const responseData = await data.json();
    const filteredData = responseData.results.filter((pokemon: any) =>
      pokemon.name.includes(searchTerm.toString().toLowerCase())
    );

    const pokemonResponses: PokemonResults = await Promise.all(
      filteredData.map((x: Record<string, any>) =>
        fetch(x.url).then((res) => res.json())
      )
    );

    const pokemon = pokemonResponses.map((el) => ({
      id: el.id,
      name: el.name,
      types: el.types.map(({ type }) => type.name),
      imageUrl: el.sprites.other["official-artwork"].front_default,
    }));

    return pokemon;
  } catch (error) {
    console.error(error);
    return apiErrorSchema.parse({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
