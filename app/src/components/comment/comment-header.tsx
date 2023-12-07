import { formatTimestamp } from "@/lib/utils";

type CommentHeaderProps = {
  name: string; // author's display name
  username: string; // author's username
  timestamp: string; // post's timestamp
};

const CommentHeader = ({ name, username, timestamp }: CommentHeaderProps) => {
  return (
    <div className="flex justify-between text-sm text-muted-foreground">
      <p>
        {name} ({`@${username}`})
      </p>
      <p>{formatTimestamp(timestamp)}</p>
    </div>
  );
};

export default CommentHeader;
