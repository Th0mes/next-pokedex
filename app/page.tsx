import { Suspense } from "react";
import { getPokemon } from "./actions/pokemon/getPokemon";
import { Header, InfiniteScrollPokemon } from "./components";
import { PokemonCardSkeleton } from "./components/skeletons/PokemonCardSkeleton";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const pokemon = await getPokemon();

  return (
    <main className="flex min-h-screen flex-col mx-auto px-4 xl:px-0 max-w-screen-xl">
      <Suspense
        fallback={Array(4)
          .fill(null)
          .map((_, i) => (
            <PokemonCardSkeleton key={i} />
          ))}
      >
        <InfiniteScrollPokemon
          initialData={pokemon}
          search={searchParams.search}
        />
      </Suspense>
    </main>
  );
}
