"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { fetchMoviesData, getMovieCredits } from "@/api/movies";

import Carousel from "./Carousel";
import { CardSkeleton, CreditCard, MovieCard } from "@/components/Cards";
import { useRouter } from "next/navigation";
import { useFavoritesStore } from "@/store/FavoriteStore";
import LotteryWheel from "./LotteryWheel";
import { UseEmblaCarouselType } from "embla-carousel-react";
import { Credit, Movie } from "@/type/types";

export default function CarouselWrapper({
  type,
  movie_id,
}: {
  type: string;
  movie_id?: string;
}) {
  const [slides, setSlides] = useState([]);
  const [repeatSlides, setRepeatSlides] = useState<Movie[]>([]);
  const [emblaApi, setEmblaApi] = useState<UseEmblaCarouselType | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResultIndex, setSpinResultIndex] = useState<number | null>(null);
  const isFavorites = useMemo(() => type === "favorites", [type]);

  const router = useRouter();
  const title = useMemo(
    () => type.charAt(0).toUpperCase() + type.slice(1),
    [type],
  );
  const { favorites } = useFavoritesStore();
  const switchType = useCallback(
    async (type: string, movie_id?: string) => {
      switch (type) {
        case "credits":
          if (!movie_id) return [];
          const credits = await getMovieCredits(movie_id);
          return credits.cast;
        case "topRated":
          const topRated = await fetchMoviesData({ type: "topRated" });
          return topRated.results;
        case "trending":
          const trending = await fetchMoviesData({ type: "trending" });
          return trending.results;
        case "favorites":
          return favorites;
        default:
          return [];
      }
    },
    [favorites],
  );

  // 根據視窗寬度設置每個 carousel 的寬度
  const itemWidth = useMemo(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) return 160;
      return 192;
    }
    return 192; // Default value if window is not defined
  }, []);

  const handleViewMore = () => {
    const path = isFavorites ? "/favorites" : `/list/${type}`;
    router.push(path);
  };

  const isCredits = useMemo(() => type === "credits", [type]);

  // 根據視窗寬度設置重複 carousel 的數量
  const repeatItems = useMemo(() => {
    if (typeof window !== "undefined") {
      return Math.ceil(window.innerWidth / itemWidth);
    }
    return 1; // Default value if window is not defined
  }, [itemWidth]);

  // 根據視窗寬度設置重複 carousel 的數量
  useEffect(() => {
    if (slides.length === 0) return;
    setRepeatSlides(() => {
      const repeatTimes = Math.ceil(repeatItems / slides.length);
      const repeatedSlides = Array(repeatTimes).fill(slides).flat();
      return repeatedSlides;
    });
  }, [repeatItems, slides]);

  // 獲取 carousel data
  useEffect(() => {
    const callApi = async () => {
      const res = await switchType(type, movie_id);
      setSlides(res);
    };
    callApi();
  }, [type, favorites.length, switchType, movie_id]);

  // spinWheel 函數用於模擬旋轉輪盤的效果
  const spinWheel = useCallback(() => {
    // 如果 emblaApi 不存在，則直接返回，因為無法進行滾動操作
    if (!emblaApi) return;

    // 設置正在旋轉的狀態為 true，並將旋轉結果索引設置為 null
    setIsSpinning(true);
    setSpinResultIndex(null);

    // 獲取當前重複 carousel 的總數
    const totalSlides = repeatSlides.length;
    // 隨機選擇一個 carousel 作為最終停留的位置
    const randomSlide = Math.floor(Math.random() * totalSlides);
    // 設置總旋轉圈數
    const totalSpins = 5;
    // 計算總步數，這是為了確保輪盤旋轉多圈後停在隨機選擇的 carousel 上
    const totalSteps = totalSlides * totalSpins + randomSlide;

    // 初始化當前步數
    let currentStep = 0;
    // 設置每次旋轉的間隔時間（毫秒）
    const spinInterval = 50;

    // 定義 spin 函數，負責執行每一步的旋轉
    const spin = () => {
      // 如果當前步數小於總步數，則繼續旋轉
      if (currentStep < totalSteps) {
        // 使用 emblaApi scrollTo 滾動到當前步數對應的 carousel
        // @ts-expect-error UseEmblaCarouselType
        emblaApi.scrollTo(currentStep % totalSlides);
        // 增加當前步數
        currentStep++;
        // 設置下一次旋轉的定時器，沒有設定 delay 的話，會直接 scrollTo 最後一個步數
        setTimeout(spin, spinInterval);
      } else {
        // 當旋轉完成後，滾動到最終選擇的隨機 carousel
        // @ts-expect-error UseEmblaCarouselType
        emblaApi.scrollTo(randomSlide);
        // 設置旋轉狀態為 false，表示旋轉結束
        setIsSpinning(false);
        // 設置旋轉結果索引為最終停留的 carousel 索引
        setSpinResultIndex(currentStep % totalSlides);
      }
    };
    // 開始旋轉
    spin();
  }, [emblaApi, repeatSlides.length]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-4 px-4">
        <h2 className="text-3xl font-extrabold">{title}</h2>
        {!isCredits && (
          <button
            className="text-white px-4 py-1 rounded-full border-2 border-white"
            onClick={handleViewMore}
          >
            View More
          </button>
        )}
      </div>
      {isFavorites && favorites.length > 0 && (
        <LotteryWheel
          spinWheel={spinWheel}
          disabled={isSpinning || favorites.length < 10}
        />
      )}
      <Carousel
        options={{ loop: true, align: "center" }}
        // @ts-expect-error UseEmblaCarouselType
        getEmblaApi={isFavorites && setEmblaApi}
      >
        {!repeatSlides.length &&
          !isFavorites &&
          Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="pr-8">
              <CardSkeleton type={isCredits ? "credit" : "movie"} />
            </div>
          ))}
        {repeatSlides.map((slide: Movie | Credit, index: number) => (
          <div key={`${slide.id}-${index}`} className="pr-8">
            {isCredits ? (
              <CreditCard
                name={(slide as Credit).name}
                image={(slide as Credit).profile_path}
                character={(slide as Credit).character}
              />
            ) : (
              <MovieCard
                title={(slide as Movie).title}
                image={(slide as Movie).poster_path}
                id={(slide as Movie).id}
                className={`${index === spinResultIndex ? `${isFavorites && "scale-110"}` : `${isFavorites && "opacity-50"}`}`}
              />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
