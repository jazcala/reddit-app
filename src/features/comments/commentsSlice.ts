import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "../../api/api";
import { CommentProps, commentsSliceInitialStateProps } from "../../types/types";

const initialState: commentsSliceInitialStateProps = {
  commentsByPostId: {},
  status: "idle",
  error: "",
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        const { postId, comments } = action.payload as { postId: string; comments: CommentProps[] };
        state.commentsByPostId[postId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Fetch comments failed";
        console.log("Fetching comment failed", action.error);
      });
  },
});

export default commentsSlice.reducer;
