const VideoModal = ({ videoSrc }: { videoSrc: string }) => {
  return (
    <div className="w-full h-screen bg-black fixed z-50 top-0 left-0 flex justify-center items-center bg-opacity-50 backdrop-blur-md">
      {/* close button */}
      <button className="absolute top-4 right-4 text-white text-2xl">x</button>
      <video src={videoSrc} controls className="w-full md:w-1/2" />
    </div>
  );
};

export default VideoModal;
