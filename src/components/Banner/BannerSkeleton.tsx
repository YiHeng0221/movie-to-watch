import { CardSkeleton } from "../Cards";

const BannerSkeleton = () => {
  return (
    <div className="skeleton w-full flex flex-col items-center justify-center overflow-clip relative md:pt-20 pt-16 bg-gradient-to-b from-[rgba(27,27,27,0.3)] to-black">
      <CardSkeleton type="info" />
    </div>
  );
}

export default BannerSkeleton;