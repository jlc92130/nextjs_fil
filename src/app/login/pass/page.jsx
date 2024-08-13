"use client";

import Link from "next/link";
import Button from "@/components/Button/Button";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Pass() {
  // Variable
  const router = useRouter();
  // Function
  const createCookieGuest = () => {
    // Creation of a cookie named guest
    setCookie("guest", "true");
    // Redirect
    router.push("/");
  };

  return (
    <div className="w-[500px] mx-auto">
      {/* Title */}
      <h1 className="title flex items-center  gap-1">
        <Link href="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="#888888"
              d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8"
            ></path>
          </svg>
        </Link>
        Continuer en mode invité
      </h1>

      {/*  Texte    */}
      <p className="text-threads-gray-light mt-4">
        Vous pouvez naviguer sans profil mais vous ne pourrez pas publier de
        contenu
      </p>
      {/*  Button to go to invited  */}
      <Button onClick={createCookieGuest}>Continuer</Button>
    </div>
  );
}
