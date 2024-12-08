import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "./helpers";
import { Movie } from "@/type/types";

// 用於儲存重置函數的陣列
const resetters: (() => void)[] = [];

// 收藏狀態的初始值
const initialFavoritesState = {
  favorites: [],
};

// 定義 favorite slice 的介面
interface FavoriteSlice {
  favorites: Movie[];
  setFavorites: (favorites: Movie[]) => void;
}

// 創建 favorite slice 的狀態創建器
const createFavoritesSlice: StateCreator<FavoriteSlice> = (set) => {
  // 將重置函數推入 resetters 陣列中
  resetters.push(() => set(initialFavoritesState));
  return {
    ...initialFavoritesState,
    // 設置收藏電影列表的函數
    setFavorites: (favorites) => set((state) => ({ ...state, favorites })),
  };
};

// 使用 createSelectors 創建收藏 store，並使用 persist 進行持久化（存到 localStorage）
export const useFavoritesStore = createSelectors(
  create<FavoriteSlice>()(
    persist((...a) => ({ ...createFavoritesSlice(...a) }), {
      name: "favorite-storage",
      storage: createJSONStorage(() => localStorage),
    }),
  ),
);

// 重置收藏 store 的函數，會清除 localStorage 中的數據並執行所有重置函數
export const resetFavoritesStore = () => {
  localStorage.removeItem("favorite-storage");
  resetters.forEach((resetter) => resetter());
};
