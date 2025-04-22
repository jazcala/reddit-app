import styles from "./Posts.module.scss";
import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchPosts } from "../../api/api";
// types
import { PostsState } from "../../types/types";
// components
import Post from "./post/Post";

export default function Posts() {
  // states
  const { posts, status, error, query } = useSelector(
    (state: { posts: PostsState }) => state.posts
  );
  const dispatch = useDispatch<AppDispatch>();
  // Fetch posts from the API
  useEffect(() => {
    dispatch(fetchPosts("all"));
  }, [dispatch, query]);

  const statusElement = () => {
    if (status === "failed") {
      return <p data-testid="error_posts">Error loading posts: {error}</p>;
    }
    if (status === "loading") {
      return <p data-testid="loading_posts">Loading...</p>;
    }
    return null;
  };

  return (
    <section id="posts" className={styles.posts}>
      {status === "loading" || status === "failed"
        ? statusElement()
        : posts.map((post, index) => (
            <Post
              data-testid={`post_${index}_${post.title}`}
              key={index}
              post={post}
            />
          ))}
    </section>
  );
}
