import styles from "./Comments.module.scss";
import { CommentProps, postProps } from "../../../..//types/types";

export default function Comments({
  showComments,
  comments,
  status,
  error,
}: {
  post: postProps;
  showComments: boolean;
  comments: CommentProps[];
  status: string;
  error: string;
}) {
  return (
    <section className={styles.commentsSection}>
      {status === "loading" && <p>Loading comments...</p>}
      {status === "failed" && <p>Error loading comments: {error}</p>}
      {showComments &&
        comments.map(
          (comment, index) =>
            comment.author && (
              <div key={index} className={styles.comment}>
                <h4>{comment.author}</h4>
                <p>{comment.body}</p>
              </div>
            )
        )}
    </section>
  );
}
