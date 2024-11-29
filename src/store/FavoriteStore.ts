import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "./helpers";

interface FavoriteSlice {
  favorites: Movie[];
  setFavorites: (favorites: Movie[]) => void;
}

const resetters: (() => void)[] = [];

const initialFavoritesState: FavoriteSlice = {
  favorites: [],
};

const createFavoritesSlice: StateCreator<FavoriteSlice> = (set) => {
  resetters.push(() => set(initialFavoritesState));
  return {
    ...initialFavoritesState,
    setFavorites: (favorites) => set((state) => ({ ...state, favorites })),
  };
};

export const useFavoritesStore = createSelectors(
  create<FavoriteSlice>()(
    persist((...a) => ({ ...createFavoritesSlice(...a) })),
  ),
  {
    name: "Favorite-storage",
    storage: createJSONStorage(() => localStorage),
  },
);

export const resetFavoritesStore = () => {
  localStorage.removeItem("Favorite-storage");
  resetters.forEach((resetter) => resetter());
};
