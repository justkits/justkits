import { render } from "@testing-library/react";

import { KeyboardGroup } from "@/Keyboard";

describe("KeyboardGroup", () => {
  describe("rendering", () => {
    it("renders a single key as a kbd element", () => {
      const { getByText } = render(<KeyboardGroup keys={["shift"]} os="mac" />);
      expect(getByText("⇧").tagName).toBe("KBD");
    });

    it("renders multiple keys as nested kbd elements inside a kbd wrapper", () => {
      const { getByText, getByLabelText } = render(
        <KeyboardGroup keys={["cmd", "k"]} os="mac" />,
      );
      expect(getByLabelText("Command K").tagName).toBe("KBD");
      expect(getByText("⌘").tagName).toBe("KBD");
      expect(getByText("K").tagName).toBe("KBD");
    });

    it("uppercases unknown single-character keys", () => {
      const { getByText } = render(<KeyboardGroup keys="x" os="mac" />);
      expect(getByText("X").tagName).toBe("KBD");
    });

    it("falls back to the raw string for unknown multi-character keys", () => {
      const { getByText } = render(<KeyboardGroup keys="F1" os="mac" />);
      expect(getByText("F1").tagName).toBe("KBD");
    });
  });

  describe("accessibility", () => {
    it("auto-generates aria-label for a single key", () => {
      const { getByLabelText } = render(<KeyboardGroup keys="cmd" os="mac" />);
      expect(getByLabelText("Command").tagName).toBe("KBD");
    });

    it("auto-generates aria-label for a shortcut combination", () => {
      const { getByLabelText } = render(
        <KeyboardGroup keys={["cmd", "k"]} os="mac" />,
      );
      expect(getByLabelText("Command K")).toBeTruthy();
    });

    it("uses aria-label override when provided", () => {
      const { getByLabelText } = render(
        <KeyboardGroup keys={["cmd", "k"]} os="mac" aria-label="Save file" />,
      );
      expect(getByLabelText("Save file")).toBeTruthy();
    });

    it("generates Windows-aware aria-label", () => {
      const { getByLabelText } = render(
        <KeyboardGroup keys={["cmd", "s"]} os="windows" />,
      );
      expect(getByLabelText("Control S")).toBeTruthy();
    });
  });

  describe("OS-specific resolution", () => {
    it("renders cmd as ⌘ on mac", () => {
      const { getByText } = render(<KeyboardGroup keys="cmd" os="mac" />);
      expect(getByText("⌘").tagName).toBe("KBD");
    });

    it("renders cmd as Ctrl on windows", () => {
      const { getByText } = render(<KeyboardGroup keys="cmd" os="windows" />);
      expect(getByText("Ctrl").tagName).toBe("KBD");
    });

    it("renders cmd as Ctrl on linux", () => {
      const { getByText } = render(<KeyboardGroup keys="cmd" os="linux" />);
      expect(getByText("Ctrl").tagName).toBe("KBD");
    });

    it("renders alt as ⌥ on mac", () => {
      const { getByText } = render(<KeyboardGroup keys="alt" os="mac" />);
      expect(getByText("⌥").tagName).toBe("KBD");
    });

    it("renders alt as Alt on windows", () => {
      const { getByText } = render(<KeyboardGroup keys="alt" os="windows" />);
      expect(getByText("Alt").tagName).toBe("KBD");
    });

    it("renders meta as ⊞ Win on windows", () => {
      const { getByText } = render(<KeyboardGroup keys="meta" os="windows" />);
      expect(getByText("⊞ Win").tagName).toBe("KBD");
    });

    it("renders meta as Super on linux", () => {
      const { getByText } = render(<KeyboardGroup keys="meta" os="linux" />);
      expect(getByText("Super").tagName).toBe("KBD");
    });

    it("renders shift as ⇧ on all platforms", () => {
      const { rerender, getByText } = render(
        <KeyboardGroup keys="shift" os="mac" />,
      );
      expect(getByText("⇧")).toBeTruthy();
      rerender(<KeyboardGroup keys="shift" os="windows" />);
      expect(getByText("⇧")).toBeTruthy();
      rerender(<KeyboardGroup keys="shift" os="linux" />);
      expect(getByText("⇧")).toBeTruthy();
    });
  });
});
