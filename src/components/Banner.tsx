"use client";
import {
  getImageUrl,
  getMovieDetails,
  getOriginalImageUrl,
  getMovieCredits,
} from "@/api/movies";
import { MovieInfo } from "./Cards";
import Image from "next/image";
import { useState, useEffect } from "react";
const Banner = ({ movie_id }: { movie_id: string }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [backdrop, setBackdrop] = useState<string | null>(null);
  const [credits, setCredits] = useState<Credit | null>(null);

  useEffect(() => {
    const getMovie = async () => {
      const data = await getMovieDetails(movie_id);
      const credits = await getMovieCredits(movie_id);
      const cast = credits.cast.slice(0, 5).map((cast: Cast) => cast.name);
      const director = credits.crew.find(
        (crew: Crew) => crew.job === "Director",
      ).name;
      setMovie(data);
      setBackdrop(data.backdrop_path);
      setCredits({ cast, director });
    };
    getMovie();
  }, [movie_id]);

  return (
    movie &&
    backdrop && (
      <div className="w-full flex flex-col items-center justify-center overflow-clip relative md:pt-20 pt-16 bg-gradient-to-b from-[rgba(27,27,27,0.3)] to-black ">
        <MovieInfo
          title={movie?.title}
          description={movie?.overview}
          image={getImageUrl(movie?.poster_path, 500)}
          credits={credits}
          categories={movie?.genres}
          id={movie_id}
          release_date={movie?.release_date}
        />

        <Image
          src={getOriginalImageUrl(backdrop)}
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
