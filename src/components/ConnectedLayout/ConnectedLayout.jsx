"use client";
import Link from "next/link";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "../Button/Button";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NewPostForm from "../NewPostForm/NewPostForm";

export default function ConnectedLayout({ children }) {
  //Variables
  const pathname = usePathname();
  const { data: session } = useSession(); // a hook like useSession is only on client side

  // State
  const [openModale, setOpenModale] = useState(false);
  //Cycle
  useEffect(() => {
    if (openModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModale]);
  // Function
  //const setOpenModal = () => {};

  return (
    <section className="flex flex-col min-h-screen px-5">
      {/* Header  */}
      <header className="flex justify-between items-center py-4 ">
        {/* Nav */}

        <nav className="absolute top-0 left-0 right-0  flex justify-center py-7">
          {/* Modal    */}
          {openModale &&
            createPortal(
              <div /* this div is the modal   */
                className="modale-background"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    // if we click outside the "modale-foreground" ("modale-background" is the parent)
                    setOpenModale(false);
                  }
                }}
              >
                <div className="modale-foreground">
                  <NewPostForm closeModale={() => setOpenModale(false)} />
                </div>
              </div>,
              document.body
            )}
          {/* logos home, loupe, post et profile  */}

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

          {/* Create post modal icon  */}
          {session?.user?.email && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 hover:bg-threads-gray-dark duration-100 p-1
              cursor-pointer text-threads-gray-light"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
              onClick={() => setOpenModale(true)}
            >
              <g fill="currentColor">
                <path fill="currentColor"></path>
                <path
                  fill="#888888"
                  d="m229.66 58.34l-32-32a8 8 0 0 0-11.32 0l-96 96A8 8 0 0 0 88 128v32a8 8 0 0 0 8 8h32a8 8 0 0 0 5.66-2.34l96-96a8 8 0 0 0 0-11.32M124.69 152H104v-20.69l64-64L188.69 88ZM200 76.69L179.31 56L192 43.31L212.69 64ZM224 128v80a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h80a8 8 0 0 1 0 16H48v160h160v-80a8 8 0 0 1 16 0"
                ></path>
              </g>
            </svg>
          )}

          {/*  user  */}
          {session?.user?.email && (
            <Link href={`/@${session.user.username}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-10 h-10 ${
                  pathname.includes("@")
                    ? "text-white"
                    : "text-threads-gray-light"
                }`}
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <g fill="currentColor">
                  <path fill="currentColor"></path>
                  <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24M74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0M96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32m97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0"></path>
                </g>
              </svg>
            </Link>
          )}
        </nav>

        {/* Logo   */}
        <Image src="/logo.jpg" alt="logo" width={40} height={40} />

        {/* Button  */}
        <div className="z-10">
          {session?.user ? (
            <Button withoutMarginTop={true} onClick={() => signOut()}>
              Se déconnecter
            </Button>
          ) : (
            <Link href="/login/signin">
              <Button withoutMarginTop={true}>Se connecter</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Content  */}
      <div className="flex-1">{children}</div>

      {/*  Footer    */}
      <Footer />
    </section>
  );
}
