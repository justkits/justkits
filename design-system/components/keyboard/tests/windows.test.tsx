import { render } from "@testing-library/react";

import { KeyboardGroup } from "@/components/KeyboardGroup";

vi.hoisted(() => {
  Object.defineProperty(navigator, "userAgent", {
    value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    configurable: true,
  });
});

describe("KeyboardGroup - windows", () => {
  it("handles control key on Windows correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Ctrl+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Control K");

    // Ctrl and K should be rendered as separate keys
    // only test existence
    expect(getByText("Ctrl")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });

  it("handles shift key on Windows correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Shift+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Shift K");

    // Shift and K should be rendered as separate keys
    // only test existence
    expect(getByText("Shift")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });

  it("handles alt key on Windows correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Alt+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Alt K");

    // Alt and K should be rendered as separate keys
    // only test existence
    expect(getByText("Alt")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });

  it("meta key falls back to Win key on Windows correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Cmd+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Command K");

    // Win and K should be rendered as separate keys
    // only test existence
    expect(getByText("Win")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });

  it("handles Windows key correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Win+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Windows K");

    // Win and K should be rendered as separate keys
    // only test existence
    expect(getByText("Win")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });

  it("handles mod key falls back to Ctrl key on Windows correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Mod+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Control K");

    // Ctrl and K should be rendered as separate keys
    // only test existence
    expect(getByText("Ctrl")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });
});
