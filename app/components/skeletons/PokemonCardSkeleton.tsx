import { formatId } from "@/utils/formatId";

export const PokemonCardSkeleton = () => (
  <div className="flex flex-col bg-neutral-300 rounded-md p-4">
    <div className="animate-pulse flex flex-col space-y-2">
      <div className="rounded-md bg-neutral-500 flex-1 py-16"></div>

      <div className="space-y-6">
        <p className="text-neutral-700 font-bold">{formatId(0)}</p>
        <div className="h-2 bg-neutral-500 rounded"></div>
        <div className="h-2 bg-neutral-500 rounded"></div>
      </div>
    </div>
  </div>
);
