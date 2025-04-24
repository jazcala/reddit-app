// __tests__/mocks/MockPosts.tsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { PostsState } from "../types/types";
import styles from "../components/posts/Posts.module.scss";
import { fetchPosts } from "../api/api";
import Post from "../components/posts/post/Post";

const loading = "loading";
const failed = "failed";

interface MockPostsProps {
  mockDispatch: AppDispatch;
}

const MyMockPosts: React.FC<MockPostsProps> = ({ mockDispatch }) => {
  const { posts, status, error, query } = useSelector(
    (state: { posts: PostsState }) => state.posts
  );
  const dispatch = mockDispatch;
  useEffect(() => {
    dispatch(fetchPosts("all"));
  }, [dispatch, query]);

  const statusElement = () => {
    if (status === loading) {
      return <p data-testid="loading_posts">Loading...</p>;
    }
    if (status === failed) {
      return <p data-testid="error_posts">Error loading posts: {error}</p>;
    }
    return null;
  };

  return (
    <section id="posts" className={styles.posts}>
      {status === loading || status === failed
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
};

export default MyMockPosts;
