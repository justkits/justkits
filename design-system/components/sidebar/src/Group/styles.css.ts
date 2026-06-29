import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@justkits/tokens";

const group = style({
  display: "flex",
  flexDirection: "column",
  padding: `${tokens.spacing.sm} 0`,
  margin: `${tokens.spacing.md} 0`,
  gap: tokens.spacing.xs,
});

const header = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0 ${tokens.spacing.sm}`,
  borderRadius: tokens.radius.md,
  fontSize: tokens.typography.fontSize.bodySmall,
  lineHeight: tokens.typography.lineHeight.bodySmall,
  fontWeight: tokens.typography.fontWeight.semibold,
  color: tokens.colors.textMuted,

  userSelect: "none",
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        "&:hover": {
          backgroundColor: tokens.colors.backgroundHover,
        },
      },
    },
  },
});

const headerLeft = style({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacing.sm,
});

const headerRight = recipe({
  base: {
    position: "relative",
    zIndex: 1,
  },
  variants: {
    showOnHover: {
      true: {
        opacity: 0,
        transition: "opacity 0.15s ease",
        selectors: {
          [`${header}:focus-within &`]: {
            opacity: 1,
          },
        },
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              [`${header}:hover &`]: {
                opacity: 1,
              },
            },
          },
        },
      },
      false: {
        opacity: 1,
      },
    },
  },
});

const toggle = style({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  cursor: "pointer",
});

const icon = style({
  transition: "transform 200ms ease, opacity 200ms ease",
  opacity: 0,
  selectors: {
    [`${header}:focus-within &`]: {
      opacity: 1,
    },
    [`${header}:has(${toggle}[data-state="open"]) &`]: {
      transform: "rotate(90deg)",
    },
  },
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        [`${header}:hover &`]: {
          opacity: 1,
        },
      },
    },
  },
});

const subitems = style({
  display: "flex",
  flexDirection: "column",
  paddingLeft: tokens.spacing.md,
  gap: tokens.spacing.sm,
});

export const styles = {
  group,
  header,
  headerLeft,
  headerRight,
  toggle,
  icon,
  subitems,
};
