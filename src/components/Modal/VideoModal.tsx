import { X } from "../FontAwesomeIcons";

const VideoModal = ({
  videoSrc,
  onClose,
}: {
  videoSrc: string;
  onClose: () => void;
}) => {
  return (
    <div className="w-full h-screen bg-black fixed z-50 top-0 left-0 flex justify-center items-center bg-opacity-50 backdrop-blur-md">
      <div className="absolute top-4 right-4 text-white text-2xl">
        <X size="lg" onClick={onClose} className="" />
      </div>
      <iframe
        width="1080"
        height="720"
        src={videoSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoModal;
