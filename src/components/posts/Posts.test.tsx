import { expect, test, describe, vi, afterEach } from "vitest";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import MyMockPosts from "../../mocks/posts.mock";
import { mockPosts } from "../../mocks/redditAPI.mock";

// Reducers
import postsReducer from "../../features/posts/postsSlice";
import commentsReducer from "../../features/comments/commentsSlice";
import { Loading, Idle, Succeeded, Failed } from "../../types/types";

const idle = "idle";
const loading = "loading";
const failed = "failed";
const succeeded = "succeeded";

describe("Posts", () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Or vi.resetAllMocks()
  });

  test("should render loading state", async () => {
    const mockDispatch = vi.fn();
    const preloadedState = {
      posts: {
        posts: [],
        status: loading as Loading,
        error: "",
        query: "",
      },
      comments: {
        commentsByPostId: {},
        status: idle as Idle,
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

    expect(store.getState().posts.status).toBe(loading);
    render(
      <Provider store={store}>
        <MyMockPosts mockDispatch={mockDispatch} />
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
        status: failed as Failed,
        error: "Error loading posts",
        query: "",
      },
      comments: {
        commentsByPostId: {},
        status: idle as Idle,
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
    expect(store.getState().posts.status).toBe(failed);
    render(
      <Provider store={store}>
        <MyMockPosts mockDispatch={mockDispatch} />
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
        status: succeeded as Succeeded,
        error: "",
        query: "",
      },
      comments: {
        commentsByPostId: {},
        status: idle as Idle,
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
        <MyMockPosts mockDispatch={mockDispatch} />
      </Provider>
    );
    // screen.debug(); // <--- Inspect the initial DOM
    const postTitleElement = await screen.findByText(
      mockPosts.data.children[0].data.title
    );
    expect(postTitleElement).toBeInTheDocument();
    expect(storeWithDetails.getState().posts.status).toBe(succeeded);
  });
});
