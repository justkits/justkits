import { useContext } from "react";
import clsx from "clsx";

import { SidebarBodyContext, SidebarNavContext } from "@/contexts/internals";
import { styles } from "./styles.css";

export interface SidebarNavProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  children: React.ReactNode;
}

export function SidebarNav({
  children,
  "aria-label": ariaLabel = "Sidebar Navigation",
  className,
  ...rest
}: Readonly<SidebarNavProps>) {
  const isInsideSidebar = useContext(SidebarBodyContext);

  if (!isInsideSidebar) {
    throw new Error("Sidebar.Nav must be used inside Sidebar.");
  }

  return (
    <SidebarNavContext value={true}>
      <nav
        {...rest}
        role="navigation"
        aria-label={ariaLabel}
        className={clsx(styles.nav, className)}
      >
        {children}
      </nav>
    </SidebarNavContext>
  );
}
