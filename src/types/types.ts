
// Subreddits
export interface subredditProps {
  id: number,
  url: string,
  icon_img: string,
  display_name: string,
}

export interface subredditsSliceInitialStateProps {
  subreddits: subredditProps[];
  status: string;
  error: string;
}
