import SearchBar from "./SearchBar";
import { render, screen } from "@testing-library/react";

import { expect, test, describe, beforeEach } from "vitest";

describe("Search Bar Component", () => {
  beforeEach(() => {
    render(<SearchBar />);
  });

  test("input field with Search Reddit placeholder", async () => {
    const inputField = screen.getByPlaceholderText("Search Reddit");
    expect(inputField).toBeInTheDocument();
  });

  test("expect search icon to be in the document", async () => {
    const searchIcon = screen.getByTestId("search-icon");
    await expect(searchIcon).toBeInTheDocument();
  });
});
