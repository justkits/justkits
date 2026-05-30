import clsx from "clsx";

import { Pressable, type PressableProps } from "@/Pressable";
import { styles } from "../styles.css";

export interface IconButtonProps extends Omit<
  PressableProps,
  "asChild" | "children"
> {
  icon: React.ReactNode;
  label?: React.ReactNode;
  rounded?: boolean;
  ghost?: boolean;
  size?: "small" | "medium" | "large";
}

export function IconButton({
  icon,
  label,
  rounded = false,
  ghost = false,
  size = "medium",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <Pressable
      {...rest}
      className={clsx(styles.iconButton({ rounded, ghost, size }), className)}
    >
      {icon}
      {label}
    </Pressable>
  );
}
