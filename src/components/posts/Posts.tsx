import styles from "./Posts.module.scss";
import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchPosts } from "../../api/api";
// types
import { postSliceInitialStateProps } from "../../types/types";
// components
import Post from "./post/Post";

export default function Posts() {
  // states
  const { posts, status, error, query } = useSelector(
    (state: { posts: postSliceInitialStateProps }) => state.posts
  );
  const dispatch = useDispatch<AppDispatch>();
  // Fetch posts from the API
  useEffect(() => {
    dispatch(fetchPosts("all"));
  }, [dispatch, query]);

  return (
    <section id="posts" className={styles.posts}>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error loading posts: {error}</p>}
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </section>
  );
}
