// Subreddits
export interface SubredditProps {
  id: string;
  name: string;
  display_name: string;
  icon_img: string;
}

export interface SubredditResponse {
  data: {
    children: Array<{
      data: SubredditProps;
    }>;
  };
}

export interface SubredditsState {
  subreddits: SubredditProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Posts
export interface PostsProps {
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

export interface PostsState {
  posts: PostsProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  query: string;
}

export interface PostResponse {
  data: {
    children: Array<{
      data: PostsProps;
    }>;
  };
}

export interface SearchPostResponse {
  data: {
    children: Array<{
      data: PostsProps;
    }>;
  };
}

// Comments
export interface CommentProps {
  id: string;
  body: string;
  author: string;
}

export interface CommentResponse {
  data: {
    children: Array<{
      data: CommentProps;
    }>;
  };
}
export interface CommentsState {
  commentsByPostId: Record<string, CommentProps[]>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
