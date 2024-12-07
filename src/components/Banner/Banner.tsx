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
  const randomIndex = Math.floor(Math.random() * 10);
  console.log('randomIndex', randomIndex);
  const response = res.results[randomIndex];
  console.log('response', response);
  return response;
}

async function fetchMovieDetails(movie_id: string) {
  const res = await getMovieDetails(movie_id);
  return res;
}

async function fetchMovieTrailers(movie_id: string) {
  const res = await getMovieTrailers(movie_id);
  return res;
}

const Banner = ({ movie_id }: { movie_id?: string }) => {
  const moviePromise = movie_id
    ? fetchMovieDetails(movie_id)
    : getRandomMovie();
  const movie = use(moviePromise);
  const creditsPromise = fetchCredits(movie);
  const credits = use(creditsPromise);
  let trailers;
  if (movie_id) {
    const trailersPromise = fetchMovieTrailers(movie_id);
    trailers = use(trailersPromise);
  }

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
        videoKey={trailers ? trailers.results[0].key : ""}
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
