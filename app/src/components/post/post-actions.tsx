import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import useMutationPosts from "@/hooks/use-mutations-posts";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";

const PostActions = ({
  postId,
  username,
}: {
  postId: string;
  username?: string;
}) => {
  const { deletePostById } = useMutationPosts();
  const { user } = useStore((state) => state);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (user && user.username === username) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [user, username]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <DotsHorizontalIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isOwner && <DropdownMenuItem>Edit post</DropdownMenuItem>}
        {isOwner && (
          <DropdownMenuItem onClick={() => deletePostById(postId)}>
            Delete post
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Copy link to post</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          Report post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostActions;
