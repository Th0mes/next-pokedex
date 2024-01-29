import { Suspense } from "react";
import { getPokemon } from "./actions/pokemon/getPokemon";
import { InfiniteScrollPokemon } from "./components";
import { PokemonCardSkeleton } from "./components/skeletons/PokemonCardSkeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const pokemon = await getPokemon();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col px-4 xl:px-0">
      <InfiniteScrollPokemon
        initialData={pokemon}
        search={searchParams.search}
      />
    </main>
  );
}
