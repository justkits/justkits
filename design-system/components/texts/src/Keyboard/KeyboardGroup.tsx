import clsx from "clsx";

import { Keyboard } from "./Keyboard";
import { detectOS, resolveKey, resolveReadableName, type OS } from "./keys";
import { styles } from "./styles.css";

export interface KeyboardGroupProps {
  keys: string | string[];
  size?: "small" | "large";
  os?: OS;
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function KeyboardGroup({
  keys,
  size,
  os,
  "aria-label": ariaLabel,
  className,
  style,
}: Readonly<KeyboardGroupProps>) {
  const resolvedOS = os ?? detectOS();
  const keyList = Array.isArray(keys) ? keys : [keys];
  const resolvedLabel =
    ariaLabel ??
    keyList.map((key) => resolveReadableName(key, resolvedOS)).join(" ");

  if (keyList.length === 1) {
    return (
      <Keyboard
        size={size}
        aria-label={resolvedLabel}
        className={className}
        style={style}
      >
        {resolveKey(keyList[0], resolvedOS)}
      </Keyboard>
    );
  }

  return (
    <kbd
      aria-label={resolvedLabel}
      className={clsx(styles.keyboardGroup, className)}
      style={style}
    >
      {keyList.map((key) => (
        <Keyboard key={key} size={size}>
          {resolveKey(key, resolvedOS)}
        </Keyboard>
      ))}
    </kbd>
  );
}
