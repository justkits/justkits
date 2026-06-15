import type { Shortkey } from "./types";

export const isMac =
  globalThis.window !== undefined &&
  /Mac|iPod|iPhone|iPad/.test(globalThis.navigator?.userAgent ?? "");

export function parseShortkey(shortkey: Shortkey) {
  const parts = shortkey.split("+");
  const targetKey = parts.pop() || "";

  let ctrlKey = parts.includes("Ctrl") || parts.includes("Control");
  const altKey =
    parts.includes("Alt") || parts.includes("Opt") || parts.includes("Option");
  const shiftKey = parts.includes("Shift");

  let metaKey =
    parts.includes("Meta") ||
    parts.includes("Cmd") ||
    parts.includes("Command") ||
    parts.includes("Win") ||
    parts.includes("Windows");

  if (parts.includes("Mod")) {
    if (isMac) {
      metaKey = true;
    } else {
      ctrlKey = true;
    }
  }

  return {
    targetKey,
    ctrlKey,
    altKey,
    shiftKey,
    metaKey,
  };
}
