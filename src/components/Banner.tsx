"use client";
import {
  getImageUrl,
  getOriginalImageUrl,
  getMovieCredits,
} from "@/api/movies";
import { MovieInfo } from "./Cards";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Credit, Movie } from "@/type/types";

type MovieCredits = {
  cast: string[];
  director: string[];
};

const Banner = ({ movie }: { movie: Movie }) => {
  const [credits, setCredits] = useState<MovieCredits | null>(null);

  useEffect(() => {
    if (!movie) return;
    const getMovie = async () => {
      const credits = await getMovieCredits(movie.id);
      const cast = credits.cast.slice(0, 5).map((cast: Credit) => cast.name);
      const director = [credits.crew.find(
        (crew: { id: number; name: string; job: string }) =>
          crew.job === "Director"
      ).name];
      setCredits({ cast, director });
    };
    getMovie();
  }, [movie]);

  return (
    credits && (
      <div className="w-full flex flex-col items-center justify-center overflow-clip relative md:pt-20 pt-16 bg-gradient-to-b from-[rgba(27,27,27,0.3)] to-black ">
        <MovieInfo
          title={movie?.title ?? ''}
          description={movie?.overview ?? ''}
          image={getImageUrl(movie?.poster_path, 500) ?? '' }
          credits={credits}
          categories={movie?.genres ?? []}
          id={movie.id}
          release_date={movie?.release_date}
        />

        <Image
          src={getOriginalImageUrl(movie.backdrop_path)}
          alt="backdrop"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 w-full -z-10"
        />
      </div>
    )
  );
};

export default Banner;
