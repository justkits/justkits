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

export const isMac = typeof navigator !== "undefined" && detectOS() === "mac";
