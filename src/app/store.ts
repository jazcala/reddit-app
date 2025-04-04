import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "../features/subreddits/subredditsSlice";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
export type AppDispatch = typeof store.dispatch;
