import styles from "./Comments.module.scss";
import { CommentProps } from "../../../../types/types";

export default function Comments({
  showComments,
  comments,
  status,
  error,
}: {
  showComments: boolean;
  comments: CommentProps[];
  status: string;
  error: string;
}) {
  return (
    <section className={styles.commentsSection}>
      {status === "loading" && (
        <p data-testid="loading_comments">Loading comments...</p>
      )}
      {status === "failed" && (
        <p data-testid="error_comments">Error loading comments: {error}</p>
      )}
      {showComments &&
        comments.map(
          (comment, index) =>
            comment.author && (
              <div key={index} className={styles.comment} role="comment">
                <h4 data-testid="comment_author">{comment.author}</h4>
                <p data-testid="comment_body">{comment.body}</p>
              </div>
            )
        )}
    </section>
  );
}
