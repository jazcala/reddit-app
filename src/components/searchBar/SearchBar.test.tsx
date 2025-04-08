import { render, screen } from "@testing-library/react";
import { expect, test, describe, beforeEach } from "vitest";
import SearchBar from "./SearchBar";
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
const store = createTestStore();

describe("Search Bar Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  });

  test("input field with Search Reddit placeholder", async () => {
    const inputField = screen.getByPlaceholderText("Search Reddit");
    expect(inputField).toBeInTheDocument();
  });

  test("expect search icon to be in the document", async () => {
    const searchIcon = screen.getByTestId("search-icon");
    await expect(searchIcon).toBeInTheDocument();
  });
});
