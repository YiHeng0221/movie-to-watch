"use client";

import { Search } from "../FontAwesomeIcons";
import { Dropdown } from ".";
import { useEffect, useState, useRef, useCallback } from "react";
import useDebounce from "@/hook/useDebounce";
import { fetchMoviesData } from "@/api/movies";
import { useSearchStore, resetSearchStore } from "@/store/SearchStore";
import { Movie } from "@/type/types";
export default function Input() {
  const [options, setOptions] = useState<
    {
      title: string;
      id: string;
      poster: string;
      release_date: string;
    }[]
  >([]);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedInput = useDebounce(query, 1000);

  const { setSearchQuery, setSearchResults, setTotalPages, setIsAfterSearch } =
    useSearchStore();
  const cache = useRef<
    Record<
      string,
      {
        options: { title: string; id: string }[];
        results: Movie[];
        total_pages: number;
      }
    >
  >({});

  const formatOptions = useCallback((results: Movie[]) => {
    return results.slice(0, 5).map((result) => ({
      title: result.title,
      id: result.id,
      poster: result.poster_path,
      release_date: result.release_date,
    }));
  }, []);

  const updateStateAndCache = useCallback(
    (query: string, response: { results: Movie[]; total_pages: number }) => {
      const formattedOptions = formatOptions(response.results);
      setOptions(formattedOptions);
      cache.current[query] = {
        options: formattedOptions,
        results: response.results,
        total_pages: response.total_pages,
      };
    },
    [formatOptions],
  );

  const getCachedResults = useCallback(() => {
    const cachedQueries = Object.keys(cache.current).filter((query) =>
      query.startsWith(debouncedInput),
    );
    if (cachedQueries.length === 0) return null;
    const longestMatch = cachedQueries.reduce((a, b) =>
      a.length > b.length ? a : b,
    );
    return cache.current[longestMatch];
  }, [debouncedInput]);

  const fetchSearchResults = useCallback(
    async (query: string) => {
      const response = await fetchMoviesData({ type: "search", query });
      updateStateAndCache(query, response);
    },
    [updateStateAndCache],
  );

  const handleSearch = useCallback(async () => {
    resetSearchStore()
    if (!cache.current[query]) {
      await fetchSearchResults(query);
    }
    setIsAfterSearch(true);
    setShowDropdown(false);
    setSearchQuery(query);
    setSearchResults(cache.current[query].results);
    setTotalPages(cache.current[query].total_pages);
  }, [
    query,
    setIsAfterSearch,
    setSearchQuery,
    setSearchResults,
    setTotalPages,
    fetchSearchResults,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAfterSearch(false);
    setQuery(e.target.value);
    if (e.target.value && !showDropdown) setShowDropdown(true);
  };

  useEffect(() => {
    if (!debouncedInput) return;

    const cachedResults = getCachedResults();

    if (cachedResults) {
      updateStateAndCache(debouncedInput, cachedResults);
    } else {
      fetchSearchResults(debouncedInput);
    }
    return () => {
      cache.current = {};
    };
  }, [
    debouncedInput,
    fetchSearchResults,
    getCachedResults,
    updateStateAndCache,
  ]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only"
      >
        Search
      </label>
      <div className="relative w-full md:w-1/2">
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center pointer-events-none">
          <Search size="xl" />
        </div>
        <button
          className="text-white absolute end-2.5 top-1/2 transform -translate-y-1/2 bg-red hover:bg-red-hover focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
          onClick={handleSearch}
        >
          Search
        </button>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-12 text-xl text-white rounded-lg bg-[#3B3B3B] focus:outline-none"
          placeholder="Search Movies..."
          required
          value={query}
          onChange={handleChange}
        />
        {/* click outside to close dropdown */}
        {showDropdown && (
          <div onClick={() => setShowDropdown(false)}>
            <Dropdown options={options} />
          </div>
        )}
      </div>
    </div>
  );
}
