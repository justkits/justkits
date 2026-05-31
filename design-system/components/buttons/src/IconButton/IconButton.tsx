import clsx from "clsx";

import { Pressable, type PressableProps } from "@/Pressable";
import { styles } from "../styles.css";

export interface IconButtonProps extends Omit<PressableProps, "children"> {
  children: React.ReactNode;
  rounded?: boolean;
  ghost?: boolean;
  size?: "small" | "medium" | "large";
}

export function IconButton({
  children,
  rounded = false,
  ghost = false,
  size = "medium",
  className,
  ...rest
}: Readonly<IconButtonProps>) {
  return (
    <Pressable
      {...rest}
      className={clsx(styles.iconButton({ rounded, ghost, size }), className)}
    >
      {children}
    </Pressable>
  );
}
