import clsx from "clsx";

import { Keyboard } from "./Keyboard";
import type { Shortkey } from "@/keys/types";
import { isMac, parseShortkey } from "@/keys/utils";
import { styles } from "./styles.css";

export interface KeyboardGroupProps extends React.HTMLAttributes<HTMLElement> {
  keys: Shortkey;
  size?: "small" | "large";
}

export function KeyboardGroup({
  keys,
  size,
  "aria-label": ariaLabel,
  className,
  ...rest
}: Readonly<KeyboardGroupProps>) {
  const { targetKey, ctrlKey, shiftKey, altKey, metaKey } = parseShortkey(keys);

  const keysToRender: string[] = [];

  if (ctrlKey) keysToRender.push(isMac ? "^" : "Ctrl");
  if (shiftKey) keysToRender.push(isMac ? "⇧" : "Shift");
  if (altKey) keysToRender.push(isMac ? "⌥" : "Alt");
  if (metaKey) keysToRender.push(isMac ? "⌘" : "Win");

  keysToRender.push(targetKey);

  const resolvedLabel = ariaLabel ?? resolveLabel(keys);

  if (keysToRender.length === 1) {
    return (
      <Keyboard
        {...rest}
        size={size}
        aria-label={resolvedLabel}
        className={className}
      >
        {keysToRender[0]}
      </Keyboard>
    );
  }

  return (
    <kbd
      {...rest}
      aria-label={resolvedLabel}
      className={clsx(styles.keyboardGroup, className)}
    >
      {keysToRender.map((key) => (
        <Keyboard key={key} size={size} aria-hidden="true">
          {key}
        </Keyboard>
      ))}
    </kbd>
  );
}

function resolveLabel(shortkey: Shortkey): string {
  return shortkey
    .split("+")
    .map((part) => {
      switch (part) {
        case "Mod":
          return isMac ? "Command" : "Control";
        case "Ctrl":
        case "Control":
          return "Control";
        case "Alt":
        case "Opt":
        case "Option":
          return isMac ? "Option" : "Alt";
        case "Shift":
          return "Shift";
        case "Cmd":
        case "Command":
        case "Meta":
          return "Command";
        case "Win":
        case "Windows":
          return "Windows";
        default:
          return part;
      }
    })
    .join(" ");
}
