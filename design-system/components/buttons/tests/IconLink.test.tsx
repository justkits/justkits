import { render } from "@testing-library/react";

import { IconLink } from "@/IconLink";

describe("IconLink", () => {
  it("renders the icon correctly (no label)", () => {
    const { getByTestId } = render(
      <IconLink href="https://example.com">
        <span role="img" aria-label="icon" data-testid="icon">
          🔗
        </span>
      </IconLink>,
    );

    expect(getByTestId("icon")).toBeTruthy();
  });

  it("renders label in tooltip when provided", () => {
    const { getByText } = render(
      <IconLink href="https://example.com">
        <span role="img" aria-label="icon" data-testid="icon">
          🔗
        </span>
        <span className="sr-only">Tooltip Label</span>
      </IconLink>,
    );

    expect(getByText("Tooltip Label")).toBeTruthy();
  });
});
