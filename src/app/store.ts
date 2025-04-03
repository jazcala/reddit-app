import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "../features/subreddits/subredditsSlice";
import postsReducer from "../features/posts/postsSlice";
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
export type AppDispatch = typeof store.dispatch;
