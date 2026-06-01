import { AppIcon } from "@justkits/icons";
import clsx from "clsx";

import { styles } from "./styles.css";

export interface SpinnerProps {
  variant?: "loading" | "loading-tail" | "loading-line" | "loading-bubble";
  size?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
}

export function Spinner({
  variant = "loading",
  size = "medium",
  className,
  style,
  ...rest
}: Readonly<SpinnerProps>) {
  return (
    <AppIcon
      icon={variant}
      className={clsx(styles.spinner({ size }), className)}
      style={style}
      {...rest}
    />
  );
}
