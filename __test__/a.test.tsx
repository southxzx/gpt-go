import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TextField from "../src/components/common/TextField";

describe("addition", () => {
  it("1 + 1 = 2", () => {
    expect(1 + 1).toBe(2);
  });
});

test('loading and display: Say Good Bye to "Lorem Ipsum"', async () => {
  render(<TextField alt="hello" />);
  expect(screen.findByAltText("hello"));
});
