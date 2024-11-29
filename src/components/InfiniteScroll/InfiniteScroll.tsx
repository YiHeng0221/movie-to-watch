"use client";

import { fetchMoviesData } from "@/api/movies";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import { useState, useEffect } from "react";
import { MovieCard } from "../Cards";

function InfiniteScroll({ type }: { type: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (page >= 1) {
        const res = await fetchMoviesData(type, null, page);
        setMovies((prevMovies) => [...prevMovies, ...res.results]);
        setTotalPages(res.total_pages);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page, type]);

  const loader = useIntersectionObserver(totalPages, isLoading, setPage, page);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies &&
          movies.map((result, index) => (
            <MovieCard
              key={`${result.id}-${index}`}
              image={result.poster_path}
              title={result.title}
              id={result.id}
              release_date={result.release_date}
            />
          ))}
      </div>
      {!isLoading && page < totalPages && <div ref={loader}>載入中...</div>}
    </div>
  );
}

export default InfiniteScroll;
