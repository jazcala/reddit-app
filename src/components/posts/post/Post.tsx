import { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import {
  postProps,
  commentsSliceInitialStateProps,
} from "../../../types/types";
import styles from "./Post.module.scss";
import Comments from "./comments/Comments";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { fetchComments } from "../../../api/api";

export default function Post({ post }: { post: postProps }) {
  const [showComments, setShowComments] = useState(false);

  const { commentsByPostId, status, error } = useSelector(
    (state: { comments: commentsSliceInitialStateProps }) => state.comments
  );
  const dispatch = useDispatch<AppDispatch>();

  // Handle click event to show comments
  const handleCommentsClick = () => {
    setShowComments((prev: boolean) => !prev);
    // fech comment for that post id
    dispatch(fetchComments(post.id));
  };

  return (
    <div className={styles.post}>
      {post.url.includes("jpg") ||
      post.url.includes("png") ||
      post.url.includes("jpeg") ? (
        <img src={post.url} alt={`Image of ${post.title}`} />
      ) : (
        <div className={styles.noImage}></div>
      )}
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <p className={styles.more}>
        <a href={post.url}>view article</a>
      </p>
      <div className={styles.bottom}>
        <div className={styles.author}>
          By <a href="#">{post.author}</a>
        </div>
        <div className={styles.score}>
          <BsHandThumbsDown />
          {post.score}
          <BsHandThumbsUp />
        </div>
        <button className={styles.comments} onClick={handleCommentsClick}>
          <FaRegComment />
          {post.num_comments}
        </button>
      </div>
      <Comments
        post={post}
        showComments={showComments}
        comments={commentsByPostId[post.id] || []}
        status={status}
        error={error}
      />
    </div>
  );
}
