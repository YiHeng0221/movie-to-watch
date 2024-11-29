"use client";

import InfiniteScroll from "./InfiniteScroll/SeachInifinteScroll";

export default function ResultWrapper({
  title,
  fetchMoreData,
}: {
  title: string;
  fetchMoreData: (page: number) => Promise<Movie[]>;
}) {
  return (
    <div className="w-full h-full px-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <InfiniteScroll fetchMoreData={fetchMoreData} />
    </div>
  );
}
