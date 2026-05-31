import { render } from "@testing-library/react";

import { IconButton, TabLink } from "@/components/Buttons";

describe("IconButton", () => {
  it("renders correctly without label", () => {
    const { getByTestId } = render(
      <IconButton icon="chevron-right" data-testid="icon-button" />,
    );

    expect(getByTestId("icon-button")).toBeTruthy();
  });

  it("renders buttons with labels of different sizes", () => {
    const { getByText } = render(
      <>
        <IconButton icon="check-fill" label="Home" size="small" />
        <IconButton icon="chevron-down" label="Profile" size="medium" />
        <IconButton icon="chevron-right" label="Settings" size="large" />
      </>,
    );

    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Profile")).toBeTruthy();
    expect(getByText("Settings")).toBeTruthy();
  });
});

describe("TabLink", () => {
  it("renders the label correctly", () => {
    const { getByText } = render(<TabLink label="Home" href="/home" />);
    expect(getByText("Home")).toBeTruthy();
  });

  it("applies active styles when active prop is true", () => {
    const { getByText } = render(
      <TabLink label="Profile" href="/profile" isActive />,
    );

    const label = getByText("Profile");
    expect(label).toBeTruthy();
    expect(label.className).toContain("isActive");
  });
});
