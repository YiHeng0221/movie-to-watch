import Banner from "@/components/Banner";
import CarouselWrapper from "@/components/Carousel/CarouselWrapper";

export default function Home() {
  const sections = ["trending", "favorites", "topRated"];

  return (
    <main>
      <Banner movie_id="974576" />
      {sections.map((section) => (
        <section key={section} className="my-10">
          <CarouselWrapper type={section} movie_id="974576" />
        </section>
      ))}
    </main>
  );
}
