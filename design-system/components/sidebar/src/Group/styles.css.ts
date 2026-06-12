import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@justkits/tokens";

const group = style({
  display: "flex",
  flexDirection: "column",
  padding: `${tokens.spacing.sm} 0`,
  margin: `${tokens.spacing.md} 0`,
  gap: tokens.spacing.xs,
});

const header = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0 ${tokens.spacing.sm}`,
    borderRadius: tokens.radius.md,
    userSelect: "none",
    fontSize: tokens.typography.fontSize.bodySmall,
    lineHeight: tokens.typography.lineHeight.bodySmall,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.textMuted,
  },
  variants: {
    interactive: {
      true: {
        cursor: "pointer",
        selectors: {
          "&:hover": { backgroundColor: tokens.colors.backgroundHover },
        },
      },
    },
  },
});

const headerLeft = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing.sm,
  },
  variants: {
    iconSide: {
      left: { flexDirection: "row" },
      right: { flexDirection: "row-reverse" },
    },
  },
});

const headerRight = recipe({
  base: {
    position: "relative",
    zIndex: 1,
  },
  variants: {
    showRight: {
      hover: {
        display: "none",
        selectors: {
          [`${header.classNames.base}:hover &, ${header.classNames.base}:focus-within &`]:
            { display: "block" },
        },
      },
      always: { display: "block" },
    },
  },
});

const toggle = style({
  position: "absolute",
  inset: 0,
  zIndex: 0,
});

const icon = recipe({
  variants: {
    showIcon: {
      hover: {
        display: "none",
        selectors: {
          [`${header.classNames.base}:hover &, ${header.classNames.base}:focus-within &`]:
            { display: "block" },
        },
      },
      always: { display: "block" },
    },
    default: {
      true: {
        transition: "transform 200ms ease",
        selectors: {
          [`${header.classNames.base}:has(${toggle}[data-state="open"]) &`]: {
            transform: "rotate(90deg)",
          },
        },
      },
    },
  },
});

const children = style({
  display: "flex",
  flexDirection: "column",
  paddingLeft: tokens.spacing.xl,
  gap: tokens.spacing.xs,
});

export const styles = {
  group,
  header,
  headerLeft,
  headerRight,
  toggle,
  icon,
  children,
};
