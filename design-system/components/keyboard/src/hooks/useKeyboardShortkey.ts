import { useEffect, useLayoutEffect, useRef } from "react";

import { isMac } from "@/utils/os";

export interface UseKeyboardShortkeyOptions {
  enabled?: boolean;
}

export function useKeyboardShortkey(
  key: string,
  callback: () => void,
  { enabled = true }: UseKeyboardShortkeyOptions = {},
) {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;

    const parts = key.toLowerCase().split("+");
    const hasCommandModifier = parts.includes("mod") || parts.includes("ctrl");

    const handler = (e: KeyboardEvent) => {
      if (!hasCommandModifier) {
        const active = document.activeElement;
        const tag = active?.tagName.toLowerCase();

        if (
          tag === "input" ||
          tag === "textarea" ||
          (active as HTMLElement)?.isContentEditable
        )
          return;
      }

      if (matchesShortkey(e, parts)) {
        e.preventDefault();
        callbackRef.current();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [key, enabled]);
}

function matchesShortkey(e: KeyboardEvent, parts: string[]): boolean {
  const key = parts[parts.length - 1];

  if (e.key.toLowerCase() !== key) {
    return false;
  }

  const needsMod = parts.includes("mod");
  const needsCtrl = parts.includes("ctrl");
  const needsAlt = parts.includes("alt") || parts.includes("option");
  const needsShift = parts.includes("shift");

  const modActive = isMac ? e.metaKey : e.ctrlKey;
  if (needsMod && !modActive) return false;
  if (needsCtrl && !e.ctrlKey) return false;
  if (needsAlt && !e.altKey) return false;
  if (needsShift && !e.shiftKey) return false;

  return true;
}
