import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Variables
  const data = await request.json();
  const pseudo = data.pseudo;
  const profile = data.profile;
  let client;

  try {
    // Connexion to Mongodb cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    // Connection to Mongodb database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Verify is the user exist
    let posts = await db.collection("posts").find({ pseudo }).toArray();

    if (posts.lenght === 0) {
      await client.close();
      return NextResponse.json({ error: "posts not found" }, { status: 404 });
    }

    // user exist then update the posts
    await db.collection("posts").updateMany(
      { pseudo: pseudo },
      {
        $set: {
          profile: profile,
        },
      }
    );

    await client.close();

    return NextResponse.json({ posts }, { status: 200 });
  } catch (e) {
    await client.close();
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
