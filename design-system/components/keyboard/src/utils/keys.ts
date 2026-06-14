import type { OS } from "./os";

const CROSS_PLATFORM_SYMBOLS: Record<string, string> = {
  shift: "⇧",
  enter: "↵",
  return: "↵",
  tab: "⇥",
  backspace: "⌫",
  escape: "⎋",
  esc: "⎋",
  space: "Space",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  capslock: "⇪",
};

const OS_SYMBOLS: Record<OS, Record<string, string>> = {
  mac: {
    ...CROSS_PLATFORM_SYMBOLS,
    cmd: "⌘",
    command: "⌘",
    meta: "⌘",
    win: "⌘",
    ctrl: "⌃",
    control: "⌃",
    alt: "⌥",
    option: "⌥",
    delete: "⌦",
  },
  windows: {
    ...CROSS_PLATFORM_SYMBOLS,
    cmd: "Ctrl",
    command: "Ctrl",
    ctrl: "Ctrl",
    control: "Ctrl",
    alt: "Alt",
    option: "Alt",
    meta: "⊞ Win",
    win: "⊞ Win",
    windows: "⊞ Win",
    delete: "Del",
  },
  linux: {
    ...CROSS_PLATFORM_SYMBOLS,
    cmd: "Ctrl",
    command: "Ctrl",
    ctrl: "Ctrl",
    control: "Ctrl",
    alt: "Alt",
    option: "Alt",
    meta: "Super",
    win: "Super",
    super: "Super",
    delete: "Del",
  },
};

const CROSS_PLATFORM_NAMES: Record<string, string> = {
  shift: "Shift",
  enter: "Enter",
  return: "Enter",
  tab: "Tab",
  backspace: "Backspace",
  escape: "Escape",
  esc: "Escape",
  space: "Space",
  up: "Up Arrow",
  down: "Down Arrow",
  left: "Left Arrow",
  right: "Right Arrow",
  capslock: "Caps Lock",
};

const OS_NAMES: Record<OS, Record<string, string>> = {
  mac: {
    ...CROSS_PLATFORM_NAMES,
    cmd: "Command",
    command: "Command",
    meta: "Command",
    win: "Command",
    ctrl: "Control",
    control: "Control",
    alt: "Option",
    option: "Option",
    delete: "Delete",
  },
  windows: {
    ...CROSS_PLATFORM_NAMES,
    cmd: "Control",
    command: "Control",
    ctrl: "Control",
    control: "Control",
    alt: "Alt",
    option: "Alt",
    meta: "Windows",
    win: "Windows",
    windows: "Windows",
    delete: "Delete",
  },
  linux: {
    ...CROSS_PLATFORM_NAMES,
    cmd: "Control",
    command: "Control",
    ctrl: "Control",
    control: "Control",
    alt: "Alt",
    option: "Alt",
    meta: "Super",
    win: "Super",
    super: "Super",
    delete: "Delete",
  },
};

export function resolveKey(key: string, os: OS): string {
  const symbol = OS_SYMBOLS[os][key.toLowerCase()];
  if (symbol) return symbol;
  return key.length === 1 ? key.toUpperCase() : key;
}

export function resolveReadableName(key: string, os: OS): string {
  const name = OS_NAMES[os][key.toLowerCase()];
  if (name) return name;
  return key.length === 1 ? key.toUpperCase() : key;
}
