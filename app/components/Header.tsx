"use client";

import { useRouter, usePathname } from "next/navigation";
import { type ChangeEvent, useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [pokemon, setPokemon] = useState<string>("");
  const debouncedValue = useDebounce<string>(pokemon, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPokemon(event.target.value);
  };

  useEffect(() => {
    if (pokemon) {
      router.push(`?search=${debouncedValue}`);
    }

    if (!pokemon && pathname === "/") {
      router.push("/");
    }
  }, [debouncedValue]);

  return (
    <header className="mx-auto w-full max-w-screen-2xl px-4 2xl:px-0">
      <div
        className={`flex w-full ${pathname === "/" ? "flex-col" : "flex-row"} justify-between py-5 sm:flex-row ${pathname === "/" ? "sm:items-center" : "items-center"}`}
      >
        <div className="flex items-start gap-5 py-5">
          <span className="h-12 w-12 rounded-full bg-blue-600 ring-8 ring-neutral-200" />
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 rounded-full bg-red-600 ring-2 ring-neutral-800" />
            <span className="h-4 w-4 rounded-full bg-yellow-600 ring-2 ring-neutral-800" />
            <span className="h-4 w-4 rounded-full bg-green-600 ring-2 ring-neutral-800" />
          </div>
        </div>

        {pathname === "/" ? (
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Search pokemon by name"
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-80 sm:text-sm sm:leading-6"
          />
        ) : pathname.includes("/pokemon") ? (
          <Link href={"/"}>
            <button className="text-5xl">{"<-"}</button>
          </Link>
        ) : null}
      </div>
    </header>
  );
};
