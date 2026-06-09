import { useContext } from "react";
import clsx from "clsx";

import { SidebarBodyContext, useInternalSidebar } from "@/contexts/internals";
import { styles } from "./styles.css";

export interface SidebarFooterProps {
  children: React.ReactNode;
  collapsed?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SidebarFooter({
  children,
  collapsed,
  className,
  style,
}: Readonly<SidebarFooterProps>) {
  const isInsideSidebar = useContext(SidebarBodyContext);
  const { isCollapsedToIcons } = useInternalSidebar();

  if (!isInsideSidebar) {
    throw new Error("SidebarFooter must be used inside SidebarBody.");
  }

  if (isCollapsedToIcons && !collapsed) {
    console.warn(
      "SidebarFooter: 'collapsed' prop should be provided when collapse is set to \"icons\".",
    );
  }

  return (
    <div
      className={clsx(styles.footer({ isCollapsedToIcons }), className)}
      style={style}
    >
      {isCollapsedToIcons ? collapsed : children}
    </div>
  );
}
