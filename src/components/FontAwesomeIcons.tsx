import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarkSolid,
  faCircleChevronDown,
  faX,
  faMagnifyingGlass,
  faList,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

const basicStyle =
  "text-white cursor-pointer hover:scale-110 transition-all duration-300";

const Play = ({ size, onClick }: { size: SizeProp; onClick?: () => void }) => (
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
  size: SizeProp;
  onClick?: () => void;
}) => (
  <FontAwesomeIcon
    icon={faCircleChevronDown}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const List = ({ size, onClick }: { size: SizeProp; onClick?: () => void }) => (
  <FontAwesomeIcon
    icon={faList}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);

const Search = ({ size, onClick }: { size: SizeProp; onClick?: () => void }) => (
  <FontAwesomeIcon
    icon={faMagnifyingGlass}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const Sort = ({ size, onClick }: { size: SizeProp; onClick?: () => void }) => (
  <FontAwesomeIcon
    icon={faSort}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);
const X = ({ size, onClick }: { size: SizeProp; onClick?: () => void }) => (
  <FontAwesomeIcon
    icon={faX}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);

const RegularBookmark = ({
  size,
  onClick,
}: {
  size: SizeProp;
  onClick?: () => void;
}) => (
  <FontAwesomeIcon
    icon={faBookmark}
    size={size}
    className={basicStyle}
    onClick={onClick}
  />
);

const SolidBookmark = ({
  size,
  onClick,
}: {
  size: SizeProp;
  onClick?: () => void;
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
  size: SizeProp;
  onClick?: () => void;
}) => {
  return filled ? (
    <SolidBookmark size={size} onClick={onClick} />
  ) : (
    <RegularBookmark size={size} onClick={onClick} />
  );
};

export {
  Play,
  CircleDown,
  RegularBookmark,
  SolidBookmark,
  BookMark,
  Search,
  List,
  X,
  Sort,
};
