import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import Subreddits from "./Subreddits";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import subredditsReducer from "../../features/subreddits/subredditsSlice";
import postsReducer from "../../features/posts/postsSlice";
import commentsReducer from "../../features/comments/commentsSlice";

const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      subreddits: subredditsReducer,
      posts: postsReducer,
      comments: commentsReducer,
    },
    preloadedState: initialState,
  });
};

describe("Subredit List", () => {
  test("should have subreddit as title", async () => {
    const initialState = {
      posts: {
        posts: [],
        status: "idle",
        error: "",
        query: "",
      },
      subreddits: {
        subreddits: [
          {
            id: "1",
            name: "mario",
            display_name: "Mario",
            title: "Mario Subreddit",
            url: "https://www.reddit.com/r/mario/",
            subreddit_type: "public",
          },
          {
            id: "2",
            name: "luigi",
            display_name: "Luigi",
            title: "Luigi Subreddit",
            url: "https://www.reddit.com/r/luigi/",
            subreddit_type: "restricted",
          },
          {
            id: "3",
            name: "peach",
            display_name: "Peach",
            title: "Peach Subreddit",
            url: "https://www.reddit.com/r/peach/",
            subreddit_type: "private",
          },
        ],
        status: "succeeded",
        error: "",
      },

      comments: {
        commentsByPostId: {},
        status: "idle",
        error: "",
      },
    };

    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Subreddits />
      </Provider>
    );
    await expect(screen.getByText("Subreddits")).toBeVisible();
  });
});
