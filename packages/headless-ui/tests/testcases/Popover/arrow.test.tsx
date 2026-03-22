import { fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("Popover - arrow", () => {
  it("renders arrow when 'arrow' prop is true", () => {
    const { getByTestId } = render(<TestComponent arrow />);

    fireEvent.click(getByTestId("popover-trigger"));

    // Arrow는 'arrow' prop이 true일 때 렌더되어야 한다
    expect(getByTestId("popover-arrow")).toBeTruthy();
  });

  it("does not render arrow when 'arrow' prop is false", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    fireEvent.click(getByTestId("popover-trigger"));

    // Arrow는 'arrow' prop이 false일 때 렌더되지 않아야 한다
    expect(queryByTestId("popover-arrow")).toBeNull();
  });
});
