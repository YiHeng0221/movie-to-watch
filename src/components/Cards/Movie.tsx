import Image from "next/image";
import { getImageUrl } from "@/api/movies";

const MovieCard = ({
  title,
  image,
  id,
  className,
}: {
  title: string;
  image: string;
  id: string;
  className?: string;
}) => {
  const url = getImageUrl(image, 500);
  return (
    <a href={`/movie/${id}`}>
      <div
        className={`max-w-sm bg-black rounded-lg shadow w-48 relative group hover:scale-125 transition-all duration-300 ${className}`}
      >
        <Image
          className="rounded-t-lg"
          src={url}
          alt={title}
          width={500}
          height={500}
        />
        <div className="p-2">
          <h5 className="mb-2 text-xl font-bold tracking-tight h-14 text-gray-900 dark:text-white line-clamp-2">
            {title}
          </h5>
        </div>
      </div>
    </a>
  );
};

export default MovieCard;
