import { useContext } from "react";
import clsx from "clsx";

import { useSidebar } from "@/contexts/core";
import { SidebarBodyContext, useInternalSidebar } from "@/contexts/internals";
import { styles } from "./styles.css";
import { SidebarToggle } from "@/Toggle/Toggle";

interface SidebarHeaderProps {
  children: React.ReactNode;
  collapsed?: React.ReactNode;
  toggle?: React.ReactNode;
  toggleVariant?: "none" | "hover" | "always";
  className?: string;
  style?: React.CSSProperties;
}

export function SidebarHeader({
  children,
  collapsed,
  toggleVariant = "hover",
  toggle,
  className,
  style,
}: Readonly<SidebarHeaderProps>) {
  const isInsideSidebar = useContext(SidebarBodyContext);
  const { isExpanded } = useSidebar();
  const { isCollapsedToIcons } = useInternalSidebar();

  if (!isInsideSidebar) {
    throw new Error("Sidebar.Header must be used inside Sidebar.");
  }

  if (isCollapsedToIcons) {
    return (
      <div
        className={clsx(
          styles.header({ variant: "collapsedToIcons" }),
          className,
        )}
        style={style}
      >
        <CollapsedToIcons
          collapsed={collapsed}
          toggle={toggle}
          toggleVariant={toggleVariant}
        />
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

function CollapsedToIcons({
  collapsed,
  toggle = <SidebarToggle />,
  toggleVariant,
}: Readonly<
  Pick<SidebarHeaderProps, "collapsed" | "toggle" | "toggleVariant">
>) {
  if (toggleVariant === "always") {
    return toggle;
  }

  if (!collapsed) {
    console.warn(
      "Sidebar.Header: 'collapsed' prop should be provided when toggleVariant is not 'always'.",
    );
  }

  if (toggleVariant === "none") {
    return collapsed;
  }

  return (
    <div className={styles.swapContainer}>
      <span className={styles.collapsedIcon}>{collapsed}</span>
      <span className={styles.toggle}>{toggle}</span>
    </div>
  );
}
