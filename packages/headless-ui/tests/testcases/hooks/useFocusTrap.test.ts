import { renderHook } from "@testing-library/react";

import { useFocusTrap } from "@/_hooks/useFocusTrap";

describe("useFocusTrap - cornercases", () => {
  it("does not intercept Tab when isActive is false", () => {
    const container = document.createElement("div");
    const button = document.createElement("button");
    container.appendChild(button);
    document.body.appendChild(container);
    button.focus();

    renderHook(() =>
      useFocusTrap({ current: container }, { current: null }, false),
    );

    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );

    expect(document.activeElement).toBe(button);

    container.remove();
  });

  it("does not intercept Tab when floatingRef is null", () => {
    const button = document.createElement("button");
    document.body.appendChild(button);
    button.focus();

    renderHook(() => useFocusTrap({ current: null }, { current: null }, true));

    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );

    expect(document.activeElement).toBe(button);

    button.remove();
  });
});
