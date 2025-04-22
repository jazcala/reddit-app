import { createSlice } from "@reduxjs/toolkit";
import { fetchSubreddits } from "../../api/api";
import { SubredditsState } from '../../types/types'

const initialState: SubredditsState = {
  subreddits: [],
  status: "idle",
  error: "",
};

const all = {
  id: 0,
  url: "",
  icon_img: "",
  display_name: "all",
};

export const subredditsSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subreddits = [all, ...action.payload];
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message ?? "Fetch subreddits failed";
      });
  },
})

export default subredditsSlice.reducer;
