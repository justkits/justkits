import { render } from "@testing-library/react";

import { KeyboardGroup } from "@/components/KeyboardGroup";

vi.hoisted(() => {
  Object.defineProperty(navigator, "userAgent", {
    value: "Mozilla/5.0 (Macintosh; Intel Mac OS X)",
    configurable: true,
  });
});

describe("KeyboardGroup - mac", () => {
  it("handles control key on Mac correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Ctrl+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Control K");

    // Cmd and K should be rendered as separate keys
    // only test existence
    expect(getByText("^")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });

  it("handles shift key on Mac correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Shift+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Shift K");

    // Shift and K should be rendered as separate keys
    // only test existence
    expect(getByText("⇧")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });

  it("alt key falls back to Option key on Mac correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Alt+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Option K");

    // Option and K should be rendered as separate keys
    // only test existence
    expect(getByText("⌥")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });

  it("meta key falls back to Command key on Mac correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Cmd+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Command K");

    // Cmd and K should be rendered as separate keys
    // only test existence
    expect(getByText("⌘")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });

  it("mod key falls back to Command key on Mac correctly", () => {
    const { getByTestId, getByText } = render(
      <KeyboardGroup keys="Mod+K" data-testid="keyboard-group" />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.tagName).toBe("KBD");
    expect(groupElement.ariaLabel).toBe("Command K");

    // Cmd and K should be rendered as separate keys
    // only test existence
    expect(getByText("⌘")).toBeTruthy();
    expect(getByText("K")).toBeTruthy();
  });
});
