import { Button, type ButtonProps } from "@justkits/headless-ui/Button";
import { AppIcon } from "@justkits/icons";

import { useSidebar } from "@/contexts/core";
import { useInternalSidebar } from "@/contexts/internals";
import { toggle, sidebarIcon, arrowIcon } from "./styles.css";

export interface SidebarToggleProps extends Omit<ButtonProps, "children"> {
  children?: React.ReactNode;
}

export function SidebarToggle({
  children,
  ...rest
}: Readonly<SidebarToggleProps>) {
  const { isExpanded, toggleSidebar } = useSidebar();
  const { contentId, collapse, side } = useInternalSidebar();

  if (collapse === "disable") {
    console.warn("Sidebar.Toggle: renders nothing when collapse is 'disable'.");
    return null;
  }

  return (
    <Button
      {...rest}
      onClick={toggleSidebar}
      aria-controls={contentId}
      aria-expanded={isExpanded}
      data-expanded={isExpanded}
      data-side={side}
      className={toggle}
    >
      {children ?? (
        <>
          <span className={sidebarIcon}>
            <AppIcon icon="sidebar" />
          </span>
          <span className={arrowIcon}>
            <AppIcon icon="sidebar-arrow" />
          </span>
        </>
      )}
    </Button>
  );
}
