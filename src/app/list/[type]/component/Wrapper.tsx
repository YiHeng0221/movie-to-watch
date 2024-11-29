"use client";

import { InfiniteScroll } from "@/components/InfiniteScroll";
import { useParams } from "next/navigation";

const Wrapper = () => {
  const { type }: { type: string } = useParams();
  return (
    <>
      <div className="flex justify-between items-center md:mt-20 mt-16 py-10">
        <h1 className="text-3xl font-bold">
          {String(type).charAt(0).toUpperCase() + String(type).slice(1)}
        </h1>
      </div>
      <InfiniteScroll type={type} />
    </>
  );
};

export default Wrapper;