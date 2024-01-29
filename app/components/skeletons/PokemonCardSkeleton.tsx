import { formatId } from "@/utils/formatId";

export const PokemonCardSkeleton = () => (
  <div className="flex flex-col rounded-md bg-neutral-300 p-4">
    <div className="flex animate-pulse flex-col space-y-2">
      <div className="flex-1 rounded-md bg-neutral-500 py-16"></div>

      <div className="space-y-6">
        <p className="font-bold text-neutral-700">{formatId(0)}</p>
        <div className="h-2 rounded bg-neutral-500"></div>
        <div className="h-2 rounded bg-neutral-500"></div>
      </div>
    </div>
  </div>
);
