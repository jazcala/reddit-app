import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import { Loading, Failed, Succeeded } from "../../../../types/types";
import Comments from "./Comments";
import { mockComments } from "../../../../mocks/redditAPI.mock";

const loading = "loading";
const failed = "failed";
const succeeded = "succeeded";

describe("Comments", () => {
  test("should render loading state", () => {
    const mockProps = {
      showComments: true,
      comments: [],
      status: loading as Loading,
      error: "",
    };

    render(<Comments {...mockProps} />);
    // screen.debug();
    const loadingElement = screen.getByTestId("loading_comments");
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveTextContent("Loading comments...");
  });

  test("should render error state", () => {
    const mockProps = {
      showComments: true,
      comments: [],
      status: failed as Failed,
      error: "Error loading comments",
    };
    render(<Comments {...mockProps} />);
    // screen.debug();
    const errorElement = screen.getByTestId("error_comments");

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(
      `Error loading comments: ${mockProps.error}`
    );
  });
  test("should render comments", () => {
    const mockProps = {
      showComments: true,
      comments: mockComments["1"],
      status: succeeded as Succeeded,
      error: "",
    };
    render(<Comments {...mockProps} />);
    // screen.debug();
    const comments = screen.getAllByRole("comment");
    expect(comments.length).toBe(2);
    const author = screen.getAllByTestId("comment_author");
    const commentBody = screen.getAllByTestId("comment_body");
    expect(author[0]).toHaveTextContent(mockProps.comments[0].author);
    expect(commentBody[0]).toHaveTextContent(mockProps.comments[0].body);
  });
  test("should no render comments", () => {
    const mockProps = {
      showComments: false,
      comments: mockComments["1"],
      status: succeeded as Succeeded,
      error: "",
    };
    render(<Comments {...mockProps} />);
    // screen.debug();
    const comments = screen.queryAllByRole("comment");
    expect(comments.length).toBe(0);
  });
});
