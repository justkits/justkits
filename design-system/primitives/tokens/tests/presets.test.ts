import { justkitsDefault } from "@/presets/justkits-default";

describe("presets", () => {
  it("justkitsDefault should be a string of CSS variables", () => {
    expect(justkitsDefault).toBeDefined();

    // test one of each group
    expect(justkitsDefault).toContain(
      "--color-primary: light-dark(#1647E8, #3B82F6)",
    );
    expect(justkitsDefault).toContain(
      "--elevation-lv1: 0px 1px 3px rgba(127, 127, 127, 0.2)",
    );
    expect(justkitsDefault).toContain("--radius-sm: 4px");
    expect(justkitsDefault).toContain("--spacing-md: 8px");
    expect(justkitsDefault).toContain(
      '--text-hero: 700 3rem/3.6rem "Kalam", "Kalam Fallback"',
    );
    expect(justkitsDefault).toContain("--font-size-heading-sm: 1.5rem");
  });
});
