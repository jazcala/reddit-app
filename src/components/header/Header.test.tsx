import { expect, test, describe } from "vitest";
import { render } from "vitest-browser-react";
import Header from "./Header";

describe("Reddit App header", () => {
  test("Reddit App is the header", async () => {
    const { getByText } = render(<Header />);
    await expect.element(getByText("Reddit App")).toBeInTheDocument();
  });
});
