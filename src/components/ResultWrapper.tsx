"use client";

import InfiniteScroll from "./InfiniteScroll/SeachInifinteScroll";

export default function ResultWrapper({ title }: { title: string }) {
  return (
    <div className="w-full h-full px-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <InfiniteScroll />
    </div>
  );
}
