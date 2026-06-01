import { AppIcon } from "@justkits/icons";
import clsx from "clsx";

import { styles } from "./styles.css";

export interface SpinnerProps {
  variant?: "loading" | "loading-tail" | "loading-line" | "loading-bubble";
  size?: number;
  className?: string;
}

export function Spinner({
  variant = "loading",
  size = 24,
  className,
}: Readonly<SpinnerProps>) {
  return (
    <AppIcon
      icon={variant}
      className={clsx(styles.spinner, className)}
      size={size}
    />
  );
}
