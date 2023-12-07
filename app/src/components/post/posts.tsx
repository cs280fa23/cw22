import { useStore } from "@/lib/store";
import Post from "./post";
import useQueryPosts from "@/hooks/use-query-posts";
import Comments from "../comment/comments";

const Posts = () => {
  const { posts } = useQueryPosts();
  const selectedPostId = useStore((state) => state.selectedPostId);

  return (
    <div className="">
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
          {post.id === selectedPostId && <Comments />}
        </div>
      ))}
    </div>
  );
};

export default Posts;
