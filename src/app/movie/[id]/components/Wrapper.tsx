"use client";

import Banner from "@/components/Banner";
import { CarouselWrapper } from "@/components/Carousel";
import { CommentsWrapper } from "@/components/Comment";
import { useParams } from "next/navigation";

const Wrapper = () => {
  const { id }: { id: string } = useParams();
  return (
    <div className="flex flex-col items-center w-screen">
      <Banner movie_id={id} />
      <div className="flex flex-col gap-8 w-full md:w-2/3">
        <CarouselWrapper type="credits" movie_id={id} />
        <CommentsWrapper movie_id={id} />
      </div>
    </div>
  );
};

export default Wrapper;
