import { expect, test, describe, vi, afterEach } from "vitest";
import { screen, render } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useEffect } from "react";
import postsReducer from "../../features/posts/postsSlice";
import commentsReducer from "../../features/comments/commentsSlice";
import { AppDispatch } from "../../app/store";
import { mockPosts } from "../../mocks/redditAPI.mock";
import { PostsState } from "../../types/types";
import styles from "./Posts.module.scss";
import Post from "./post/Post";
import { fetchPosts } from "../../api/api";

type succeeded = "succeeded";
type loading = "loading";
type idle = "idle";
type failed = "failed";

// Mock Post component
const MockPosts = ({ mockDispatch }: { mockDispatch: AppDispatch }) => {
  const { posts, status, error, query } = useSelector(
    (state: { posts: PostsState }) => state.posts
  );
  const dispatch = mockDispatch;
  useEffect(() => {
    dispatch(fetchPosts("all"));
  }, [dispatch, query]);

  const statusElement = () => {
    if (status === "loading") {
      return <p data-testid="loading_posts">Loading...</p>;
    }
    if (status === "failed") {
      return <p data-testid="error_posts">Error loading posts: {error}</p>;
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
};

describe("Posts", () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Or vi.resetAllMocks()
  });

  test("should render loading state", async () => {
    const mockDispatch = vi.fn();
    const preloadedState = {
      posts: {
        posts: [],
        status: "loading" as loading,
        error: "",
        query: "",
      },
      comments: {
        commentsByPostId: {},
        status: "idle" as idle,
        error: "",
      },
    };
    const store = configureStore({
      reducer: {
        posts: postsReducer,
        comments: commentsReducer,
      },
      preloadedState,
    });

    expect(store.getState().posts.status).toBe("loading");
    render(
      <Provider store={store}>
        <MockPosts mockDispatch={mockDispatch} />
      </Provider>
    );
    const loadingElement = await screen.findByTestId("loading_posts");
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveTextContent("Loading...");
  });

  test("should render error state", () => {
    const mockDispatch = vi.fn();
    const preloadedState = {
      posts: {
        posts: [],
        status: "failed" as failed,
        error: "Error loading posts",
        query: "",
      },
      comments: {
        commentsByPostId: {},
        status: "idle" as idle,
        error: "",
      },
    };
    const store = configureStore({
      reducer: {
        posts: postsReducer,
        comments: commentsReducer,
      },
      preloadedState,
    });
    expect(store.getState().posts.status).toBe("failed");
    render(
      <Provider store={store}>
        <MockPosts mockDispatch={mockDispatch} />
      </Provider>
    );
    // screen.debug(); // <--- Inspect the initial DOM
    const errorElement = screen.getByTestId("error_posts");
    expect(errorElement).toHaveTextContent(
      `Error loading posts: ${preloadedState.posts.error}`
    );
  });

  test("should render post details when provided", async () => {
    const mockDispatch = vi.fn();

    const preloadedState = {
      posts: {
        posts: mockPosts.data.children.map((child) => child.data),
        status: "succeeded" as succeeded,
        error: "",
        query: "",
      },
      comments: {
        commentsByPostId: {},
        status: "idle" as idle,
        error: "",
      },
    };
    const storeWithDetails = configureStore({
      reducer: {
        posts: postsReducer,
        comments: commentsReducer,
      },
      preloadedState,
    });
    render(
      <Provider store={storeWithDetails}>
        <MockPosts mockDispatch={mockDispatch} />
      </Provider>
    );
    // screen.debug(); // <--- Inspect the initial DOM
    const postTitleElement = await screen.findByText(
      mockPosts.data.children[0].data.title
    );
    expect(postTitleElement).toBeInTheDocument();
    expect(storeWithDetails.getState().posts.status).toBe("succeeded");
  });
});
