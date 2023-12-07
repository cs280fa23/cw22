import { useToast } from "@/components/ui/use-toast";
import { fetchComments } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function useQueryComments() {
  const { toast } = useToast();
  const comments = useStore((state) => state.comments);
  const setComments = useStore((state) => state.setComments);
  const clearComments = useStore((state) => state.clearComments);
  const selectedPostId = useStore((state) => state.selectedPostId);

  const loadComments = async () => {
    try {
      const fetchedComments = await fetchComments(selectedPostId as string);
      setComments(fetchedComments);
    } catch (error) {
      clearComments();
      toast({
        variant: "destructive",
        title: "Failed to fetch comments",
        description:
          (error as Error).message ||
          "There was an error loading the comments. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (selectedPostId) {
      loadComments();
    } else {
      clearComments();
    }
  }, [selectedPostId]);

  return { comments };
}

export default useQueryComments;
