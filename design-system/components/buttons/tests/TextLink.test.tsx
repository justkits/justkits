import { render } from "@testing-library/react";

import { TextLink } from "@/TextLink";

describe("TextLink", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <TextLink href="https://example.com">Click Me</TextLink>,
    );

    const link = getByText("Click Me");
    expect(link).toBeTruthy();
    expect(link.tagName).toBe("A");
  });
});
