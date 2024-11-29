"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { fetchMoviesData, getMovieCredits } from "@/api/movies";

import Carousel from "./Carousel";
import { CreditCard, MovieCard } from "@/components/Cards";
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
          const topRated = await fetchMoviesData("topRated");
          return topRated.results;
        case "trending":
          const trending = await fetchMoviesData("trending");
          return trending.results;
        case "favorites":
          return favorites;
        default:
          return [];
      }
    },
    [favorites],
  );

  const handleViewMore = () => {
    const path = isFavorites ? "/favorites" : `/list/${type}`;
    router.push(path);
  };

  const isCredits = useMemo(() => type === "credits", [type]);

  useEffect(() => {
    const callApi = async () => {
      const res = await switchType(type, movie_id);
      setSlides(res);
    };
    callApi();
  }, [type, favorites.length, switchType, movie_id]);

  const spinWheel = useCallback(() => {
    if (!emblaApi) return;
    setIsSpinning(true);
    setSpinResultIndex(null);

    const totalSlides = slides.length;
    const randomSlide = Math.floor(Math.random() * totalSlides);
    const totalSpins = 5;
    const totalSteps = totalSlides * totalSpins + randomSlide;

    let currentStep = 0;
    const spinInterval = 50;

    const spin = () => {
      if (currentStep < totalSteps) {
        // @ts-expect-error UseEmblaCarouselType
        emblaApi.scrollTo(currentStep % totalSlides);
        currentStep++;
        setTimeout(spin, spinInterval);
      } else {
        // @ts-expect-error UseEmblaCarouselType
        emblaApi.scrollTo(randomSlide);
        setIsSpinning(false);
        setSpinResultIndex(currentStep % totalSlides);
      }
    };

    spin();
  }, [emblaApi, slides]);

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
        <LotteryWheel spinWheel={spinWheel} disabled={isSpinning || favorites.length < 10} />
      )}
      <Carousel
        options={{ loop: true, align: "center" }}
        // @ts-expect-error UseEmblaCarouselType
        getEmblaApi={isFavorites && setEmblaApi}
      >
        {slides.map((slide: Movie | Credit, index: number) => (
          <div key={slide.id} className="pr-8">
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
