import { useContext } from "react";
import clsx from "clsx";

import { useSidebar } from "@/contexts/core";
import { SidebarBodyContext, useInternalSidebar } from "@/contexts/internals";
import { styles } from "./styles.css";

export interface SidebarHeaderProps {
  children: React.ReactNode;
  collapsed?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SidebarHeader({
  children,
  collapsed,
  className,
  style,
}: Readonly<SidebarHeaderProps>) {
  const isInsideSidebar = useContext(SidebarBodyContext);
  const { isExpanded, isCollapsedToIcons } = useSidebar();
  const { isIconMode } = useInternalSidebar();

  if (!isInsideSidebar) {
    throw new Error("SidebarHeader must be used inside SidebarBody.");
  }

  if (collapsed && !isIconMode) {
    console.warn(
      "SidebarHeader: 'collapsed' prop has no effect when sidebar collapse is not 'icons'.",
    );
  }

  if (isCollapsedToIcons) {
    if (!collapsed) {
      console.warn(
        "SidebarHeader: 'collapsed' prop is required when sidebar collapse is 'icons'.",
      );
      return null;
    }

    return (
      <div
        className={clsx(
          styles.header({ variant: "collapsedToIcons" }),
          className,
        )}
        style={style}
      >
        {collapsed}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        styles.header({ variant: isExpanded ? "expanded" : "collapsed" }),
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
