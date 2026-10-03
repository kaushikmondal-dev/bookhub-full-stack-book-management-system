import { User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href={"/"}
          className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl from-blue-500 to-blue-700 shadow-sm">
            <Image
              src="/bookHub.png"
              alt="bookHub"
              height={100}
              width={100}
              sizes="40px"
            />
          </span>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            <span className="">Book</span>
            <span className="text-blue-600">Hub</span>
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href={"/login"}>Manage Books</Link>

          <Link
            className="flex items-center gap-1"
            href={"/login"}>
            <User2Icon />
            Login/Register
          </Link>

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
