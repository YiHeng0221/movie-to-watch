"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

type PropType = {
  options: EmblaOptionsType;
  children: React.ReactNode;
  getEmblaApi: (emblaApi: EmblaCarouselType | undefined) => void;
};

const Carousel: React.FC<PropType> = ({ options, children, getEmblaApi }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    if (emblaApi && getEmblaApi) {
      getEmblaApi(emblaApi);
    }
  }, [emblaApi, getEmblaApi]);

  return (
    <section className="">
      <div className="overflow-x-hidden pl-8 py-12" ref={emblaRef}>
        <div className="flex flex-row">{children}</div>
      </div>
    </section>
  );
};

export default Carousel;
