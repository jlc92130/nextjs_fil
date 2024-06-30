"use client";
import Link from "next/link";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "../Button/Button";

export default function ConnectedLayout({ children }) {
  const pathname = usePathname();
  return (
    <section className="flex flex-col min-h-screen px-5">
      {/* Header  */}
      <header className="flex justify-between items-center py-4 ">
        {/* Nav */}
        {/*  Home icon   */}
        <nav className="absolute top-0 left-0 right-0 flex justify-center py-7">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 ${
                pathname == "/" ? "text-white" : "text-threads-gray-light"
              } `}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M224 120v96a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-96a15.87 15.87 0 0 1 4.69-11.32l80-80a16 16 0 0 1 22.62 0l80 80A15.87 15.87 0 0 1 224 120"
              ></path>
            </svg>
          </Link>
          {/*  Search  icon */}
          <Link href="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 ${
                pathname == "/search" ? "text-white" : "text-threads-gray-light"
              }`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="m229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32M40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72"
              ></path>
            </svg>
          </Link>
        </nav>

        {/* Logo   */}
        <Image src="/logo.jpg" alt="logo" width={40} height={40} />

        {/* Button  */}
        <div>
          <Button withoutMarginTop={true}>Se connecter</Button>
        </div>
      </header>

      {/* Content  */}
      <div className="flex-1">{children}</div>

      {/*  Footer    */}
      <Footer />
    </section>
  );
}
