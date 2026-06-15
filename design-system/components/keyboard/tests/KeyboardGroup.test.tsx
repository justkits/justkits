import { render } from "@testing-library/react";

import { KeyboardGroup } from "@/components/KeyboardGroup";

describe("KeyboardGroup", () => {
  it("handles alphabet key correctly", () => {
    const { getByText } = render(<KeyboardGroup keys="K" />);

    const element = getByText("K");
    expect(element.tagName).toBe("KBD");
    expect(element.ariaLabel).toBe("K");
  });

  it("handles numeric key correctly", () => {
    const { getByText } = render(<KeyboardGroup keys="1" />);

    const element = getByText("1");
    expect(element.tagName).toBe("KBD");
    expect(element.ariaLabel).toBe("1");
  });

  it("handles function key correctly", () => {
    const { getByText } = render(<KeyboardGroup keys="Enter" />);

    const element = getByText("Enter");
    expect(element.tagName).toBe("KBD");
    expect(element.ariaLabel).toBe("Enter");
  });

  it("handles special key correctly", () => {
    const { getByText } = render(<KeyboardGroup keys="Escape" />);

    const element = getByText("Escape");
    expect(element.tagName).toBe("KBD");
    expect(element.ariaLabel).toBe("Escape");
  });

  it("handles custom aria-label correctly", () => {
    const { getByTestId } = render(
      <KeyboardGroup
        keys="Ctrl+K"
        aria-label="Custom Label"
        data-testid="keyboard-group"
      />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.ariaLabel).toBe("Custom Label");
  });
});
