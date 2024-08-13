"use client";
import Image from "next/image";
import Link from "next/link";
import moment from "moment-timezone";
import "moment/locale/fr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { deletePost } from "@/actions/delete-post";

export default function Post({ post }) {
  // Variables
  const { data: session } = useSession();

  // State
  const [optionsAreOpen, setOptionsAreOpen] = useState(false);

  // Functions
  const onDeletePost = async () => {
    if (!confirm("voulez vous supprimer")) {
      return;
    }
    try {
      await deletePost(post._id);
    } catch (error) {
      return toast.error(error.message);
    }
    toast.success("La suppression s'est bien passée");
  };

  return (
    <div className="post">
      {/* Photo  */}
      <div>
        <Image
          src={post.profile}
          alt="User"
          width={50}
          height={50}
          className="rounded-full object-cover"
          unoptimized
        />
      </div>

      {/* Contenu    */}
      <div className="text-white w-full">
        <div className="flex items-center justify-between">
          <Link href={`/@${post.pseudo}`}>
            <b>{post.pseudo}</b>
          </Link>

          {/*  Menu dropdown  */}
          <div className="flex items-center gap-1 text-sm text-threads-gray-light  relative">
            <div>
              {moment
                .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
                .tz("Europe/Paris")
                .fromNow()}
            </div>
            {session?.user && (
              <div>
                {/* delete button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="cursor-pointer"
                  onClick={() => setOptionsAreOpen((prev) => !prev)}
                >
                  <path
                    fill="#888888"
                    d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90m10-90a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m88 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10"
                  ></path>
                </svg>
              </div>
            )}
            {/*  Options  */}
            {optionsAreOpen && session?.user && (
              <div className="options">
                {session?.user && session.user.pseudo != post.pseudo ? (
                  <div className="option">signaler</div>
                ) : (
                  <>
                    <div className="option">modifier</div>
                    <div className="option" onClick={onDeletePost}>
                      supprimer
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}
