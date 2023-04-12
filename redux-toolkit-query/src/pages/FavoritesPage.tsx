import React from "react";
import { useAppSelector } from "../hooks/redux";

export function FavoritesPage() {
  const { favotites } = useAppSelector((state) => state.github);

  if (favotites.length === 0) {
    return (
      <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
        <p className="text-center">No items</p>;
      </div>
    );
  }
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favotites.map((f) => (
          <li key={f} className="mb-2">
            <a href={f} target="_blank" rel="noreferrer">
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
