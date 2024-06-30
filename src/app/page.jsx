import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/post";

export default function Index() {
  const posts = [
    {
      _id: "1",
      content: "Bienvenue sur mon nveau fil",
      pseudo: "john",
      profile: "/picture.jpg",
    },
    {
      _id: "2",
      content: "Bienvenue sur mon nveau fil",
      pseudo: "john",
      profile: "/picture.jpg",
    },
    {
      _id: "3",
      content: "Bienvenue sur mon nveau fil",
      pseudo: "john",
      profile: "/picture.jpg",
    },
  ];
  return (
    <ConnectedLayout>
      <div className="md:w-[700px] w-full mx-auto mt-10">
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
