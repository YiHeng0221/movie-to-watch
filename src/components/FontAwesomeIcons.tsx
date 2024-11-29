import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faStar,
  faBookmark,
  faPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as faThumbsUpSolid,
  faThumbsDown as faThumbsDownSolid,
  faStar as faStarSolid,
  faBookmark as faBookmarkSolid,
  faCircleChevronDown,
  faX,
  faMagnifyingGlass,
  faList,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

const basicStyle =
  "text-white cursor-pointer hover:scale-110 transition-all duration-300";

const Play = ({ size, onClick }: { size: string; onClick: () => void }) => (
  <FontAwesomeIcon
    icon={faPlayCircle}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const CircleDown = ({
  size,
  onClick,
}: {
  size: string;
  onClick: () => void;
}) => (
  <FontAwesomeIcon
    icon={faCircleChevronDown}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const List = ({ size, onClick }: { size: string; onClick: () => void }) => (
  <FontAwesomeIcon
    icon={faList}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);

const Search = ({ size, onClick }: { size: string; onClick: () => void }) => (
  <FontAwesomeIcon
    icon={faMagnifyingGlass}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const Sort = ({ size, onClick }: { size: string; onClick: () => void }) => (
  <FontAwesomeIcon
    icon={faSort}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const X = ({ size, onClick }: { size: string; onClick: () => void }) => (
  <FontAwesomeIcon
    icon={faX}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const RegularThumbsUp = ({
  size,
  onClick,
}: {
  size: string;
  onClick: () => void;
}) => (
  <FontAwesomeIcon
    icon={faThumbsUp}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const RegularThumbsDown = ({
  size,
  onClick,
}: {
  size: string;
  onClick: () => void;
}) => (
  <FontAwesomeIcon
    icon={faThumbsDown}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const RegularStar = ({ size }: { size: string }) => (
  <FontAwesomeIcon icon={faStar} size={size} className={basicStyle} />
);
const RegularBookmark = ({
  size,
  onClick,
}: {
  size: string;
  onClick: () => void;
}) => (
  <FontAwesomeIcon
    icon={faBookmark}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const SolidThumbsUp = ({
  size,
  onClick,
}: {
  size: string;
  onClick: () => void;
}) => (
  <FontAwesomeIcon
    icon={faThumbsUpSolid}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const SolidThumbsDown = ({
  size,
  onClick,
}: {
  size: string;
  onClick: () => void;
}) => (
  <FontAwesomeIcon
    icon={faThumbsDownSolid}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const SolidStar = ({ size }: { size: string }) => (
  <FontAwesomeIcon icon={faStarSolid} size={size} className={basicStyle} />
);
const SolidBookmark = ({
  size,
  onClick,
}: {
  size: string;
  onClick: () => void;
}) => (
  <FontAwesomeIcon
    icon={faBookmarkSolid}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);

const BookMark = ({
  filled,
  size,
  onClick,
}: {
  filled: boolean;
  size: string;
  onClick: () => void;
}) => {
  return filled ? (
    <SolidBookmark size={size} onClick={onClick} />
  ) : (
    <RegularBookmark size={size} onClick={onClick} />
  );
};

const Star = ({
  filled,
  size,
  onClick,
}: {
  filled: boolean;
  size: string;
  onClick: () => void;
}) => {
  return filled ? (
    <SolidStar size={size} onClick={onClick} />
  ) : (
    <RegularStar size={size} onClick={onClick} />
  );
};

const ThumbsUp = ({
  filled,
  size,
  onClick,
}: {
  filled: boolean;
  size: string;
  onClick: () => void;
}) => {
  return filled ? (
    <SolidThumbsUp size={size} onClick={onClick} />
  ) : (
    <RegularThumbsUp size={size} onClick={onClick} />
  );
};

const ThumbsDown = ({
  filled,
  size,
  onClick,
}: {
  filled: boolean;
  size: string;
  onClick: () => void;
}) => {
  return filled ? (
    <SolidThumbsDown size={size} onClick={onClick} />
  ) : (
    <RegularThumbsDown size={size} onClick={onClick} />
  );
};

export {
  Play,
  CircleDown,
  RegularThumbsUp,
  RegularThumbsDown,
  RegularStar,
  RegularBookmark,
  SolidThumbsUp,
  SolidThumbsDown,
  SolidStar,
  SolidBookmark,
  BookMark,
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  List,
  X,
  Sort,
};
