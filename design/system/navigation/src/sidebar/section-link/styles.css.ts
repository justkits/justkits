import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const toggle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  color: "currentColor",
  position: "relative",
  zIndex: 1,
});

const item = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "24px 1fr auto",
    alignItems: "center",
    padding: "4px 8px",
    gap: "4px",
    height: 32,
    borderRadius: "8px",

    transition: "background-color 0.3s ease",

    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    [`&:has(${toggle}:hover)`]: {
      backgroundColor: "transparent",
    },
  },
  variants: {
    isActive: {
      true: {
        color: "currentColor",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        fontWeight: "bold",

        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        },
        [`&:has(${toggle}:hover)`]: {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

const content = style({
  display: "flex",
  flexDirection: "column",
});

export const styles = { toggle, item, content };
