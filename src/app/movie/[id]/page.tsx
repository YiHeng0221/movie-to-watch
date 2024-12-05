import { BannerSkeleton } from "@/components/Banner";
import { CarouselWrapper } from "@/components/Carousel";
import { CommentsWrapper } from "@/components/Comment";
import CommentSkeleton from "@/components/Comment/CommentSkeleton";
import { lazy, Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const Banner = lazy(() => import("@/components/Banner").then(module => ({ default: module.Banner })));
  const id = (await params).id;
  return (
    <div className="flex flex-col items-center w-screen">
      <Suspense fallback={<BannerSkeleton />}>
        <Banner movie_id={id} />
      </Suspense>
      <div className="flex flex-col gap-8 w-full md:w-2/3">
        <CarouselWrapper type="credits" movie_id={id} />
        <Suspense fallback={Array.from({ length: 5 }).map((_, index) => <CommentSkeleton key={index} />)}>
          <CommentsWrapper movie_id={id} />
        </Suspense>
      </div>
    </div>
  );
}