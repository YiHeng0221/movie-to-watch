"use client";

import { fetchMoviesData } from "@/api/movies";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import { useState, useEffect } from "react";
import { MovieCard } from "../Cards";
import { Movie } from "@/type/types";

function InfiniteScroll({ type }: { type: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (page >= 1) {
        // 根據類型和頁數從 API 獲取電影數據
        const res = await fetchMoviesData({ type, page });
        // 將新獲取的電影數據添加到現有的電影數據中
        setMovies((prevMovies) => [...prevMovies, ...res.results]);
        // 設定總頁數
        setTotalPages(res.total_pages);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page, type]);

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

export default InfiniteScroll;
