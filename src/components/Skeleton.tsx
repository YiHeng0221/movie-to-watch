interface SkeletonProps {
  style: string;
  type: "image" | "text" | "background";
}

const Skeleton = ({ style, type }: SkeletonProps) => {
  const typeClass = {
    image: "bg-gray-200",
    text: "bg-gray-300",
    background: "bg-gray-400",
  };
  return (
    <div
      className={`Skeleton ${style} animate-pulse rounded-md ${typeClass[type]}`}
    ></div>
  );
};

export default Skeleton;
