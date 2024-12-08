import {
  getImageUrl,
  getOriginalImageUrl,
  getMovieCredits,
  getMovieDetails,
  fetchMoviesData,
  getMovieTrailers,
} from "@/api/movies";
import { MovieInfo } from "../Cards";
import Image from "next/image";
import { use } from "react";
import { Credit, Movie } from "@/type/types";

type MovieCredits = {
  cast: string[];
  director: string[];
};

async function fetchCredits(movie: Movie): Promise<MovieCredits> {
  const credits = await getMovieCredits(movie.id);
  if (credits.error) {
    throw new Error(credits.message);
  }
  const cast = credits.cast.slice(0, 5).map((cast: Credit) => cast.name);
  const director = [
    credits.crew.find(
      (crew: { id: number; name: string; job: string }) =>
        crew.job === "Director",
    )?.name ?? "Unknown",
  ];
  return { cast, director };
}

async function getRandomMovie() {
  const res = await fetchMoviesData({ type: "trending", page: 1 });
  if (res.error) {
    throw new Error(res.message);
  }
  const randomIndex = Math.floor(Math.random() * 10);
  const response = res.results[randomIndex];
  return response;
}

async function fetchMovieDetails(movie_id: string) {
  const res = await getMovieDetails(movie_id);
  if (res.error) {
    throw new Error(res.message);
  }
  return res;
}

async function fetchMovieTrailers(movie_id: string) {
  const res = await getMovieTrailers(movie_id);
  if (res.error) {
    throw new Error(res.message);
  }
  return res;
}

const Banner = ({ movie_id }: { movie_id?: string }) => {
  const moviePromise = movie_id
    ? fetchMovieDetails(movie_id)
    : getRandomMovie();
  const creditsPromise = moviePromise.then((movie) => fetchCredits(movie));
  const trailersPromise = movie_id
    ? fetchMovieTrailers(movie_id)
    : Promise.resolve(null);

  const movie = use(moviePromise);
  const credits = use(creditsPromise);
  const trailers = use(trailersPromise);

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-clip relative md:pt-20 pt-16 bg-gradient-to-b from-[rgba(27,27,27,0.3)] to-black ">
      <MovieInfo
        title={movie.title ?? ""}
        description={movie.overview ?? ""}
        image={getImageUrl(movie.poster_path, 500) ?? ""}
        credits={credits}
        categories={movie.genres ?? []}
        id={movie.id}
        release_date={movie.release_date}
        videoKey={trailers?.results?.[0]?.key}
      />

      <Image
        src={getOriginalImageUrl(movie.backdrop_path)}
        alt="backdrop"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full -z-10"
      />
    </div>
  );
};

export default Banner;
