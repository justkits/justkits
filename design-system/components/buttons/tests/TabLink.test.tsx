import { render } from "@testing-library/react";

import { TabLink } from "@/TabLink";

describe("TabLink", () => {
  it("renders label correctly", () => {
    const { getByText } = render(<TabLink href="/tab">Tab Label</TabLink>);

    expect(getByText("Tab Label")).toBeTruthy();
  });

  it("handles active state correctly", () => {
    const { getByText } = render(
      <TabLink href="/tab" isActive>
        Tab Label
      </TabLink>,
    );

    expect(getByText("Tab Label")).toBeTruthy();
    expect(
      getByText("Tab Label").closest("a")?.getAttribute("aria-current"),
    ).toBe("page");
  });
});
