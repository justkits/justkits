import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("Popover - events", () => {
  it("handles popover on click correctly", () => {
    const { getByRole, getByTestId, queryByRole } = render(<TestComponent />);

    // Trigger는 항상 보인다
    const trigger = getByTestId("popover-trigger");
    expect(trigger).toBeTruthy();

    // 초기 상태는 닫힌 상태여야 한다
    expect(queryByRole("dialog")).toBeNull();

    // 트리거를 클릭하면 콘텐츠가 보여져야 한다
    fireEvent.click(trigger);
    expect(getByRole("dialog")).toBeTruthy();

    // 트리거를 다시 클릭하면 콘텐츠가 숨겨져야 한다
    fireEvent.click(trigger);
    expect(queryByRole("dialog")).toBeNull();
  });

  it("moves focus to dialog when no focusable elements exist", () => {
    const { getByRole, getByTestId } = render(<TestComponent />);

    fireEvent.click(getByTestId("popover-trigger"));
    const dialog = getByRole("dialog");

    expect(document.activeElement).toBe(dialog);
  });

  it("keeps focus on dialog when Tab is pressed with no focusable elements", () => {
    const { getByRole, getByTestId } = render(<TestComponent />);

    fireEvent.click(getByTestId("popover-trigger"));
    const dialog = getByRole("dialog");

    // dialog is focused; Tab should stay on the dialog
    fireEvent.keyDown(document, { key: "Tab", shiftKey: false });

    expect(document.activeElement).toBe(dialog);
  });

  it("moves focus to first focusable element when popover opens", () => {
    const { getByTestId } = render(
      <TestComponent>
        <button data-testid="first-button">첫 번째</button>
        <button data-testid="last-button">마지막</button>
      </TestComponent>,
    );

    fireEvent.click(getByTestId("popover-trigger"));

    expect(document.activeElement).toBe(getByTestId("first-button"));
  });

  it("wraps Tab focus from last element back to first", () => {
    const { getByTestId } = render(
      <TestComponent>
        <button data-testid="first-button">첫 번째</button>
        <button data-testid="last-button">마지막</button>
      </TestComponent>,
    );

    fireEvent.click(getByTestId("popover-trigger"));

    getByTestId("last-button").focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: false });

    expect(document.activeElement).toBe(getByTestId("first-button"));
  });

  it("wraps Shift+Tab focus from first element back to last", () => {
    const { getByTestId } = render(
      <TestComponent>
        <button data-testid="first-button">첫 번째</button>
        <button data-testid="last-button">마지막</button>
      </TestComponent>,
    );

    fireEvent.click(getByTestId("popover-trigger"));

    // first-button is already focused via auto-focus
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });

    expect(document.activeElement).toBe(getByTestId("last-button"));
  });

  it("does not move focus when a non-Tab key is pressed", () => {
    const { getByTestId } = render(
      <TestComponent>
        <button data-testid="first-button">첫 번째</button>
        <button data-testid="last-button">마지막</button>
      </TestComponent>,
    );

    fireEvent.click(getByTestId("popover-trigger"));

    // first-button is focused via auto-focus; non-Tab key should not change focus
    fireEvent.keyDown(document, { key: "Enter" });

    expect(document.activeElement).toBe(getByTestId("first-button"));
  });

  it("does not move focus when Tab is pressed while focus is outside the popover", () => {
    const { getByTestId } = render(
      <TestComponent>
        <button data-testid="first-button">첫 번째</button>
        <button data-testid="last-button">마지막</button>
      </TestComponent>,
    );

    fireEvent.click(getByTestId("popover-trigger"));

    const outsideButton = getByTestId("outside-button");
    outsideButton.focus();
    fireEvent.keyDown(document, { key: "Tab" });

    expect(document.activeElement).toBe(outsideButton);
  });

  it("does not move focus when Tab is pressed on a middle element", () => {
    const { getByTestId } = render(
      <TestComponent>
        <button data-testid="first-button">첫 번째</button>
        <button data-testid="middle-button">중간</button>
        <button data-testid="last-button">마지막</button>
      </TestComponent>,
    );

    fireEvent.click(getByTestId("popover-trigger"));

    const middle = getByTestId("middle-button");
    middle.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: false });

    expect(document.activeElement).toBe(middle);
  });

  it("closes when clicking outside the popover and trigger", () => {
    const { getByTestId, queryByRole } = render(<TestComponent />);

    fireEvent.click(getByTestId("popover-trigger"));

    act(() => {
      getByTestId("outside-button").dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );
    });

    expect(queryByRole("dialog")).toBeNull();
  });

  it("closes when touching outside the popover and trigger", () => {
    const { getByTestId, queryByRole } = render(<TestComponent />);

    fireEvent.click(getByTestId("popover-trigger"));

    act(() => {
      getByTestId("outside-button").dispatchEvent(
        new TouchEvent("touchstart", { bubbles: true }),
      );
    });

    expect(queryByRole("dialog")).toBeNull();
  });

  it("closes when Escape is pressed", () => {
    const { getByTestId, queryByRole } = render(<TestComponent />);

    fireEvent.click(getByTestId("popover-trigger"));
    fireEvent.keyDown(document, { key: "Escape" });

    expect(queryByRole("dialog")).toBeNull();
  });

  it("returns focus to trigger when popover closes", () => {
    const { getByTestId } = render(
      <TestComponent>
        <button data-testid="first-button">첫 번째</button>
      </TestComponent>,
    );

    const trigger = getByTestId("popover-trigger");
    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(document.activeElement).toBe(trigger);
  });
});
