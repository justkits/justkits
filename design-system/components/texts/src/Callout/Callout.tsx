import clsx from "clsx";

import { Text } from "@/Text";
import { styles } from "./styles.css";

export interface CalloutProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  variant?: "info" | "warning" | "error" | "success" | "note";
  size?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
}

export function Callout({
  title,
  icon,
  children,
  variant = "info",
  size = "medium",
  className,
  style,
}: Readonly<CalloutProps>) {
  const textVariant = () => {
    switch (size) {
      case "small":
        return "titleSmall";
      case "medium":
        return "titleMedium";
      case "large":
        return "titleLarge";
    }
  };

  return (
    <div
      className={clsx(styles.callout({ variant, size }), className)}
      style={style}
    >
      <div className={styles.icon}>{icon}</div>
      <Text variant={textVariant()} className={styles.title}>
        {title}
      </Text>
      {children && <div className={styles.main}>{children}</div>}
    </div>
  );
}
