"use client";

import { Search } from "../FontAwesomeIcons";
import { Dropdown } from ".";
import { useEffect, useState, useRef, useCallback } from "react";
import useDebounce from "@/hook/useDebounce";
import { fetchMoviesData } from "@/api/movies";
import { useSearchStore, resetSearchStore } from "@/store/SearchStore";
import { Movie } from "@/type/types";

export default function Input() {
  // 定義狀態變量options，用於存儲搜索結果選項
  const [options, setOptions] = useState<Movie[]>([]);
  // 定義狀態變量query，用於存儲當前的搜索查詢
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  // 使用自定義的 Debounce hook 來處理輸入，防止頻繁調用 API
  const debouncedInput = useDebounce(query, 1000);

  const { setSearchQuery, setSearchResults, setTotalPages, setIsAfterSearch } =
    useSearchStore();

  // 使用useRef來存儲 cache 的搜索結果，避免重複請求
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
    return results.slice(0, 5);
  }, []);

  // 更新狀態和 cache
  const updateStateAndCache = useCallback(
    (query: string, response: { results: Movie[]; total_pages: number }) => {
      // 取前 5 個搜尋結果
      const formattedOptions = formatOptions(response.results);
      // 更新狀態變量 options
      setOptions(formattedOptions);
      // 更新 cache，將當前搜索查詢的結果存儲到 cache 中
      cache.current[query] = {
        options: formattedOptions,
        results: response.results,
        total_pages: response.total_pages,
      };
    },
    [formatOptions],
  );

  // 獲取 cache 的搜索結果
  const getCachedResults = useCallback(() => {
    // 遍歷 cache 中的所有查詢，篩選出以 debouncedInput 開頭的查詢
    const cachedQueries = Object.keys(cache.current).filter((query) =>
      query.startsWith(debouncedInput),
    );
    // 如果沒有匹配的 cache 查詢，返回null
    if (cachedQueries.length === 0) return null;
    // 找到匹配的 cache 查詢中最長的一個
    const longestMatch = cachedQueries.reduce((a, b) =>
      a.length > b.length ? a : b,
    );
    // 返回最長匹配的 cache 結果
    return cache.current[longestMatch];
  }, [debouncedInput]);

  const fetchSearchResults = useCallback(
    async (query: string) => {
      const response = await fetchMoviesData({ type: "search", query });
      updateStateAndCache(query, response);
    },
    [updateStateAndCache],
  );

  // 按下 Search 按鈕
  const handleSearch = useCallback(async () => {
    resetSearchStore(); // 重置搜索狀態
    if (!cache.current[query]) {
      await fetchSearchResults(query); // 如果 cache 中沒有結果，則 call API
    }
    setIsAfterSearch(true); // 設置搜索後狀態
    setShowDropdown(false); // 隱藏下拉選單
    setSearchQuery(query); // 設置搜索查詢
    setSearchResults(cache.current[query].results); // 設置搜索結果
    setTotalPages(cache.current[query].total_pages); // 設置總頁數
  }, [
    query,
    setIsAfterSearch,
    setSearchQuery,
    setSearchResults,
    setTotalPages,
    fetchSearchResults,
  ]);

  // 處理輸入變更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAfterSearch(false); // 重置搜索後狀態
    setQuery(e.target.value); // 更新搜索查詢
    if (e.target.value && !showDropdown) setShowDropdown(true); // 如果有輸入且下拉選單未顯示，則顯示下拉選單
  };

  // 使用 useEffect 來監控 debouncedInput 的變化
  useEffect(() => {
    if (!debouncedInput) return;

    const cachedResults = getCachedResults(); // 獲取 cache 的結果

    if (cachedResults) {
      updateStateAndCache(debouncedInput, cachedResults); // 如果有 cache 結果，則更新狀態和 cache
    } else {
      fetchSearchResults(debouncedInput); // 否則 call API 獲取結果
    }
    return () => {
      cache.current = {}; // 清空 cache
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
        {showDropdown && (
          <div onClick={() => setShowDropdown(false)}>
            <Dropdown options={options} />
          </div>
        )}
      </div>
    </div>
  );
}
