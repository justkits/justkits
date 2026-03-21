import { fireEvent, render } from "@testing-library/react";

import { ControlledComponent } from "./_setup";

describe("Popover - trigger cornercases", () => {
  it("handles controlled open state correctly", () => {
    const { getByTestId, getByText } = render(<ControlledComponent />);

    const trigger = getByTestId("popover-trigger");
    fireEvent.click(trigger);

    const popoverContent = getByText("팝오버 메시지");

    expect(trigger.getAttribute("aria-controls")).toBe(popoverContent.id);
  });
});
