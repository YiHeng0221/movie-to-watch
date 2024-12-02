"use client";

import { fetchMoviesData } from "@/api/movies";
import Banner from "@/components/Banner";
import { CarouselWrapper } from "@/components/Carousel";
import { useEffect, useState } from "react";

const RootWrapper = () => {
  const sections = ["trending", "favorites", "topRated"];
  const [randomMovie, setRandomMovie] = useState<string>("");

  useEffect(() => {
    const getRandomMovie = async () => {
      const res = await fetchMoviesData({ type: "trending", page: 1 });
      setRandomMovie(res.results[Math.floor(Math.random() * 10)]);
    };
    getRandomMovie();
  }, []);
  return (
    <div>
      {randomMovie && <Banner movie={randomMovie} />}
      {sections.map((section) => (
        <section key={section} className="my-10">
          <CarouselWrapper type={section} />
        </section>
      ))}
    </div>
  );
}

export default RootWrapper;