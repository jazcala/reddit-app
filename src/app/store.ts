import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from "../features/subreddits/subredditsSlice";
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    subreddits: subredditsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
export type AppDispatch = typeof store.dispatch;
