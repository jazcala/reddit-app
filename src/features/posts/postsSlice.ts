import { createSlice } from "@reduxjs/toolkit";
import { fetchPostById, fetchPosts, fetchSearchResults } from "../../api/api";
import { PostsState } from "../../types/types";

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: "",
  query: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    setScore: (state, action) => {
      const { postId, newScore } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.score = newScore;
      }
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || "Fetch posts failed";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        const existingPost = state.posts.find(
          (post) => post.id === action.payload.id
        );
        if (!existingPost) {
          state.posts.push({ ...action.payload, voteState: "neutral" });
        }
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = 'loading';
        state.error = "";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = "";
        state.posts = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || "Fetch searched posts failed";
      });
  },
});

export const selectPostById = (state: PostsState, postId: string) =>
  state.posts.find((post) => post.id === postId);

export const { setScore,
  setQuery } = postSlice.actions;
export default postSlice.reducer;
