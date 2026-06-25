import { useContext } from "react";
import clsx from "clsx";

import { useSidebar } from "@/contexts/core";
import { SidebarBodyContext } from "@/contexts/internals";
import { SidebarToggle } from "@/Toggle/Toggle";
import { styles } from "./styles.css";

export interface SidebarHeaderProps {
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
  const { isExpanded, isCollapsedToIcons } = useSidebar();

  if (!isInsideSidebar) {
    throw new Error("SidebarHeader must be used inside SidebarBody.");
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
      "SidebarHeader: 'collapsed' prop should be provided when toggleVariant is not 'always'.",
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
