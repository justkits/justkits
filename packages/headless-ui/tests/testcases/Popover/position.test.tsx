import { act, fireEvent, render, within } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("Popover - position", () => {
  beforeEach(() => {
    vi.spyOn(globalThis.window, "innerWidth", "get").mockReturnValue(800);
    vi.spyOn(globalThis.window, "innerHeight", "get").mockReturnValue(600);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const checkPopoverPosition = (
    popover: HTMLElement,
    expectedPosition: string,
  ) => {
    if (expectedPosition === "top") {
      expect(popover.style.top).toBe("0px");
      expect(popover.style.left).toBe("50%");
      expect(popover.style.transform).toBe(
        "translateX(calc(-50% + 16px)) translateY(calc(-100% + 0px))",
      );
    } else {
      expect(popover.style.bottom).toBe("0px");
      expect(popover.style.left).toBe("50%");
      expect(popover.style.transform).toBe(
        "translateX(calc(-50% + 16px)) translateY(calc(100% + 0px))",
      );
    }
  };

  const checkArrowPosition = (arrow: HTMLElement, expectedPosition: string) => {
    if (expectedPosition === "top") {
      // Popover above trigger → arrow sits at bottom of popover, pointing down
      expect(arrow.style.bottom).toBe("0px");
      expect(arrow.style.left).toBe("50%");
      expect(arrow.style.transform).toBe(
        "translateX(calc(-50% - 16px)) translateY(0px) rotate(45deg)",
      );
    } else {
      // Popover below trigger → arrow sits at top of popover, pointing up
      expect(arrow.style.top).toBe("0px");
      expect(arrow.style.left).toBe("50%");
      expect(arrow.style.transform).toBe(
        "translateX(calc(-50% - 16px)) translateY(0px) rotate(45deg)",
      );
    }
  };

  const renderAndClick = () => {
    const { getByTestId, getByRole } = render(<TestComponent arrow />);

    fireEvent.click(getByTestId("popover-trigger"));

    const popover = getByRole("dialog");

    return {
      popover,
      arrow: within(popover).getByTestId("popover-arrow"),
    };
  };

  // Simulate trigger at the bottom of the viewport so there is no space below.
  // left: 0 keeps the trigger at the left edge so shiftX remains 16px (same as the default).
  const needSpace = () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: 100,
      bottom: 600,
      left: 0,
      right: 50,
      width: 50,
      height: 20,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  };

  it("renders below the trigger by default", () => {
    const { popover, arrow } = renderAndClick();

    checkPopoverPosition(popover, "bottom");
    checkArrowPosition(arrow, "bottom");
  });

  it("flips to top when there is not enough space below", () => {
    needSpace();
    const { popover, arrow } = renderAndClick();

    checkPopoverPosition(popover, "top");
    checkArrowPosition(arrow, "top");
  });

  describe("scroll and resize", () => {
    // Two initial getBoundingClientRect calls (trigger + floating) use centered position.
    // Subsequent calls simulate the trigger moving to the bottom of the viewport after the event.
    const mockScrolledPosition = () => {
      const centered = {
        top: 300,
        bottom: 320,
        left: 375,
        right: 425,
        width: 50,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      };
      const atBottom = {
        top: 100,
        bottom: 600,
        left: 0,
        right: 50,
        width: 50,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      };
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect")
        .mockReturnValueOnce(centered)
        .mockReturnValueOnce(centered)
        .mockReturnValue(atBottom);
    };

    it("updates position when the window scrolls", () => {
      mockScrolledPosition();

      const { getByTestId, getByRole } = render(<TestComponent arrow />);
      fireEvent.click(getByTestId("popover-trigger"));

      const popover = getByRole("dialog");
      expect(popover.style.bottom).toBe("0px");

      act(() => {
        fireEvent.scroll(globalThis.window);
      });

      expect(popover.style.top).toBe("0px");
      expect(popover.style.transform).toContain("translateY(calc(-100%");
    });

    it("updates position when the window resizes", () => {
      mockScrolledPosition();

      const { getByTestId, getByRole } = render(<TestComponent arrow />);
      fireEvent.click(getByTestId("popover-trigger"));

      const popover = getByRole("dialog");
      expect(popover.style.bottom).toBe("0px");

      act(() => {
        fireEvent(globalThis.window, new Event("resize"));
      });

      expect(popover.style.top).toBe("0px");
      expect(popover.style.transform).toContain("translateY(calc(-100%");
    });

    it("updates position when the trigger element is resized", () => {
      let triggerResize: (() => void) | undefined;
      vi.stubGlobal(
        "ResizeObserver",
        class {
          constructor(cb: () => void) {
            triggerResize = cb;
          }
          observe() {
            // no-op
          }
          unobserve() {
            // no-op
          }
          disconnect() {
            // no-op
          }
        },
      );

      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect")
        .mockReturnValueOnce({
          top: 300,
          bottom: 320,
          left: 375,
          right: 425,
          width: 50,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => {},
        })
        .mockReturnValueOnce({
          top: 300,
          bottom: 320,
          left: 375,
          right: 425,
          width: 50,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => {},
        })
        .mockReturnValue({
          top: 100,
          bottom: 600,
          left: 0,
          right: 50,
          width: 50,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => {},
        });

      const { getByTestId, getByRole } = render(<TestComponent arrow />);
      fireEvent.click(getByTestId("popover-trigger"));

      const popover = getByRole("dialog");
      expect(popover.style.bottom).toBe("0px");

      act(() => {
        triggerResize?.();
      });

      expect(popover.style.top).toBe("0px");
      expect(popover.style.transform).toContain("translateY(calc(-100%");
    });
  });
});
