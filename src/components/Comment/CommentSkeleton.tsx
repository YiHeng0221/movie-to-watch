const CommentSkeleton = () => {
  return (
    <div className="w-full py-4 px-8 h-56 bg-component rounded-2xl flex-col justify-start items-start gap-8 flex animate-pulse">
      <div className="w-full flex-col justify-center items-center gap-2 flex">
        <div className="w-full justify-between items-center inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse justify-start items-start gap-2.5 flex"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
