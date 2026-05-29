import { Button, type ButtonProps } from "@justkits/headless-ui/Button";
import clsx from "clsx";

import { styles } from "./styles.css";

export function Pressable({
  children,
  className,
  ...rest
}: Readonly<ButtonProps>) {
  return (
    <Button {...rest} className={clsx(styles.pressable, className)}>
      {children}
    </Button>
  );
}
