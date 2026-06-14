import { isMac } from "./os";

export function parseShortcutKeys(shortcut: string): string[] {
  return shortcut
    .split("+")
    .map((k) => (k.toLowerCase() === "mod" ? "cmd" : k.toLowerCase()));
}

export function formatShortcutAria(shortcut: string): string {
  return shortcut
    .toLowerCase()
    .split("+")
    .map((part) => {
      switch (part) {
        case "mod":
          return isMac ? "Meta" : "Control";
        case "shift":
          return "Shift";
        case "alt":
          return "Alt";
        case "ctrl":
          return "Control";
        default:
          return part;
      }
    })
    .join("+");
}
