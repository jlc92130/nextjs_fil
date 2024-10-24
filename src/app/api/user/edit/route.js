import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Variables
  const data = await request.json();
  const pseudo = data.pseudo;
  let bio = data.bio;
  const profile = data.profile;
  const url = data.url;
  let client;

  if (!bio) {
    bio = "-";
  }

  try {
    // Connexion to Mongodb cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    // Connection to Mongodb database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Verify is the user exist
    let user = (await db.collection("users"))
      .find({ pseudo })
      .limit(1)
      .toArray();

    //let posts = (await db.collection("posts")).find({ pseudo }).toArray();
    /// fin nouveau codeeeeeeeeeeee

    if (user.lenght === 0) {
      await client.close();
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    // user exist then update it
    await db.collection("users").updateOne(
      { pseudo: pseudo },
      {
        $set: {
          profile: profile,
          bio: bio,
          url, // same than url:url
        },
      }
    );

    let newUser = (await db.collection("users"))
      .find({ pseudo })
      .limit(1)
      .toArray();
    await client.close();

    return NextResponse.json({ newUser }, { status: 200 });
  } catch (e) {
    await client.close();
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
