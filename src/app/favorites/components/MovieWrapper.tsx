"use client";

import { MovieCard } from "@/components/Cards";
import OrderBy from "@/components/OrderBy";
import { useFavoritesStore } from "@/store/FavoriteStore";

export default function MovieWrapper() {
  const { favorites, setFavorites } = useFavoritesStore();
  return (
    <>
      <div className="flex justify-between items-center py-10">
        <button
          className="text-white bg-red hover:bg-red-hover transition-all duration-300 rounded-md px-4 py-2"
          onClick={() => setFavorites([])}
        >
          Clear
        </button>
        <OrderBy type="favorites" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </>
  );
}
