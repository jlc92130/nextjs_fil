"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createPost = async (formData) => {
  // Variables
  const session = await getServerSession(authOptions);
  let client;
  // if the user is not connected then we have no session
  if (!session.user) {
    throw new Error("vous devez etre connecté");
  }

  try {
    // connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    // connect to the MongoDB db
    const db = client.db(process.env.MONGODB_DATABASE);

    // add post to database
    await db.collection("posts").insertOne({
      pseudo: session.user.pseudo,
      content: formData.get("content"),
      profile: session.user.profile,
      creation: new Date(),
    });
  } catch (error) {
    await client.close();
    throw new Error(error.message);
  }
  await client.close();
  revalidatePath("/"); // we need to refresh the page to show the last post. We cannot use router.refresh() because we are server side useRouter is only "client side"
};
