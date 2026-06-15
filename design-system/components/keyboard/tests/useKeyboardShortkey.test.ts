import { renderHook, fireEvent } from "@testing-library/react";

import { useKeyboardShortkey } from "@/hooks/useKeyboardShortkey";

describe("useKeyboardShortkey", () => {
  describe("calls callback", () => {
    it("when simple shortkey is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("K", callback));

      fireEvent.keyDown(document, { key: "k" });
      expect(callback).toHaveBeenCalledTimes(1);

      // should work with uppercase as well
      fireEvent.keyDown(document, { key: "K" });
      expect(callback).toHaveBeenCalledTimes(2);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, { key: "k", ctrlKey: true });
      expect(callback).toHaveBeenCalledTimes(2);

      fireEvent.keyDown(document, { key: "k", altKey: true });
      expect(callback).toHaveBeenCalledTimes(2);

      fireEvent.keyDown(document, { key: "k", shiftKey: true });
      expect(callback).toHaveBeenCalledTimes(2);

      // should not trigger on other keys
      fireEvent.keyDown(document, { key: "j" });
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it("when shortkey with the ctrl modifier is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("Ctrl+K", callback));

      fireEvent.keyDown(document, { key: "k", ctrlKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger if ctrl is not pressed
      fireEvent.keyDown(document, { key: "k" });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, { key: "k", ctrlKey: true, altKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document, { key: "k", ctrlKey: true, shiftKey: true });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("when shortkey with the alt modifier is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("Alt+K", callback));

      fireEvent.keyDown(document, { key: "k", altKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger if alt is not pressed
      fireEvent.keyDown(document, { key: "k" });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, { key: "k", altKey: true, ctrlKey: true });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("when shortkey with the shift modifier is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("Shift+K", callback));

      fireEvent.keyDown(document, { key: "k", shiftKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger if shift is not pressed
      fireEvent.keyDown(document, { key: "k" });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, { key: "k", shiftKey: true, ctrlKey: true });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("when shortkey with the meta modifier is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("Meta+K", callback));

      fireEvent.keyDown(document, { key: "k", metaKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, { key: "k", metaKey: true, ctrlKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document, { key: "k", metaKey: true, altKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger if meta is not pressed
      fireEvent.keyDown(document, { key: "k" });
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it("does not call callback when disabled", () => {
    const callback = vi.fn();
    renderHook(() => useKeyboardShortkey("K", callback, { enabled: false }));

    fireEvent.keyDown(document, { key: "k" });
    expect(callback).not.toHaveBeenCalled();
  });

  it("should not trigger when focus is on input/textarea if shortkey does not have command modifier", () => {
    const callback = vi.fn();
    renderHook(() => useKeyboardShortkey("K", callback));

    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();

    fireEvent.keyDown(input, { key: "k" });
    expect(callback).not.toHaveBeenCalled();

    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.focus();

    fireEvent.keyDown(textarea, { key: "k" });
    expect(callback).not.toHaveBeenCalled();
  });

  it("should trigger even when focus is on content editable element if shortkey has command modifier", () => {
    const callback = vi.fn();
    renderHook(() => useKeyboardShortkey("Ctrl+K", callback));

    const contentEditable = document.createElement("div");
    contentEditable.contentEditable = "true";
    document.body.appendChild(contentEditable);
    contentEditable.focus();

    fireEvent.keyDown(contentEditable, { key: "k", ctrlKey: true });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
