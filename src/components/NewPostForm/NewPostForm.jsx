"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { createPost } from "@/actions/create-post";
import { useState } from "react";

export default function NewPostForm({ closeModale = () => {} }) {
  //Variable
  const { data: session } = useSession();
  //console.log(session?.user.profile);
  // State
  const [textarea, setTextarea] = useState("");

  // Function
  const onPrepare = async (formData) => {
    try {
      await createPost(formData);
      setTextarea("");
    } catch (error) {
      return toast.error(error.message);
    }
    closeModale();
  };
  return (
    <form action={onPrepare}>
      <div className="flex gap-3 w-full">
        {/*  Photo  */}
        <div>
          <Image
            src={session?.user.profile}
            alt="user"
            width={50}
            height={50}
            className="rounded-full mt-5"
            unoptimized
          />
        </div>
        {/*  Field   */}
        <div className="flex-1">
          <textarea
            placeholder="ecrire votre message"
            className="input"
            name="content"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <Button formButton disab={textarea.length < 1}>
            Publier
          </Button>
        </div>
      </div>
    </form>
  );
}
