import { justkitsDark } from "@/presets/justkits-dark";
import { justkitsLight } from "@/presets/justkits-light";
import { convertToLightDark } from "@/utils/light-dark";

describe("light-dark", () => {
  it("convertToLightDark should return light-dark colors", () => {
    const result = convertToLightDark(justkitsLight, justkitsDark);

    for (const key in justkitsLight) {
      const lightValue = justkitsLight[key as keyof typeof justkitsLight];
      const darkValue = justkitsDark[key as keyof typeof justkitsDark];
      const expectedValue = `light-dark(${lightValue}, ${darkValue})`;

      expect(result[key as keyof typeof result]).toBe(expectedValue);
    }
  });
});
