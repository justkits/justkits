import type { ComponentType } from "react";
import type { IconProps } from "@justkits/svg2tsx";

import { CheckFill } from "./components/CheckFill";
import { ChevronDown } from "./components/ChevronDown";
import { ChevronRight } from "./components/ChevronRight";
import { ColorTheme } from "./components/ColorTheme";
import { ExternalLink } from "./components/ExternalLink";
import { LoadingBubble } from "./components/LoadingBubble";
import { LoadingLine } from "./components/LoadingLine";
import { LoadingTail } from "./components/LoadingTail";
import { Loading } from "./components/Loading";
import { SidebarArrow } from "./components/SidebarArrow";
import { Sidebar } from "./components/Sidebar";

export type IconName =
  | "check-fill"
  | "chevron-down"
  | "chevron-right"
  | "color-theme"
  | "external-link"
  | "loading-bubble"
  | "loading-line"
  | "loading-tail"
  | "loading"
  | "sidebar-arrow"
  | "sidebar";

export const iconMap: Record<IconName, ComponentType<IconProps>> = {
  "check-fill": CheckFill,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "color-theme": ColorTheme,
  "external-link": ExternalLink,
  "loading-bubble": LoadingBubble,
  "loading-line": LoadingLine,
  "loading-tail": LoadingTail,
  loading: Loading,
  "sidebar-arrow": SidebarArrow,
  sidebar: Sidebar,
};
