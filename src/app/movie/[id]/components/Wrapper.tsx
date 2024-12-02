"use client";

import { getMovieDetails } from "@/api/movies";
import Banner from "@/components/Banner";
import { CarouselWrapper } from "@/components/Carousel";
import { CommentsWrapper } from "@/components/Comment";
import { Movie } from "@/type/types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Wrapper = () => {
  const { id }: { id: string } = useParams();
  const [movieDetail, setMovieDetail] = useState<Movie | null>(null);
  const fetchMovieDetails = useCallback(async () => {
    const res = await getMovieDetails(id);
    return res;
  }, [id]);
  useEffect(() => {
    const getMovieDetail = async () => {
      const detail = await fetchMovieDetails();
      setMovieDetail(detail);
    };
    getMovieDetail();
  }, [fetchMovieDetails, id]);
  return (
    <div className="flex flex-col items-center w-screen">
      {movieDetail && <Banner movie={movieDetail} />}
      <div className="flex flex-col gap-8 w-full md:w-2/3">
        <CarouselWrapper type="credits" movie_id={id} />
        <CommentsWrapper movie_id={id} />
      </div>
    </div>
  );
};

export default Wrapper;
