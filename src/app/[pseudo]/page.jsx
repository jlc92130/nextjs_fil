"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Post from "@/components/Post/Post";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { createPortal } from "react-dom";
import Button from "@/components/Button/Button";

export default function Profile() {
  // Variable
  const params = useParams(); // we can use it in "client" page
  const pseudo = params.pseudo.slice(3); //%43pseudo  => pseudo
  const router = useRouter(); // we are in "client" so we can use it
  const { data: session } = useSession();

  // State
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [profileInput, setProfileInput] = useState(""); //url profile picture
  const [bioInput, setBioInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModale, setOpenModale] = useState(false);

  useEffect(() => {
    if (!pseudo) {
      router.push("/");
    }
    fetchUserDataPosts();
  }, []);

  // empecher le scroll de la page

  useEffect(() => {
    if (openModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModale]);
  // Functions

  const edit = async () => {
    // set input
    setProfileInput(user.profile);
    setBioInput(user.bio);
    setLinkInput(user.url);
    setOpenModale(true);
  };

  const editUser = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const response = await fetch("/api/user/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo: pseudo,
        profile: profileInput,
        bio: bioInput,
        url: linkInput,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      toast.error("Une erreur est survenue");
      return;
    }
    const newUser = {
      ...user,
      profile: profileInput,
      bio: bioInput,
      url: linkInput,
    };
    setUser(newUser);
    setOpenModale(false);
    setIsLoading(false);
    toast.success("profile mis à jour");
  };

  const fetchUserDataPosts = async () => {
    const response = await fetch("/api/user", {
      //we can use fetch because we are in a client component
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("une erreur est intervenue");
    }

    // if the user in the url do not exist that will generate an error so we want to redirect to "/" to avoid a bug
    if (!data.user) {
      router.push("/");
      return; // to stop the program
    }

    setPosts(data.posts);
    setUser(data.user);
  };

  return (
    <ConnectedLayout>
      {/*  Modal to modify the profile    */}
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
            <div className="modale-user-foreground">
              <div className="flex gap-3">
                {/*  Profile picture  */}
                <div className="flex-1">
                  <label className="label" htmlFor="picture">
                    Photo de profil
                  </label>
                  <input
                    type="url"
                    name="picture"
                    id="picture"
                    className="input"
                    placeholder="https://www.maphotodeprofile.png"
                    value={profileInput}
                    onChange={(e) => setProfileInput(e.target.value)}
                  />
                </div>
                <div>
                  <Image
                    src={user.profile}
                    alt="user"
                    width={100}
                    height={100}
                    className="object-cover rounded-full"
                    unoptimized
                  />
                </div>
              </div>
              {/* Bio */}
              <div className="mt-5">
                <label className="label" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="input"
                  placeholder="bio"
                  value={bioInput}
                  onChange={(e) => {
                    setBioInput(e.target.value);
                  }}
                ></textarea>
              </div>
              {/*  url  */}
              <div className="mt-5">
                <label className="label" htmlFor="url">
                  Lien
                </label>
                <input
                  id="url"
                  type="url"
                  name="url"
                  className="input"
                  placeholder="https://monsite.com"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-1">
                <div>
                  <Button onClick={editUser} disabled={isLoading}>
                    Terminer
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <div className="mt-10 md:w-[700px] mx-auto text-white">
        {/* Infos  */}
        <div className="flex justify-between gap-4">
          {/* Data */}
          <div>
            <h1 className="text-3xl font-semibold">{user.username}</h1>
            <div className="text-threads-gray-light mt-2">@{pseudo}</div>
            <div className="mt-5 whitespace-pre-line">{user.bio}</div>

            {user && user.url && (
              <div className="mt-5 text-blue-500 hover:text-blue-300 duration-150  ">
                <a href={user.url} target="_blank">
                  {user.url}
                </a>
              </div>
            )}
          </div>

          {/* Photo  */}
          <div>
            <Image
              alt="user"
              src={user.profile}
              width={100}
              height={100}
              className="rounded-full object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* updating the profile if the user match the pseudo */}
        {session?.user.pseudo === pseudo && (
          <div className="user-button" onClick={edit}>
            Modifier le profile
          </div>
        )}

        {/* tabs  */}
        <div className="flex mt-5">
          <div className="flex-1 border-b border-white pb-4 px-4 text-center hover:text-white hover:border-white duration-150 cursor-pointer">
            Fils
          </div>
          <div className="flex-1 text-threads-gray-light border-b border-threads-gray-light pb-4 px-4 text-center hover:text-white hover:border-white duration-150 cursor-pointer">
            Réponses
          </div>
          <div className="flex-1 text-threads-gray-light border-b border-threads-gray-light  pb-4 px-4 text-center hover:text-white hover:border-white duration-150 cursor-pointer">
            Republications
          </div>
        </div>

        {/* Posts  */}

        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </ConnectedLayout>
  );
}
