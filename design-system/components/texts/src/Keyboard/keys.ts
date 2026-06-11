export type OS = "mac" | "windows" | "linux";

export function detectOS(): OS {
  if (typeof navigator === "undefined") return "mac";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any;
  const platform = (
    nav.userAgentData?.platform ??
    navigator.platform ??
    ""
  ).toLowerCase();
  if (platform.includes("mac")) return "mac";
  if (platform.includes("win")) return "windows";
  return "linux";
}

const CROSS_PLATFORM: Record<string, string> = {
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

const MAC_KEYS: Record<string, string> = {
  ...CROSS_PLATFORM,
  cmd: "⌘",
  command: "⌘",
  meta: "⌘",
  win: "⌘",
  ctrl: "⌃",
  control: "⌃",
  alt: "⌥",
  option: "⌥",
  delete: "⌦",
};

const WINDOWS_KEYS: Record<string, string> = {
  ...CROSS_PLATFORM,
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
};

const LINUX_KEYS: Record<string, string> = {
  ...CROSS_PLATFORM,
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
};

const OS_KEYS: Record<OS, Record<string, string>> = {
  mac: MAC_KEYS,
  windows: WINDOWS_KEYS,
  linux: LINUX_KEYS,
};

export function resolveKey(key: string, os: OS): string {
  const symbol = OS_KEYS[os][key.toLowerCase()];
  if (symbol) return symbol;
  return key.length === 1 ? key.toUpperCase() : key;
}

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

const MAC_NAMES: Record<string, string> = {
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
};

const WINDOWS_NAMES: Record<string, string> = {
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
};

const LINUX_NAMES: Record<string, string> = {
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
};

const OS_NAMES: Record<OS, Record<string, string>> = {
  mac: MAC_NAMES,
  windows: WINDOWS_NAMES,
  linux: LINUX_NAMES,
};

export function resolveReadableName(key: string, os: OS): string {
  const name = OS_NAMES[os][key.toLowerCase()];
  if (name) return name;
  return key.length === 1 ? key.toUpperCase() : key;
}
