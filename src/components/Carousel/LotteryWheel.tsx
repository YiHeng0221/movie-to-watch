const LotteryWheel = ({
  spinWheel,
}: {
  spinWheel: () => void;
  disabled: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-bold text-center px-8">
          Not sure what to watch? let us help you pick one from it!
        </h1>
        <button
          className="bg-red text-white px-4 py-2 rounded-md font-bold hover:bg-red-hover transition-all duration-300"
          onClick={spinWheel}
        >
          SPIN
        </button>
      </div>
    </div>
  );
};

export default LotteryWheel;
