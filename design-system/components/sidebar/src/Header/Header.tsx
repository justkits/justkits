import { useContext } from "react";
import clsx from "clsx";

import { useSidebar } from "@/contexts/core";
import { SidebarBodyContext, useInternalSidebar } from "@/contexts/internals";
import { collapsedSlot, expandedSlot, header } from "./styles.css";

interface SidebarHeaderProps {
  children: React.ReactNode;
  collapsed?: React.ReactNode;
  className?: string;
}

export function SidebarHeader({
  children,
  collapsed,
  className,
}: Readonly<SidebarHeaderProps>) {
  const isInsideSidebar = useContext(SidebarBodyContext);
  const { isExpanded } = useSidebar();
  const { collapse } = useInternalSidebar();

  const isIconMode = collapse === "icons";
  const isCollapsed = isIconMode && !isExpanded;

  if (!isInsideSidebar) {
    throw new Error("Sidebar.Header must be used inside Sidebar.Content.");
  }

  return (
    <div className={clsx(header({ collapsed: isCollapsed }), className)}>
      {isIconMode ? (
        <>
          <div className={expandedSlot}>{children}</div>
          {collapsed && <div className={collapsedSlot}>{collapsed}</div>}
        </>
      ) : (
        children
      )}
    </div>
  );
}
