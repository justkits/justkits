import { parseShortkey } from "@/keys/utils";
import type { Shortkey } from "@/keys/types";

describe("isMac", () => {
  it("is false in SSR environments where window is undefined", async () => {
    vi.stubGlobal("window", undefined);
    vi.resetModules();
    const { isMac } = await import("@/keys/utils");
    expect(isMac).toBe(false);
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("is false when navigator is undefined", async () => {
    vi.stubGlobal("navigator", undefined);
    vi.resetModules();
    const { isMac } = await import("@/keys/utils");
    expect(isMac).toBe(false);
    vi.unstubAllGlobals();
    vi.resetModules();
  });
});

describe("parseShortkey", () => {
  it("falls back to empty string when target key is missing", () => {
    const { targetKey } = parseShortkey("" as unknown as Shortkey);
    expect(targetKey).toBe("");
  });
});
