import clsx from "clsx";

import { styles } from "./styles.css";

export interface KeyboardProps {
  size?: "small" | "large";
  children: string;
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Keyboard({
  size = "small",
  children,
  "aria-label": ariaLabel,
  className,
  style,
}: Readonly<KeyboardProps>) {
  return (
    <kbd
      aria-label={ariaLabel}
      className={clsx(styles.keyboard({ size }), className)}
      style={style}
    >
      {children}
    </kbd>
  );
}
