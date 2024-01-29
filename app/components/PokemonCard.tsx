"use client";

import Image from "next/image";
import { formatId } from "../utils/formatId";
import { TYPE_COLORS, getTypeColors } from "../utils/getTypeColors";
import { type IPokemonCard } from "@/schemas/pokemon/pokemonCard";
import Link from "next/link";

export const PokemonCard = (data: IPokemonCard) => {
  return (
    <div className="flex h-80 flex-col space-y-2 rounded-md bg-neutral-300 p-4">
      <div className="relative h-full w-full">
        <Image
          className="object-contain"
          src={
            data.imageUrl ||
            "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
          }
          alt="Pokemon image"
          loading="lazy"
          fill={true}
          sizes="100%"
        />
      </div>
      <div className="space-y-2">
        <p className="font-bold text-neutral-700">{formatId(data.id)}</p>
        <h2 className="text-2xl">
          {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
        </h2>
        <div className="flex gap-3">
          {data.types.map((t) => (
            <span
              key={t}
              className={`inline-flex items-center rounded-md px-8 py-1 text-sm font-medium text-gray-200 ring-1
						ring-inset ring-gray-500/10 ${getTypeColors(t as TYPE_COLORS)}`}
            >
              {t}
            </span>
          ))}
        </div>
        <Link href={`/pokemon/${data.id}`}>
          <button
            disabled={data.id >= 899}
            className="my-2 w-full rounded-lg py-2 text-center ring-1 ring-neutral-600 transition-all hover:border-0 hover:bg-neutral-600 hover:text-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            See details
          </button>
        </Link>
      </div>
    </div>
  );
};
