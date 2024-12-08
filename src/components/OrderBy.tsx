"use client";
import { useFavoritesStore } from "@/store/FavoriteStore";
import { useSearchStore } from "@/store/SearchStore";
import { Movie } from "@/type/types";
import { useCallback, useMemo, useState } from "react";

type OrderByOption = {
  label: string;
  value: string;
  function: (movies: Movie[]) => Movie[];
};

// 定義一個常數物件 ORDER_BY_OPTIONS，包含四個排序選項
const ORDER_BY_OPTIONS = {
  // 名稱降序排序選項
  NAME_DESCENDING: {
    label: "Name descending",
    value: "NAME_DESCENDING",
    function: (movies: Movie[]) =>
      movies.sort((a, b) => b.title.localeCompare(a.title)), // 進行名稱降序排列
  },
  // 名稱升序排序選項
  NAME_ASCENDING: {
    label: "Name ascending",
    value: "NAME_ASCENDING",
    function: (movies: Movie[]) =>
      movies.sort((a, b) => a.title.localeCompare(b.title)), // 進行名稱升序排列
  },
  // 發行日期降序排序選項
  RELEASE_DATE_DESCENDING: {
    label: "Release date descending",
    value: "RELEASE_DATE_DESCENDING",
    function: (movies: Movie[]) =>
      movies.sort((a, b) => b.release_date.localeCompare(a.release_date)), // 進行發行日期降序排列
  },
  // 發行日期升序排序選項
  RELEASE_DATE_ASCENDING: {
    label: "Release date ascending",
    value: "RELEASE_DATE_ASCENDING",
    function: (movies: Movie[]) =>
      movies.sort((a, b) => a.release_date.localeCompare(b.release_date)), // 進行發行日期升序排列
  },
};

const OrderBy = ({ type }: { type: "favorites" | "searchResults" }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { favorites, setFavorites } = useFavoritesStore();
  const { searchResults, setSearchResults } = useSearchStore();
  const [selectedOption, setSelectedOption] = useState<OrderByOption | null>(
    null,
  );

  const handleOrderBy = useCallback(
    (value: string) => {
      const selectedOption =
        ORDER_BY_OPTIONS[value as keyof typeof ORDER_BY_OPTIONS];
      setSelectedOption(selectedOption);
      if (type === "favorites") {
        if (!favorites) return;
        const sortedFavorites = selectedOption.function(favorites);
        setFavorites(sortedFavorites);
      } else {
        if (!searchResults) return;
        const sortedSearchResults = selectedOption.function(searchResults);
        setSearchResults(sortedSearchResults);
      }
    },
    [favorites, searchResults, setFavorites, setSearchResults, type],
  );

  const noResult = useMemo(() => {
    if (type === "favorites") {
      return favorites.length === 0;
    }
    return searchResults.length === 0;
  }, [favorites, searchResults, type]);

  return (
    !noResult && (
      <div className="relative">
        <button
          className="text-white bg-red hover:bg-red-hover focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {!selectedOption ? "Order by" : selectedOption.label}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {showDropdown && (
          <div className="z-10 absolute top-full bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
            <ul className="py-2 text-sm text-gray-700">
              {Object.values(ORDER_BY_OPTIONS).map((option) => (
                <li key={option.value}>
                  <div
                    className="block px-4 py-2 hover:bg-gray-600 
                    hover:text-white"
                    onClick={() => {
                      handleOrderBy(option.value);
                      setShowDropdown(false);
                    }}
                  >
                    {option.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default OrderBy;
