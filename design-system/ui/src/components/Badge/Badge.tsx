import { colorWithOpacity } from "@justkits/tokens";
import { Text } from "@justkits/texts/Text";
import clsx from "clsx";

import { styles } from "./styles.css";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  label: string;
  color?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

/**
 * Badge component
 */
export function Badge({
  label,
  color = "gray",
  left,
  right,
  className,
  style,
  ...rest
}: Readonly<Props>) {
  return (
    <span
      {...rest}
      className={clsx(styles.badge, className)}
      style={{ ...style, backgroundColor: colorWithOpacity(color, 25) }}
    >
      {left}
      <Text variant="description" style={{ color }}>
        {label}
      </Text>
      {right}
    </span>
  );
}
