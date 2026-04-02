import { type HTMLAttributes } from "react";

export type DividerProps = {
  label?: string;
  vertical?: boolean;
  decorative?: boolean;
} & HTMLAttributes<HTMLElement>;

export function Divider({
  className,
  vertical = false,
  decorative = false,
  label,
  "aria-label": ariaLabel,
  ...rest
}: DividerProps) {
  if (decorative) {
    return <div {...rest} aria-hidden="true" className={className} />;
  }

  return (
    <hr
      {...rest}
      className={className}
      aria-orientation={vertical ? "vertical" : "horizontal"}
      aria-label={label ?? ariaLabel}
    />
  );
}
