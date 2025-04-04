import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import Subreddits from "./Subreddits";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import subredditsReducer from "../../features/subreddits/subredditsSlice";
import postsReducer from "../../features/posts/postsSlice";
import commentsReducer from "../../features/comments/commentsSlice";

const createTestStore = () =>
  // initialState
  {
    return configureStore({
      reducer: {
        subreddits: subredditsReducer,
        posts: postsReducer,
        comments: commentsReducer,
      },
      // preloadedState: initialState,
    });
  };

describe("Subredit List", () => {
  test("should have subreddit as title", async () => {
    // const initialState = {
    //   posts: {
    //     posts: [],
    //     status: "idle",
    //     error: "",
    //     query: "",
    //   },
    //   subreddits: {
    //     subreddits: [
    //       {
    //         id: "1",
    //         name: "mario",
    //         display_name: "Mario",
    //         icon_img: "https://www.reddit.com/r/mario/",
    //       },
    //       {
    //         id: "2",
    //         name: "luigi",
    //         display_name: "Luigi",
    //         icon_img: "https://www.reddit.com/r/luigi/",
    //       },
    //       {
    //         id: "3",
    //         name: "peach",
    //         display_name: "Peach",
    //         icon_img: "https://www.reddit.com/r/peach/",
    //       },
    //     ],
    //     status: "succeeded",
    //     error: "",
    //   },

    //   comments: {
    //     commentsByPostId: {},
    //     status: "idle",
    //     error: "",
    //   },
    // };

    // const store = createTestStore(initialState);
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Subreddits />
      </Provider>
    );
    await expect(screen.getByText("Subreddits")).toBeVisible();
  });
});
