import useQueryComments from "@/hooks/use-query-comments";
import Comment from "./comment";
import { AddCommentDialog } from "./add-comment-dialog";

const Comments = () => {
  const { comments } = useQueryComments();

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
