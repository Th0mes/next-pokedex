import { getPokemonById } from "@/actions/pokemon";
import { PokemonDetails } from "@/schemas/pokemon/pokemonDetails";
import { capitalizeFirstChar } from "@/utils/capitalizeFirstChar";
import { TYPE_COLORS, getTypeColors } from "@/utils/getTypeColors";
import Image from "next/image";
import Link from "next/link";

export default async function Pokemon({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const pokemon = (await getPokemonById(id)) as PokemonDetails;

  return (
    <main className="mx-auto mb-6 flex h-full w-full max-w-screen-2xl">
      <div className="mx-4 flex-1 flex-col rounded-md bg-neutral-300 p-4 2xl:mx-0">
        <div className="grid w-full grid-cols-1 justify-between gap-12 rounded-md p-4 lg:grid-cols-2">
          <div className="relative h-[300px] w-full rounded-md bg-neutral-100 ring-2 ring-neutral-700/40 lg:h-full">
            <Image
              className="object-contain"
              src={
                pokemon.imageUrl ||
                "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
              }
              alt="Pokemon image"
              loading="lazy"
              fill={true}
              sizes="100%"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-4xl font-bold">
              {capitalizeFirstChar(pokemon.name)}
            </h2>

            <div className="flex gap-3">
              {pokemon.types.map((t) => (
                <span
                  key={t}
                  className={`x-2 inline-flex items-center rounded-lg rounded-md px-8 py-1 text-sm font-medium
                text-gray-200 ${getTypeColors(t as TYPE_COLORS)}`}
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="text-xl">{pokemon.description}</p>

            <p className="text-lg">
              <b>Height:</b> {pokemon.height / 10} m
            </p>
            <p className="text-lg">
              <b>Weight:</b> {pokemon.weight / 10} kg
            </p>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(pokemon.stats).map(([k, v]) => (
                <div key={k} className="w-full rounded-md bg-neutral-100 p-4">
                  <h2 className="text-xl font-bold">{k}</h2>
                  <p className="text-lg">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 divide-y divide-black md:grid-cols-3 md:divide-x">
          <div className="p-4">
            <h2 className="text-2xl font-bold">Abilities</h2>
            {pokemon.abilities.map((a) => (
              <p key={a} className="font-semibold">
                {capitalizeFirstChar(a)}
              </p>
            ))}
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold">Evolutions</h2>
            <div className="flex gap-3">
              {pokemon.evolution.map((e) => (
                <Link key={e.id} href={`/pokemon/${e.id}`}>
                  <Image alt="" src={e.imageUrl} width={100} height={100} />
                </Link>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold">Held Items</h2>
            {pokemon.heldItems.map((e) => (
              <p key={e} className="font-semibold">
                {e}
              </p>
            ))}
            {pokemon.heldItems.length == 0 && (
              <p className="font-semibold">None</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
