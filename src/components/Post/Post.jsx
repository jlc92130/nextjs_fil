import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
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
        />
      </div>

      {/* Contenu    */}
      <div className="text-white w-full">
        <div className="flex items-center justify-between">
          <Link href={`/@${post.pseudo}`}>
            <b>{post.pseudo}</b>
          </Link>
          <div className="text-sm text-threads-gray-light">date</div>
        </div>

        <div className="mt-2 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}
