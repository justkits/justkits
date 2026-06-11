/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { detectOS, resolveKey, resolveReadableName } from "@/Keyboard/keys";

describe("keys", () => {
  describe("detectOS", () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (navigator as any).userAgentData;
    });

    it("returns 'mac' when navigator is undefined (SSR)", () => {
      vi.stubGlobal("navigator", undefined);
      expect(detectOS()).toBe("mac");
    });

    describe("via userAgentData", () => {
      it("returns 'mac' when platform is macOS", () => {
        (navigator as any).userAgentData = { platform: "macOS" };
        expect(detectOS()).toBe("mac");
      });

      it("returns 'windows' when platform is Windows", () => {
        (navigator as any).userAgentData = { platform: "Windows" };
        expect(detectOS()).toBe("windows");
      });

      it("returns 'linux' when platform is Linux", () => {
        (navigator as any).userAgentData = { platform: "Linux" };
        expect(detectOS()).toBe("linux");
      });
    });

    describe("via navigator.platform fallback", () => {
      beforeEach(() => {
        (navigator as any).userAgentData = undefined;
      });

      it("returns 'mac' when platform is MacIntel", () => {
        Object.defineProperty(navigator, "platform", {
          value: "MacIntel",
          configurable: true,
        });
        expect(detectOS()).toBe("mac");
      });

      it("returns 'windows' when platform is Win32", () => {
        Object.defineProperty(navigator, "platform", {
          value: "Win32",
          configurable: true,
        });
        expect(detectOS()).toBe("windows");
      });

      it("returns 'linux' when platform is Linux x86_64", () => {
        Object.defineProperty(navigator, "platform", {
          value: "Linux x86_64",
          configurable: true,
        });
        expect(detectOS()).toBe("linux");
      });

      it("returns 'linux' when both userAgentData and platform are unavailable", () => {
        Object.defineProperty(navigator, "platform", {
          value: undefined,
          configurable: true,
        });
        expect(detectOS()).toBe("linux");
      });
    });
  });

  describe("resolveKey", () => {
    it("resolves a mac-specific key", () => {
      expect(resolveKey("cmd", "mac")).toBe("⌘");
    });

    it("resolves a windows-specific key", () => {
      expect(resolveKey("cmd", "windows")).toBe("Ctrl");
    });

    it("resolves a linux-specific key", () => {
      expect(resolveKey("meta", "linux")).toBe("Super");
    });

    it("resolves a cross-platform key the same on all OSes", () => {
      expect(resolveKey("shift", "mac")).toBe("⇧");
      expect(resolveKey("shift", "windows")).toBe("⇧");
      expect(resolveKey("shift", "linux")).toBe("⇧");
    });

    it("is case-insensitive", () => {
      expect(resolveKey("CMD", "mac")).toBe("⌘");
    });

    it("uppercases an unknown single-character key", () => {
      expect(resolveKey("x", "mac")).toBe("X");
    });

    it("returns an unknown multi-character key as-is", () => {
      expect(resolveKey("F1", "mac")).toBe("F1");
    });
  });

  describe("resolveReadableName", () => {
    it("resolves a mac-specific key name", () => {
      expect(resolveReadableName("cmd", "mac")).toBe("Command");
    });

    it("resolves a windows-specific key name", () => {
      expect(resolveReadableName("cmd", "windows")).toBe("Control");
    });

    it("resolves a linux-specific key name", () => {
      expect(resolveReadableName("meta", "linux")).toBe("Super");
    });

    it("resolves a cross-platform key name the same on all OSes", () => {
      expect(resolveReadableName("shift", "mac")).toBe("Shift");
      expect(resolveReadableName("shift", "windows")).toBe("Shift");
      expect(resolveReadableName("shift", "linux")).toBe("Shift");
    });

    it("is case-insensitive", () => {
      expect(resolveReadableName("CMD", "mac")).toBe("Command");
    });

    it("uppercases an unknown single-character key", () => {
      expect(resolveReadableName("x", "mac")).toBe("X");
    });

    it("returns an unknown multi-character key as-is", () => {
      expect(resolveReadableName("F1", "mac")).toBe("F1");
    });
  });
});
