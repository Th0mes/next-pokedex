"use server";

import { type IApiError, apiErrorSchema } from "@/schemas/api/api";
import {
  type PokemonDetails,
  pokemonDetailsSchema,
} from "@/schemas/pokemon/pokemonDetails";
import { getPokemonByName } from ".";

export async function getPokemonById(
  id: number
): Promise<PokemonDetails | IApiError> {
  try {
    const pokemonResponse = await fetch(
      `${process.env.POKE_API_URL}/pokemon/${id}`
    );

    if (!pokemonResponse.ok) {
      return {
        error: "Failed to fetch Pokemon",
        status: pokemonResponse.status,
      };
    }

    const pokemon = await pokemonResponse.json();

    const pokemonSpecies = await fetch(
      `${process.env.POKE_API_URL}/pokemon-species/${id}`
    );

    if (!pokemonSpecies.ok) {
      return {
        error: "Failed to fetch Pokemon Species",
        status: pokemonSpecies.status,
      };
    }

    const species = await pokemonSpecies.json();

    const evolutionChain = await fetch(species.evolution_chain.url);

    if (!evolutionChain.ok) {
      return {
        error: "Failed to fetch Evolution Chain",
        status: evolutionChain.status,
      };
    }

    const { chain } = await evolutionChain.json();

    const getEvolution = (chain: any) => {
      const names = [] as any[];

      function traverse(node: any) {
        if (node?.species?.name) {
          names.push(node.species.name);
        }

        const nextNode = node?.evolves_to?.[0];
        if (nextNode) {
          traverse(nextNode);
        }
      }

      traverse(chain);

      return names;
    };

    const evolutionsNames = getEvolution(chain);

    const evolution = await Promise.all(
      evolutionsNames.map(async (evo) => {
        const pokemon: any = await getPokemonByName(evo);
        return {
          id: pokemon[0].id,
          imageUrl: pokemon[0].imageUrl,
        };
      })
    );

    const formattedData: PokemonDetails = pokemonDetailsSchema.parse({
      id: pokemon.id,
      name: pokemon.name,
      description: species.flavor_text_entries[0].flavor_text,
      height: pokemon.height,
      weight: pokemon.weight,
      base_experience: pokemon.base_experience,
      imageUrl: pokemon.sprites.other["official-artwork"].front_default,
      stats: {
        HP: pokemon.stats[0].base_stat,
        Attack: pokemon.stats[1].base_stat,
        Defense: pokemon.stats[2].base_stat,
        "Special Attack": pokemon.stats[3].base_stat,
        "Special Defense": pokemon.stats[4].base_stat,
        Speed: pokemon.stats[5].base_stat,
      },
      types: pokemon.types.map((type: any) => type.type.name),
      abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
      heldItems: pokemon.held_items.map((heldItem: any) => heldItem.item.name),
      evolution,
    });

    return formattedData;
  } catch (error) {
    console.error(error);
    return apiErrorSchema.parse({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
