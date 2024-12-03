type Movie = {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  overview?: string;
  release_date: string;
  genres?: Genre[];
};

type Genre = {
  id: number;
  name: string;
};

type Credit = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
};

type Cast = {
  cast: Credit[];
  crew: {
    id: number;
    name: string;
    job: string;
  }[];
};

type Comment = {
  id: string;
  author_details: {
    avatar_path: string;
    name: string;
    rating: number;
  };
  content: string;
  created_at: string;
};

type MovieApiResponse = {
  results: Movie[];
  total_pages: number;
};

type CarouselProps = {
  type: string;
  movie_id?: string;
};

type MovieCardProps = {
  title: string;
  image: string;
  id: string;
  release_date: string;
  className?: string;
};

type CreditCardProps = {
  name: string;
  image: string;
  character: string;
};

type MovieInfoProps = {
  title: string;
  image: string;
  description: string;
  credits: {
    cast: string[];
    director: string[];
  };
  categories: Genre[];
  id: string;
  release_date: string;
};

type OrderByProps = {
  type: "favorites" | "searchResults";
};

type VideoModalProps = {
  videoSrc: string;
};

type LotteryWheelProps = {
  spinWheel: () => void;
  disabled: boolean;
};

type SearchStore = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Movie[];
  setSearchResults: (results: Movie[]) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  isAfterSearch: boolean;
  setIsAfterSearch: (isAfterSearch: boolean) => void;
};

type FavoriteStore = {
  favorites: Movie[];
  setFavorites: (favorites: Movie[]) => void;
};

type FetchMoviesDataParams = {
  type: string;
  query?: string;
  page?: number;
};

type ApiResponse<T> = {
  results: T[];
  total_pages: number;
};

export type {
  Movie,
  Genre,
  Credit,
  Cast,
  Comment,
  MovieApiResponse,
  CarouselProps,
  MovieCardProps,
  CreditCardProps,
  MovieInfoProps,
  OrderByProps,
  VideoModalProps,
  LotteryWheelProps,
  SearchStore,
  FavoriteStore,
  FetchMoviesDataParams,
  ApiResponse,
};
