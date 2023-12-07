import { createPost, deletePost } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationPosts() {
  const { toast } = useToast();
  const removePost = useStore((state) => state.removePost);
  const addPost = useStore((state) => state.addPost);

  const deletePostById = async (postId: string) => {
    try {
      await deletePost(postId);
      removePost(postId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the post",
        description:
          (error as Error).message ||
          "There was an error deleting the post. Please try again later.",
      });
    }
  };

  const addNewPost = async (content: string, image?: string) => {
    try {
      const newPost = await createPost(content, image);
      addPost(newPost);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the post",
        description:
          (error as Error).message ||
          "There was an error creating the post. Please try again later.",
      });
    }
  };

  return { deletePostById, addNewPost };
}

export default useMutationPosts;
