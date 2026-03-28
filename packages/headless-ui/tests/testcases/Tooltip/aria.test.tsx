import { render } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("Tooltip - aria", () => {
  describe("ID", () => {
    it("Tooltip.Message's ID matches Tooltip.Trigger's aria-describedby", () => {
      const { getByTestId } = render(<TestComponent mode="always-open" />);

      const trigger = getByTestId("tooltip-trigger");

      const message = getByTestId("tooltip-message");
      expect(trigger.getAttribute("aria-describedby")).toBe(message.id);
    });
  });

  describe("Attributes", () => {
    it("Tooltip.Content has role=tooltip", () => {
      const { getByTestId } = render(<TestComponent mode="always-open" />);

      const content = getByTestId("tooltip-content");
      expect(content.getAttribute("role")).toBe("tooltip");
    });

    it("Tooltip.Trigger does not have aria-haspopup=tooltip", () => {
      const { getByTestId } = render(<TestComponent mode="always-open" />);

      expect(getByTestId("tooltip-trigger").getAttribute("aria-haspopup")).toBe(
        null,
      );
    });
  });
});
