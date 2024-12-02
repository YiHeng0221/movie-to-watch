"use client";
import Image from "next/image";
import { BookMark, CircleDown } from "../FontAwesomeIcons";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useCallback, useMemo } from "react";
import { useFavoritesStore } from "@/store/FavoriteStore";
import { Genre } from "@/type/types";
import Skeleton from "../Skeleton";
const MovieCard = ({
  title,
  image,
  description,
  credits: { cast, director },
  categories,
  id,
  release_date,
}: {
  title: string;
  image: string;
  description: string;
  credits: { cast: string[]; director: string[] };
  categories: Genre[];
  id: string;
  release_date: string;
}) => {
  const isMoviePage = usePathname().startsWith("/movie/");
  const { favorites, setFavorites } = useFavoritesStore();
  const alreadyInFavorites = useMemo(
    () => favorites.some((movie) => movie.id === id),
    [favorites, id],
  );
  const titleSize = title.length > 20 ? "" : "md:text-6xl";
  const router = useRouter();

  const onClickBookMark = useCallback(() => {
    if (alreadyInFavorites) {
      setFavorites(favorites.filter((movie) => movie.id !== id));
    } else {
      setFavorites([
        ...favorites,
        { id, title, poster_path: image, release_date },
      ]);
    }
  }, [
    alreadyInFavorites,
    setFavorites,
    favorites,
    id,
    title,
    image,
    release_date,
  ]);
  const handleRoute = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="relative flex flex-col items-center bg-[#909090] bg-opacity-30 backdrop-blur-md rounded-lg shadow max-w-sm md:flex-row md:max-w-3xl my-10 p-4">
      <Suspense
        fallback={
          <Skeleton style="h-full max-h-96 object-cover w-auto" type="image" />
        }
      >
        <Image
          className="h-full max-h-96 object-cover w-auto"
          src={image}
          alt=""
          width={1000}
          height={1000}
        />
      </Suspense>
      <div className="flex flex-col justify-between px-4 leading-normal gap-2">
        <Suspense
          fallback={
            <Skeleton
              style="text-3xl mb-2 font-extrabold tracking-tight text-white mt-4 md:mt-0"
              type="text"
            />
          }
        >
          <h5
            className={`text-3xl mb-2 ${titleSize} font-extrabold tracking-tight text-white mt-4 md:mt-0`}
          >
            {title}
          </h5>
        </Suspense>
        <Suspense
          fallback={<Skeleton style="flex flex-row gap-2" type="text" />}
        >
          <div className="flex flex-row gap-2">
            {categories.map((category) => (
              <span
                key={category.id}
                className="text-xs font-extrabold me-2 px-2.5 py-0.5 rounded-full border-2 border-white "
              >
                {category.name}
              </span>
            ))}
          </div>
        </Suspense>
        <Suspense
          fallback={
            <Skeleton style="text-white text-xl font-extrabold" type="text" />
          }
        >
          <h5 className="text-white text-xl font-extrabold">{director}</h5>
        </Suspense>
        <Suspense
          fallback={<Skeleton style="text-white text-xl" type="text" />}
        >
          <h5 className="text-white text-xl">{cast.join(", ")}</h5>
        </Suspense>
        <p className="mb-3 font-normal text-white line-clamp-3 md:line-clamp-none">
          {description}
        </p>
        <div className="icon flex flex-row gap-2 justify-end">
          {isMoviePage ? (
            <div className="flex flex-row gap-4">
              <BookMark
                filled={favorites.some((movie) => movie.id === id)}
                size="2xl"
                onClick={onClickBookMark}
              />
            </div>
          ) : (
            <CircleDown size="2xl" onClick={handleRoute} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
