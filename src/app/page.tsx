import { BannerSkeleton } from "@/components/Banner";
import { CarouselWrapper } from "@/components/Carousel";
import { lazy, Suspense } from "react";

export default function Home() {
  const sections = ["trending", "favorites", "topRated"];  const Banner = lazy(() => import("@/components/Banner").then(module => ({ default: module.Banner })));

  return (
    <main>
      <Suspense
        fallback={<BannerSkeleton />}
      >
        <Banner />
      </Suspense>
      
      {sections.map((section) => (
        <section key={section} className="my-10">
          <CarouselWrapper type={section} />
        </section>
      ))}
    </main>
  );
}
