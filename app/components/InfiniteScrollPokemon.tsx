"use client";

import { useEffect, useState } from "react";

import { getPokemon, getPokemonById } from "@/actions/pokemon";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { PokemonCard } from ".";
import { type IPokemonCards } from "@/schemas/pokemon/pokemonCard";
import { PokemonCardSkeleton } from "./skeletons/PokemonCardSkeleton";

export const InfiniteScrollPokemon = ({
  initialData,
  search,
}: {
  initialData: any;
  search?: string;
}) => {
  const [pokemon, setPokemon] = useState<IPokemonCards>(initialData);
  const [offset, setOffset] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchMorePokemon() {
    try {
      setLoading(true);
      const newPokemon: any = await getPokemon(offset);

      setOffset(offset + 20);
      setPokemon([...pokemon, ...newPokemon]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchFilteredPokemon() {
    try {
      setLoading(true);
      const filteredPokemon = await getPokemonById(search as any);

      setPokemon(filteredPokemon as any);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useInfiniteScroll(fetchMorePokemon, loading);

  useEffect(() => {
    const fetchData = async () => {
      if (search && search !== "") {
        await fetchFilteredPokemon();
      } else {
        setOffset(20);
        setPokemon(initialData);
      }
    };

    fetchData();
  }, [search, initialData]);

  const observerTarget = useInfiniteScroll(fetchMorePokemon);

  return pokemon.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} {...p} />
      ))}

      {loading &&
        Array(8)
          .fill(null)
          .map((_, i) => <PokemonCardSkeleton key={i} />)}

      {!search ? <div ref={observerTarget} className="mb-1"></div> : null}
    </div>
  ) : (
    <span className="w-full bg-neutral-300 p-4 rounded">
      No pokemon found, sorry for that. Try searching for another pokemon!
    </span>
  );
};
