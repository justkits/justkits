import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorWithOpacity, tokens } from "@justkits/tokens";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.sm,
});

const link = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    gap: tokens.spacing.md,
    borderRadius: tokens.radius.sm,
  },
  variants: {
    isActive: {
      true: {
        color: tokens.colors.primary,
        backgroundColor: colorWithOpacity(tokens.colors.primary, 12),
        selectors: {
          "&:hover, &:focus-visible": {
            backgroundColor: colorWithOpacity(tokens.colors.primary, 16),
          },
        },
      },
      false: {
        backgroundColor: "transparent",
        selectors: {
          "&:hover, &:focus-visible": {
            backgroundColor: tokens.colors.backgroundHover,
          },
        },
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
        cursor: "not-allowed",
      },
      false: {},
    },
    isCollapsedToIcons: {
      true: {
        justifyContent: "center",
        padding: tokens.spacing.sm,
      },
      false: {},
    },
  },
});

const labelSlot = style({
  flex: 1,
  font: tokens.text.bodyMedium,
});

const rightSlot = recipe({
  base: {
    position: "relative",
    zIndex: 1,
    transition: `opacity ease-in-out 300ms`,
  },
  variants: {
    showOnHover: {
      false: {
        opacity: 1,
      },
      true: {
        opacity: 0,
        selectors: {
          [`${link.classNames.base}:hover &, ${link.classNames.base}:focus-visible &`]:
            {
              opacity: 1,
            },
        },
      },
    },
  },
});

const indicator = style({
  position: "absolute",
  left: 0,
  top: "25%",
  bottom: "25%",
  width: "2px",
  backgroundColor: tokens.colors.primary,
  zIndex: 1,
});

const subitems = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.sm,
  paddingLeft: tokens.spacing.xl,
});

const toggle = style({
  position: "relative",
  zIndex: 1,
  cursor: "pointer",
});

const toggleIcon = style({
  selectors: {
    [`${toggle}[data-state='open'] &`]: {
      transform: "rotate(90deg)",
    },
  },
});

export const styles = {
  wrapper,
  link,
  labelSlot,
  rightSlot,
  indicator,
  subitems,
  toggle,
  toggleIcon,
};
