import { useContext } from "react";
import clsx from "clsx";

import { useSidebar } from "@/contexts/core";
import { SidebarBodyContext, useInternalSidebar } from "@/contexts/internals";
import { collapsedSlot, expandedSlot, footer } from "./styles.css";

interface SidebarFooterProps {
  children: React.ReactNode;
  collapsed?: React.ReactNode;
  className?: string;
}

export function SidebarFooter({
  children,
  collapsed,
  className,
}: Readonly<SidebarFooterProps>) {
  const isInsideSidebar = useContext(SidebarBodyContext);
  const { isExpanded } = useSidebar();
  const { collapse } = useInternalSidebar();

  if (!isInsideSidebar) {
    throw new Error("Sidebar.Footer must be used inside Sidebar.Content.");
  }

  const isIconMode = collapse === "icons";
  const isCollapsed = isIconMode && !isExpanded;

  return (
    <div className={clsx(footer({ collapsed: isCollapsed }), className)}>
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
