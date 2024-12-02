"use client";

import { useSearchStore } from "@/store/SearchStore";
import { useState, useEffect } from "react";
import { MovieCard } from "../Cards";
import { fetchMoviesData } from "@/api/movies";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import { Movie } from "@/type/types";

function SearchPage() {
  const [page, setPage] = useState<number>(1);
  const {
    searchQuery,
    searchResults: movies,
    setSearchResults: setMovies,
    totalPages,
  } = useSearchStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (page > 1) {
        const res = await fetchMoviesData({ type: "search", query: searchQuery, page });
        const newMovies = [...movies, ...res.results];
        setMovies(newMovies);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [movies, page, searchQuery, setMovies]);

  const loader = useIntersectionObserver(totalPages, isLoading, setPage, page);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies &&
          movies.map((result: Movie, index: number) => (
            <MovieCard
              key={`${result.id}-${index}`}
              image={result.poster_path}
              title={result.title}
              id={result.id}
            />
          ))}
      </div>
      {!isLoading && page < totalPages && <div ref={loader}>載入中...</div>}
    </div>
  );
}

export default SearchPage;
