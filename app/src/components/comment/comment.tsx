import useQueryComments from "@/hooks/use-query-comments";
import Comment from "./comment";
import { AddCommentDialog } from "./add-comment-dialog";
import { useStore } from "@/lib/store";

const Comments = () => {
  const { comments } = useQueryComments();
  const user = useStore((state) => state.user);

  if (!user) {
    return (
      <div className="p-4 text-center border-b border-slate-400">
        Please sign in to see the comments
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <AddCommentDialog />
      </div>
      <div>
        {comments.length === 0 ? (
          <div className="p-4 text-center border-b border-slate-400">
            No comments yet.
          </div>
        ) : (
          comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
