import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import Subreddits from "./Subreddits";

describe("Subredit List", () => {
  test("should have subreddit as title", async () => {
    render(<Subreddits />);
    await expect(screen.getByText("Subreddits")).toBeVisible();
  });
});
