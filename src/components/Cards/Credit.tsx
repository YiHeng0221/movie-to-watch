import Image from "next/image";
import { getImageUrl } from "@/api/movies";

const CreditCard = ({
  name,
  image,
  character,
}: {
  name: string;
  image: string;
  character: string;
}) => {
  const url = getImageUrl(image, 500);
  return (
    <div className="max-w-sm bg-black rounded-lg shadow w-32 relative group">
      <Image
        className="rounded-t-lg min-h-48"
        src={url}
        alt={name}
        width={500}
        height={500}
      />
      <div className="p-2">
        <h5 className="text-md font-bold tracking-tight text-white line-clamp-1">
          {name}
        </h5>
        <p className="text-white text-sm">{character}</p>
      </div>
    </div>
  );
};

export default CreditCard;
