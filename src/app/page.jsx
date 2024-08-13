import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/post";
import { getServerSession } from "next-auth";
import { MongoClient } from "mongodb";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NewPostForm from "@/components/NewPostForm/NewPostForm";

export default async function Index() {
  //Variables
  const session = await getServerSession(authOptions); // if we are connected we have a session
  let posts, client;

  try {
    // connect to MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    // connect to the mongodb database
    const db = client.db(process.env.MONGODB_DATABASE);
    //all the posts from db sorted from newer to older inside an array posts
    posts = await db
      .collection("posts")
      .find()
      .sort({ creation: -1 })
      .toArray();
    // format posts we want the _id a string
    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));
  } catch (e) {
    await client.close();
    throw new Error(e);
  }
  await client.close();

  return (
    <ConnectedLayout>
      <div className="md:w-[700px] w-full mx-auto mt-10">
        {/* New Post   */}
        {session?.user && ( // display the field to create a new post
          <div className="border- b border-threads-gray-dark py-4">
            <NewPostForm />
          </div>
        )}
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
