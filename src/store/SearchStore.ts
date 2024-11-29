import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./helpers";
import type { StateCreator } from "zustand";

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

const resetters: (() => void)[] = [];

const initialSearchState: SearchSlice = {
  searchQuery: "",
  searchResults: [],
  totalPages: 0,
  isAfterSearch: false,
};

const createSearchSlice: StateCreator<SearchSlice> = (set) => {
  resetters.push(() => set(initialSearchState));
  return {
    ...initialSearchState,
    setSearchQuery: (query) =>
      set((state) => ({ ...state, searchQuery: query })),
    setSearchResults: (results) =>
      set((state) => ({ ...state, searchResults: results })),
    setTotalPages: (pages) => set((state) => ({ ...state, totalPages: pages })),
    setIsAfterSearch: (isAfterSearch) =>
      set((state) => ({ ...state, isAfterSearch })),
  };
};

export const useSearchStore = createSelectors(
  create<SearchStore>()(
    persist((...a) => ({
      ...createSearchSlice(...a),
    })),
  ),
);

export const resetSearchStore = () => {
  console.log("resetSearchStore");
  return resetters.forEach((resetter) => resetter());
};
