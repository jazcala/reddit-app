import { render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";

import Header from "./Header";

describe("Reddit App header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test("Reddit App is the header", async () => {
    await expect(screen.getByText("Reddit App")).toBeInTheDocument();
  });

  test("Reddit icon is display in the header", async () => {
    const redditIcon = screen.getByTestId("reddit-icon");
    await expect(redditIcon).toBeInTheDocument();
  });
});
