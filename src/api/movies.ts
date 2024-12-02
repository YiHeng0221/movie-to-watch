// https://developers.themoviedb.org/3/getting-started/introduction

import { FetchMoviesDataParams } from "@/type/types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const baseUrl = "https://api.themoviedb.org/3";

export const fetchMoviesData = async ({
  type,
  query = "",
  page = 1,
}: FetchMoviesDataParams) => {
  try {
    let url = "";

    switch (type) {
      case "popular":
        url = `${baseUrl}/movie/popular?api_key=${API_KEY}&page=${page}`;
        break;
      case "topRated":
        url = `${baseUrl}/movie/top_rated?api_key=${API_KEY}&page=${page}`;
        break;
      case "trending":
        url = `${baseUrl}/trending/movie/day?api_key=${API_KEY}&page=${page}`;
        break;
      case "search":
        url = `${baseUrl}/search/movie?query=${query}&page=${page}&api_key=${API_KEY}`;
        break;
      default:
        throw new Error("Invalid movie type");
    }

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching movies data:", error);
    return null;
  }
};

// movie details check
export const getMovieDetails = async (movieId: string) => {
  const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

// movie credits check
// cast, crew
// crew.job === "Director"
export const getMovieCredits = async (movieId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/credits?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return null;
  }
};

// movie images check backdrop, logo, poster
export const getMovieImages = async (movieId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/images?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie images:", error);
    return null;
  }
};

// movie trailers
// https://www.youtube.com/watch?v={data.results[0].key}
export const getMovieTrailers = async (movieId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/videos?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    return null;
  }
};

// movie comments check
export const getMovieComments = async (movieId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/reviews?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie comments:", error);
    return null;
  }
};

// movie similar check
export const getMovieSimilar = async (movieId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/similar?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie similar:", error);
    return null;
  }
};

// movie genres
export const getMovieGenres = async () => {
  try {
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return null;
  }
};

// movie genre check
export const getMovieGenre = async (genreId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie genre:", error);
    return null;
  }
};

// image url
export const getOriginalImageUrl = (path: string) => {
  return `https://image.tmdb.org/t/p/original/${path}`;
};

export const getImageUrl = (path: string, size: number) => {
  return `https://image.tmdb.org/t/p/w${size}/${path}`;
};
