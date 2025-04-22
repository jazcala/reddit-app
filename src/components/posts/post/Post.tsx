import { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { PostsProps, CommentsState } from "../../../types/types";
import styles from "./Post.module.scss";
import Comments from "./comments/Comments";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { fetchComments } from "../../../api/api";
import { setScore } from "../../../features/posts/postsSlice";

export default function Post({ post }: { post: PostsProps }) {
  const [showComments, setShowComments] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);

  const { commentsByPostId, status, error } = useSelector(
    (state: { comments: CommentsState }) => state.comments
  );
  const dispatch = useDispatch<AppDispatch>();

  // Handle click event to show comments
  const handleCommentsClick = () => {
    setShowComments((prev: boolean) => !prev);
    // fech comment for that post id
    dispatch(fetchComments(post.id));
  };

  const handleClickScore = (direction: string) => {
    if (post.score) {
      let scoreChange = 0;
      let newThumbsUp = thumbsUp;
      let newThumbsDown = thumbsDown;

      if (direction === "up") {
        if (thumbsUp) {
          scoreChange = -1;
          newThumbsUp = false;
        } else if (thumbsDown) {
          scoreChange = 2;
          newThumbsUp = true;
          newThumbsDown = false;
        } else {
          scoreChange = 1;
          newThumbsUp = true;
        }
      } else if (direction === "down") {
        if (thumbsDown) {
          scoreChange = 1;
          newThumbsDown = false;
        } else if (thumbsUp) {
          scoreChange = -2;
          newThumbsDown = true;
          newThumbsUp = false;
        } else {
          scoreChange = -1;
          newThumbsDown = true;
        }
      }

      dispatch(
        setScore({ postId: post.id, newScore: post.score + scoreChange })
      );
      setThumbsUp(newThumbsUp);
      setThumbsDown(newThumbsDown);
    }
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
          <BsHandThumbsDown
            className={thumbsDown ? styles.thumbsDown : ""}
            onClick={() => handleClickScore("down")}
          />
          {post.score}
          <BsHandThumbsUp
            className={thumbsUp ? styles.thumbsUp : ""}
            onClick={() => handleClickScore("up")}
          />
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
        error={error || ""}
      />
    </div>
  );
}
