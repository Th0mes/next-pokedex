"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export const Header = () => {
  const router = useRouter();

  const [pokemon, setPokemon] = useState<string>("");
  const debouncedValue = useDebounce<string>(pokemon, 700);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPokemon(event.target.value);
  };

  useEffect(() => {
    router.push(`?search=${debouncedValue}`);
  }, [debouncedValue]);

  return (
    <div className="flex justify-between sm:items-center flex-col sm:flex-row py-5 w-full">
      <div className="flex items-start gap-5 py-5">
        <span className="w-12 h-12 rounded-full ring-8 ring-neutral-200 bg-blue-600" />
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-red-600 ring-2 ring-neutral-800" />
          <span className="w-4 h-4 rounded-full bg-yellow-600 ring-2 ring-neutral-800" />
          <span className="w-4 h-4 rounded-full bg-green-600 ring-2 ring-neutral-800" />
        </div>
      </div>
      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Search pokemon by name"
          onChange={handleChange}
          className="block w-full sm:w-80 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};
