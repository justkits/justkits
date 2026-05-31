import { render } from "@testing-library/react";

import { IconButton } from "@/IconButton/IconButton";

describe("IconButton", () => {
  it("renders icon and label correctly", () => {
    const { getByText } = render(
      <IconButton>
        <span>Icon</span>
        <span>Label</span>
      </IconButton>,
    );

    expect(getByText("Icon")).toBeTruthy();
    expect(getByText("Label")).toBeTruthy();
  });
});
