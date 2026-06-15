import { useEffect, useLayoutEffect, useRef } from "react";

import type { Shortkey } from "@/keys/types";
import { parseShortkey } from "@/keys/utils";

export interface UseKeyboardShortkeyOptions {
  /** Whether the shortkey listener is active. Defaults to `true`. */
  enabled?: boolean;
}

export interface UseKeyboardShortkeyResult {
  /** Value for the `aria-keyshortcuts` attribute on the element that triggers this shortkey. */
  ariaKeyshortcuts: string;
}

/**
 * Registers a global keyboard shortkey and calls `callback` when it is pressed.
 *
 * Shortkey format: `"Mod+K"`, `"Shift+Alt+S"`, `"/"`.
 * `Mod` resolves to `Cmd` on Mac and `Ctrl` on Windows/Linux.
 *
 * The listener is automatically skipped when focus is inside an `<input>`,
 * `<textarea>`, or `contenteditable` element — unless the shortkey includes
 * `Mod` or `Ctrl`, in which case it is safe to fire regardless.
 *
 * @param key - The shortkey string, e.g. `"Mod+K"` or `"Shift+/"`.
 * @param callback - Called when the shortkey is matched. Stable across renders — no need to wrap in `useCallback`.
 * @param options - Optional configuration.
 * @returns `ariaKeyshortcuts` — the formatted value for the `aria-keyshortcuts` attribute.
 */
export function useKeyboardShortkey(
  key: Shortkey,
  callback: () => void,
  { enabled = true }: UseKeyboardShortkeyOptions = {},
): UseKeyboardShortkeyResult {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;

    const { targetKey, ctrlKey, altKey, shiftKey, metaKey } =
      parseShortkey(key);
    const hasCommandModifier = metaKey || ctrlKey;

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

      if (e.key.toLowerCase() !== targetKey.toLowerCase()) return;
      if (metaKey !== e.metaKey) return;
      if (ctrlKey !== e.ctrlKey) return;
      if (altKey !== e.altKey) return;
      if (shiftKey !== e.shiftKey) return;

      e.preventDefault();
      callbackRef.current();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [key, enabled]);

  return { ariaKeyshortcuts: buildAriaKeyshortcuts(key) };
}

function buildAriaKeyshortcuts(key: Shortkey): string {
  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parseShortkey(key);
  const parts: string[] = [];
  if (metaKey) parts.push("Meta");
  if (ctrlKey) parts.push("Control");
  if (altKey) parts.push("Alt");
  if (shiftKey) parts.push("Shift");
  parts.push(targetKey);
  return parts.join("+");
}
