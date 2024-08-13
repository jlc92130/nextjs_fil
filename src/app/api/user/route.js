import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  // get the pseudo from the request body
  const data = await request.json();
  const pseudo = data.pseudo;
  let client;

  try {
    // Connect to MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    // Connect to the Mongodb database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Get the user
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    if (!user) {
      throw new Error("l'utilisateur n'existe pas");
    }

    // Format the user to get the id
    user = user.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }))[0];

    // get the posts
    let posts = await db
      .collection("posts")
      .find({ pseudo })
      .sort({ creation: -1 })
      .toArray();

    // format the posts
    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));
    await client.close();

    return NextResponse.json(
      {
        user,
        posts,
      },
      { status: 200 }
    );
  } catch (e) {
    await client.close();
    throw new Error(e.message);
  }
}
