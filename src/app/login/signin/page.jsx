"use client";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";
import { checkEmail } from "@/utils/checkemailsyntax";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { setCookie } from "cookies-next";

export default function Signin() {
  //Variable
  const router = useRouter();
  //Function
  const prepareLogin = async (formData) => {
    //assign data from the form in variables
    const email = formData.get("email");
    const password = formData.get("password");

    // check empty field
    if (!email || !password) {
      return toast.error("remplir tous les champs");
    }
    // Check if email is valid
    if (!checkEmail(email)) {
      return toast.error("Veuillez entrer un email valide");
    }

    //Connect the user
    try {
      const resp = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(`respppppppppppppppppppppp ${resp.message}`);

      if (resp.error) {
        return toast.error(resp.error);
      }
    } catch (e) {
      return toast.error(e.message);
    }

    // Creation of a cookie named iamlogged
    //setCookie("iamlogged", "true");

    //Success
    toast.success("vous êtes connecté");
    //Redirect to homepage
    router.replace("/");
    router.refresh(); // refresh
  };

  return (
    <div className="w-[440px]  mx-auto">
      {/*  Title Se connecter  */}
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
        Se connecter
      </h1>

      {/*  Form    */}
      <form action={prepareLogin}>
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
        <Button formButton>Se connecter</Button>
      </form>

      <div className="flex justify-center items-center mt-4">
        <div className="border-t border-threads-gray-light w-1/4"></div>
        <div className="text-threads-gray-light mx-4">ou</div>
        <div className="border-t border-threads-gray-light w-1/4"></div>
      </div>

      <Link href="/login/signup">
        <Button formButton>Créer un compte</Button>
      </Link>
    </div>
  );
}
