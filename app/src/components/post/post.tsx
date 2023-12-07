import PostAvatar from "./post-avatar";
import PostHeader from "./post-header";
import PostFooter from "./post-footer";
import type { PostWithUserData } from "@/lib/types";

const Post = ({ post }: { post: PostWithUserData }) => {
  const { content, user, timestamp } = post;

  // The code below uses Optional Chaining (?.) and Nullish Coalescing (??)
  const displayName = user?.displayName ?? "Unknown";
  const username = user?.username ?? "Unknown";
  const avatar = user?.avatar;

  return (
    <div className="flex border-b border-slate-400">
      <div className="p-4">
        <PostAvatar imageUrl={avatar} displayName={displayName} />
      </div>
      <div className="w-full pt-4 pr-4">
        <PostHeader
          name={displayName}
          username={username}
          timestamp={timestamp}
        />
        <div className="my-4">{content}</div>
        <PostFooter post={post} username={username} />
      </div>
    </div>
  );
};

export default Post;
