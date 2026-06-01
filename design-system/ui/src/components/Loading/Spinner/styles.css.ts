import { keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const spinner = recipe({
  base: {
    animation: `${rotate} 1s linear infinite`,
  },
  variants: {
    size: {
      small: { width: "16px", height: "16px" },
      medium: { width: "24px", height: "24px" },
      large: { width: "32px", height: "32px" },
    },
  },
});

export const styles = { spinner };
