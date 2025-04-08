import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from '../utils/baseUrl';
import { CommentProps, PostResponse, SubredditResponse, SearchPostResponse } from "../types/types";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId: string) => {
    const response = await fetch(`${baseUrl}comments/${postId}.json?limit=10`);
    if (!response.ok) {
      throw new Error(`HTTP error fetching comments: ${response.status}`);
    }
    const data = await response.json();
    // Extract comments from the Reddit API response
    const comments = data[1].data.children.map((child: { data: CommentProps }) => child.data);
    return { postId, comments }; // Return postId along with comments
  }
);

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (subreddit: string = "all") => {
    const response = await fetch(`${baseUrl}r/${subreddit}/top.json?limit=10`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PostResponse = await response.json();
    return data.data.children.map((post) => post.data);
  }
);

export const fetchPostById = createAsyncThunk(
  "post/fetchPostById",
  async (postId) => {
    const response = await fetch(`${baseUrl}comments/${postId}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error fetching post: ${response.status}`);
    }
    const data = await response.json();
    return data[0].data.children[0].data;
  }
);

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query: string) => {
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${query}&limit=10`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: SearchPostResponse = await response.json();
    return data.data.children.map((child) => child.data);
  }
);

export const fetchSubreddits = createAsyncThunk(
  "subreddits/fetchSubreddits",
  async () => {
    const response = await fetch(`${baseUrl}subreddits/popular.json?`);
    if (!response.ok) {
      throw new Error(
        `HTTP error fetching subreddits! status ${response.status}`
      );
    }
    const data = await response.json();
    return data.data.children.map((subreddit: SubredditResponse) => subreddit.data);
  }
);
