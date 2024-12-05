"use client";
import Image from "next/image";
import { useState } from "react";

const Comment = ({
  author_details,
  content,
  created_at,
}: {
  author_details: { avatar_path: string; name: string; rating: number };
  content: string;
  created_at: string;
}) => {
  const [showMore, setShowMore] = useState(false);
  const date = new Date(created_at);
  return (
    <div
      className={`w-full py-4 px-8 ${showMore ? "" : "max-h-56"} bg-component rounded-2xl border-[0.5px] border-gray-200 flex-col justify-start items-start gap-8 flex`}
    >
      <div className="w-full flex-col justify-center items-center gap-2 flex">
        <div className="w-full justify-between items-center inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
              <Image
                className="rounded-full object-cover"
                src={`https://secure.gravatar.com/avatar/${author_details.avatar_path}`}
                alt="icon"
                width={40}
                height={40}
              />
            </div>
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <h5 className="text-white text-base font-bold leading-snug">
                {author_details.name}
              </h5>
              <h6 className="text-white text-sm font-normal leading-5">
                {date.toISOString().split('T')[0]}
              </h6>
            </div>
          </div>
        </div>
        <p
          className={`text-white text-sm font-normal leading-snug ${showMore ? "line-clamp-none" : "line-clamp-3"}`}
        >
          {content}
        </p>
        {content.length > 315 && (
          <button
            className="text-blue-500 hover:text-blue-700 font-semibold"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
