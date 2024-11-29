import Link from "next/link";
import Logo from "./Logo";
import { List, Search } from "../FontAwesomeIcons";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <div className="relative flex items-center justify-between w-full px-8 md:h-20 h-16 bg-[#909090] backdrop-blur-md bg-opacity-30">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/search" className="text-white flex items-center gap-2">
            <Search size="xl" />
            <span className="hidden md:block text-2xl font-bold">Search</span>
          </Link>
          <Link
            href="/favorites"
            className="text-white flex items-center gap-2"
          >
            <List size="xl" />
            <span className="hidden md:block text-2xl font-bold">
              Your List
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
