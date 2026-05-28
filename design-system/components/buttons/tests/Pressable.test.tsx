import { render } from "@testing-library/react";

import { Pressable } from "@/Pressable";

describe("Pressable", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Pressable>
        <span>Click me</span>
      </Pressable>,
    );
    expect(getByText("Click me")).toBeTruthy();
  });
});
