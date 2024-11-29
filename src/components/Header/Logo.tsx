"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Logo() {
  const router = useRouter();
  const goToHome = () => {
    router.push("/");
  };
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={goToHome}>
      <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
      <span className="hidden md:block text-white text-2xl font-bold tracking-tighter">
        Allen Movies
      </span>
    </div>
  );
}
