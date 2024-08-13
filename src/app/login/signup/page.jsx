"use client";

import Link from "next/link";
import Button from "@/components/Button/Button";
import { createUser } from "@/actions/create-user";
import { toast } from "react-toastify";
import { checkEmail } from "@/utils/checkemailsyntax";
import { useRouter } from "next/navigation";

export default function Signup() {
  // Variable
  const router = useRouter();
  //Function
  const prepareCreateUser = async (formData) => {
    const username = formData.get("username");
    const pseudo = formData.get("pseudo");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !pseudo || !email || !password) {
      // if a field is empty
      return toast.error("aucun champs doit être vide");
    }

    // if not email
    if (!checkEmail(email)) {
      return toast.error("ceci n'est pas un email");
    }
    try {
      await createUser(username, pseudo, email, password);
    } catch (error) {
      return toast.error(error.message);
    }

    // Success
    toast.success("Votre compte a été crée");

    // redirect
    router.push("/login/signin");
  };
  return (
    <div className="w-[440px]  mx-auto">
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
        S'identifier
      </h1>

      {/*  Form    */}
      <form action={prepareCreateUser}>
        <input
          type="text"
          placeholder="nom"
          name="username"
          className="input"
          required
        />
        <input
          type="text"
          placeholder="pseudo"
          name="pseudo"
          className="input"
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          className="input"
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="input"
          required
        />
        <Button formButton>S'inscrire</Button>
      </form>

      <div className="flex justify-center items-center mt-4">
        <div className="border-t border-threads-gray-light w-1/4"></div>
        <div className="text-threads-gray-light mx-4">ou</div>
        <div className="border-t border-threads-gray-light w-1/4"></div>
      </div>

      <Link href="/login/signin">
        <Button>Se connecter</Button>
      </Link>
    </div>
  );
}
