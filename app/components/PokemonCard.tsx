"use client";

import Image from "next/image";
import { formatId } from "../utils/formatId";
import { TYPE_COLORS, getTypeColors } from "../utils/getTypeColors";
import { type IPokemonCard } from "@/schemas/pokemon/pokemonCard";

export const PokemonCard = (data: IPokemonCard) => {
  return (
    <div className="flex flex-col h-64 bg-neutral-300 rounded-md p-4 space-y-2">
      <div className="w-full h-full relative">
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
        <p className="text-neutral-700 font-bold">{formatId(data.id)}</p>
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
      </div>
    </div>
  );
};
