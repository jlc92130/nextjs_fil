"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function deletePost(postId) {
  //export const deletePost = async (postId) => {
  // Variable
  const session = await getServerSession(authOptions);
  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  // Connect to the MongoDB database
  const db = client.db(process.env.MONGODB_DATABASE);

  // get the post
  let post = await db
    .collection("posts")
    .find({ _id: new ObjectId(postId) })
    .limit(1)
    .toArray();
  // if post doesn't exist

  if (post.length === 0) {
    await client.close();
    throw new Error("ce post n'existe plus");
  }
  // if the user is not the author of the post
  if (post[0].pseudo != session?.user.pseudo) {
    await client.close();
    throw new Error("Vous n'avez pas le droit de supprimer le post");
  }
  // delete the post
  try {
    await db.collection("posts").deleteOne({ _id: new ObjectId(postId) });
  } catch (error) {
    await client.close();
    throw new Error(error);
  }
  await client.close();

  // clear cache
  revalidatePath("/", "/[pseudo]");
}
