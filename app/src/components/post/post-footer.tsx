import { Button } from "@/components/ui/button";
import { ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import PostActions from "./post-actions";
import { SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { PostWithUserData } from "@/lib/types";

const PostFooter = ({
  post,
  username,
}: {
  post: PostWithUserData;
  username?: string;
}) => {
  const { id: postId, likeCount, commentCount } = post;
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const selectedPostId = useStore((state) => state.selectedPostId);
  const setSelectedPostId = useStore((state) => state.setSelectedPostId);
  const clearSelectedPostId = useStore((state) => state.clearSelectedPostId);

  const showComments = (event: SyntheticEvent) => {
    event.preventDefault();
    if (selectedPostId === postId) {
      clearSelectedPostId();
    } else {
      setSelectedPostId(postId);
    }
  };

  useEffect(() => {
    if (likeCount !== likes) {
      setLikes(likeCount);
    }
  }, [likeCount]);

  useEffect(() => {
    if (commentCount !== comments) {
      setComments(commentCount);
    }
  }, [commentCount]);

  return (
    <div className="flex justify-around mb-4">
      <Button variant="ghost" size="sm" onClick={() => setLikes(likes + 1)}>
        <HeartIcon className="w-5 h-5" />
        {likes > 0 && <sup>{likes}</sup>}
      </Button>
      <Button variant="ghost" size="sm" onClick={showComments}>
        <ChatBubbleIcon className="w-5 h-5" />
        {comments > 0 && <sup>{comments}</sup>}
      </Button>
      <PostActions postId={postId} username={username} />
    </div>
  );
};

export default PostFooter;
