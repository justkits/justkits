import { render } from "@testing-library/react";

import { Link } from "@/Link";

describe("Link", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Link href="https://example.com">
        <span>Click me</span>
      </Link>,
    );

    expect(getByText("Click me")).toBeTruthy();
  });
});
