type CardSkeletonType = "movie" | "info" | "credit";

const MovieCardSkeleton = () => {
  return (
    <div className="w-40 md:w-48 h-96 bg-light rounded-lg shadow animate-pulse">
      <div className="image w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="info w-full h-24 bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  );
}

const InfoCardSkeleton = () => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center bg-light animate-pulse bg-opacity-30 backdrop-blur-md shadow md:flex-row p-4 gap-4 ">
      <div className="background h-48 bg-gray-200 animate-pulse rounded-lg absolute top-0 left-0"></div>
      <div className="relative flex flex-col items-center bg-light bg-opacity-30 backdrop-blur-md rounded-lg shadow max-w-sm md:flex-row md:max-w-3xl my-10 p-4 gap-4">
        <div className="image h-96 w-64 aspect-[3/4] bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="info w-80 h-96 animate-pulse rounded-lg flex flex-col gap-6 justify-start items-start">
          <div className="title h-16 w-80 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="categories h-12 w-80 flex flex-row justify-between gap-2">
            <div className="category h-8 w-24 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="category h-8 w-24 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="category h-8 w-24 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
          <div className="director h-8 w-80 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="cast h-8 w-80 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="description w-80 flex flex-col gap-2">
            <div className="h-8 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="h-8 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="h-8 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CreditCardSkeleton = () => {
  return (
    <div className="max-w-sm animate-pulse bg-black rounded-lg shadow w-32 relative group">
      <div className="image w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="info w-full h-24 bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  );
}

const CardSkeleton = ({type}: {type: CardSkeletonType}) => {
  
  return (
    <>
      {type === "movie" && <MovieCardSkeleton />}
      {type === "info" && <InfoCardSkeleton />}
      {type === "credit" && <CreditCardSkeleton />}
    </>
  );
}

export default CardSkeleton;