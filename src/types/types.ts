// Subreddits
export interface subredditProps {
  id: string;
  name: string;
  display_name: string;
  title: string;
  url: string;
  subreddit_type: "public" | "restricted" | "private" | "gold_only" | "archived" | "employees_only";
}

export interface SubredditResponse {
  kind: string;
  data: subredditProps;
}

export interface subredditsSliceInitialStateProps {
  subreddits: subredditProps[];
  status: string;
  error: string;
}
export interface postProps {
  id: string;
  title: string;
  author: string;
  description: string;
  subreddit: string;
  url: string;
  permalink: string;
  score: number;
  num_comments: number;
  created_utc: number;
  thumbnail: string;
  icon_img: string;
}

export interface postSliceInitialStateProps {
  posts: postProps[];
  status: string;
  error: string;
  query: string;
}

// Api
export interface PostResponse {
  data: {
    children: Array<{
      data: postProps;
    }>;
  };
}

export interface SearchPostResponse {
  data: {
    children: Array<{
      data: postProps;
    }>;
  };
}
