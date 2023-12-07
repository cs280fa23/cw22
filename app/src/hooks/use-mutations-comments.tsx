import { createComment } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationComments() {
  const { toast } = useToast();
  const addComment = useStore((state) => state.addComment);
  const selectedPostId = useStore((state) => state.selectedPostId);

  const addNewComment = async (content: string) => {
    try {
      const newComment = await createComment(selectedPostId as string, content);
      addComment(newComment);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the comment",
        description:
          (error as Error).message ||
          "There was an error creating the comment. Please try again later.",
      });
    }
  };

  return { addNewComment };
}

export default useMutationComments;
