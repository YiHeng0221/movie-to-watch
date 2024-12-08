"use client";
import { Movie } from "@/type/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dropdown({ options }: { options: Movie[] }) {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/movie/${id}`);
  };
  return (
    options && (
      <div className="absolute shadow bg-[#3B3B3B] top-100 z-40 w-full left-0 rounded-lg overflow-y-auto">
        <div className="flex flex-col w-full">
          {options.map((option) => (
            <div
              key={option.id}
              className="cursor-pointer w-full border-gray-500 rounded-t border-b pl-2 hover:bg-[#4f4f4f] last:border-b-0 flex"
              onClick={() => handleClick(option.id)}
            >
              <div className="flex flex-col w-full p-2 ps-2 border-transparent border-l-2 relative">
                <div className="w-full text-sm flex flex-col">
                  {option.title}
                </div>
                <div className="w-full text-xs text-gray-400 flex flex-col">
                  {option.release_date}
                </div>
              </div>
              <Image
                src={`https://image.tmdb.org/t/p/w500${option.poster_path}`}
                alt="poster"
                width={16}
                height={16}
                className="object-cover h-10 w-10 m-2"
              />
            </div>
          ))}
        </div>
      </div>
    )
  );
}
