import { render } from "@testing-library/react";

import { Keyboard } from "@/Keyboard";

describe("Keyboard", () => {
  it("renders the key label", () => {
    const { getByText } = render(<Keyboard>⌘</Keyboard>);
    expect(getByText("⌘")).toBeTruthy();
  });

  it("renders a kbd element", () => {
    const { getByText } = render(<Keyboard>K</Keyboard>);
    expect(getByText("K").tagName).toBe("KBD");
  });

  it("applies size prop", () => {
    const { getByText } = render(<Keyboard size="large">Enter</Keyboard>);
    expect(getByText("Enter").tagName).toBe("KBD");
  });
});
