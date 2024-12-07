import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "./helpers";
import type { StateCreator } from "zustand";
import { Movie } from "@/type/types";

const resetters: (() => void)[] = [];

const initialSearchState = {
  searchQuery: "",
  searchResults: [],
  totalPages: 0,
  isAfterSearch: false,
};

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
  resetters.push(() => set(initialSearchState));
  return {
    ...initialSearchState,
    setSearchQuery: (query) =>
      set((state) => ({ ...state, searchQuery: query })),
    setSearchResults: (results) =>
      set((state) => ({
        ...state,
        searchResults: [...state.searchResults, ...results],
      })),
    setTotalPages: (pages) => set((state) => ({ ...state, totalPages: pages })),
    setIsAfterSearch: (isAfterSearch) =>
      set((state) => ({ ...state, isAfterSearch })),
  };
};

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

export const resetSearchStore = () => {
  return resetters.forEach((resetter) => resetter());
};
