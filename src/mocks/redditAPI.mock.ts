import { CommentProps, PostResponse, SubredditResponse } from "../types/types";

export const mockPosts: PostResponse = {
  data: {
    children: [{
      data: {
        id: "1",
        title: "Test Post 1",
        author: "test_author_1",
        description: "Some description 1",
        subreddit: "test",
        url: "https://i.redd.it/ochkndwwuvue1.jpeg",
        permalink: "/r/test/comments/1",
        score: 100,
        num_comments: 10,
        created_utc: 1620000000,
        thumbnail: "https://www.example.com/thumbnail1.jpg",
        icon_img: "https://www.example.com/icon1.png",
      },
    },
    {
      data: {
        id: "2",
        title: "Test Post 2",
        author: "test_author_2",
        description: "Some description 2",
        subreddit: "test",
        url: "https://i.redd.it/dwwv3hi52uue1.jpeg",
        permalink: "/r/test/comments/2",
        score: 200,
        num_comments: 20,
        created_utc: 1620000000,
        thumbnail: "https://www.example.com/thumbnail2.jpg",
        icon_img: "https://www.example.com/icon2.png",
      },
    }]
  }
};

export const mockSubreddits: SubredditResponse = {
  data: {
    children: [
      {
        data: {
          id: "1",
          name: "name 1",
          display_name: "Home",
          icon_img: "https://www.example.com/icon1.png",
        },
      },
      {
        data: {
          id: "2",
          name: "name 2",
          display_name: "AskReddit",
          icon_img: "https://www.example.com/icon2.png",

        },
      },
      {
        data: {
          id: "3",
          name: "name 3",
          display_name: "NoStupidQuestions",
          icon_img: "https://www.example.com/icon3.png",
        },
      },
      {
        data: {
          id: "4",
          name: "name 4",
          display_name: "Facepalm",
          icon_img: "https://www.example.com/icon4.png",
        },
      },
      {
        data: {
          id: "5",
          name: "name 5",
          display_name: "Pics",
          icon_img: "https://www.example.com/icon5.png",
        },
      },
    ],
  },
};

export const mockComments: Record<string, CommentProps[]> = {
  "1": [
    {
      id: "1",
      body: "This is a test comment.1",
      author: "comment_author_1",
    }
    , {
      id: "2",
      body: "This is a test comment. 2",
      author: "comment_author_2",
    }

  ]
};
