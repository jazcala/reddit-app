import { expect, test, describe, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Components
import MyMockSubreddits from "../../mocks/subreddits.mock";

// Reducers
import subredditsReducer from "../../features/subreddits/subredditsSlice";

// types
import { Idle, Loading, Failed, Succeeded } from "../../types/types";
import { mockSubreddits } from "../../mocks/redditAPI.mock";
const idle = "idle";
const loading = "loading";
const failed = "failed";
const succeeded = "succeeded";

describe("Subredits", () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Or vi.resetAllMocks()
  });
  test("should have reddits as title", () => {
    const preloadedState = {
      subreddits: {
        subreddits: [],
        status: idle as Idle,
        error: "",
      },
    };

    const testStore = configureStore({
      reducer: {
        subreddits: subredditsReducer,
      },
      preloadedState: preloadedState,
    });

    render(
      <Provider store={testStore}>
        <MyMockSubreddits mockDispatch={vi.fn()} />
      </Provider>
    );
    expect(screen.getByText("Subreddits")).toBeVisible();
  });
  test("should render subreddits", async () => {
    const mockDispatch = vi.fn();
    const preloadedState = {
      subreddits: {
        subreddits: mockSubreddits.data.children.map((child) => child.data),
        status: succeeded as Succeeded,
        error: "",
      },
    };
    const store = configureStore({
      reducer: {
        subreddits: subredditsReducer,
      },
      preloadedState,
    });

    expect(store.getState().subreddits.status).toBe(succeeded);

    render(
      <Provider store={store}>
        <MyMockSubreddits mockDispatch={mockDispatch} />
      </Provider>
    );
    // screen.debug();
    const subredditElem = await screen.findByText(
      mockSubreddits.data.children[0].data.display_name
    );
    expect(subredditElem).toBeInTheDocument();
    expect(subredditElem).toHaveTextContent(
      mockSubreddits.data.children[0].data.display_name
    );
    expect(subredditElem).toBeVisible();
  });

  test("should render loading state", async () => {
    const mockDispatch = vi.fn();
    const preloadedState = {
      subreddits: {
        subreddits: [],
        status: loading as Loading,
        error: "",
      },
    };
    const store = configureStore({
      reducer: {
        subreddits: subredditsReducer,
      },
      preloadedState,
    });

    expect(store.getState().subreddits.status).toBe(loading);

    render(
      <Provider store={store}>
        <MyMockSubreddits mockDispatch={mockDispatch} />
      </Provider>
    );
    // screen.debug();
    const loadingElement = await screen.findByTestId("loading_subreddits");
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveTextContent("Loading...");
    expect(loadingElement).toBeVisible();
  });

  test("should render error state", async () => {
    const mockDispatch = vi.fn();
    const preloadedState = {
      subreddits: {
        subreddits: [],
        status: failed as Failed,
        error: "some error",
      },
    };
    const store = configureStore({
      reducer: {
        subreddits: subredditsReducer,
      },
      preloadedState,
    });
    const status = store.getState().subreddits.status;
    expect(status).toBe(failed);

    render(
      <Provider store={store}>
        <MyMockSubreddits mockDispatch={mockDispatch} />
      </Provider>
    );
    // screen.debug();
    const errorElement = await screen.findByTestId("error_subreddits");
    expect(errorElement).toBeInTheDocument();
    const error = store.getState().subreddits.error;

    expect(errorElement).toHaveTextContent(
      `Error loading subreddits: ${error}`
    );
    expect(errorElement).toBeVisible();
  });
});
