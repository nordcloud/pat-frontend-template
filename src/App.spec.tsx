import * as React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

test("increases counter", async () => {
  render(<App />);

  const counter = screen.getByRole("button", { name: /count is/i });

  expect(counter.textContent).toMatchInlineSnapshot(`"count is: 0"`);
  userEvent.click(counter);
  expect(counter.textContent).toMatchInlineSnapshot(`"count is: 1"`);
});
