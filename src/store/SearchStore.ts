// 保存和管理使用者的搜尋查詢、搜尋結果、總頁數以及是否已經進行過搜尋的狀態。
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "./helpers";
import type { StateCreator } from "zustand";
import { Movie } from "@/type/types";

// 用於儲存重置函數的陣列
const resetters: (() => void)[] = [];

// 搜尋狀態的初始值
const initialSearchState = {
  searchQuery: "", // 搜尋查詢字串
  searchResults: [], // 搜尋結果的電影陣列
  totalPages: 0, // 搜尋結果的總頁數
  isAfterSearch: false, // 表示是否已經進行過搜尋的 Boolean
};

// 定義搜尋狀態的介面
interface SearchSlice {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Movie[];
  setSearchResults: (results: Movie[]) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  isAfterSearch: boolean;
  setIsAfterSearch: (isAfterSearch: boolean) => void;
}

const createSearchSlice: StateCreator<SearchSlice> = (set) => {
  // 將重置函數推入 resetters 陣列中
  resetters.push(() => set(initialSearchState));
  return {
    ...initialSearchState,
    // 設置搜尋查詢的函數
    setSearchQuery: (query) =>
      set((state) => ({ ...state, searchQuery: query })),
    // 設置搜尋結果的函數
    setSearchResults: (results) =>
      set((state) => ({
        ...state,
        searchResults: [...state.searchResults, ...results],
      })),
    // 設置總頁數的函數
    setTotalPages: (pages) => set((state) => ({ ...state, totalPages: pages })),
    // 設置是否已經進行過搜尋的函數
    setIsAfterSearch: (isAfterSearch) =>
      set((state) => ({ ...state, isAfterSearch })),
  };
};

// 使用 createSelectors 創建搜尋 store，並使用 persist 進行持久化（存到 localStorage）
export const useSearchStore = createSelectors(
  create<SearchSlice>()(
    persist(
      (...a) => ({
        ...createSearchSlice(...a),
      }),
      {
        name: "search-store",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

// 重置搜尋 store 的函數，會清除 localStorage 中的數據並執行所有重置函數
export const resetSearchStore = () => {
  localStorage.removeItem("search-store");
  return resetters.forEach((resetter) => resetter());
};
