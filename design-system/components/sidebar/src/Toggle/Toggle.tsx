import { useEffect } from "react";
import { Button, type ButtonProps } from "@justkits/headless-ui/Button";
import { Tooltip } from "@justkits/headless-ui/Tooltip";
import { AppIcon } from "@justkits/icons";
import { KeyboardGroup } from "@justkits/keyboard";

import { useSidebar } from "@/contexts/core";
import { useInternalSidebar } from "@/contexts/internals";
import { styles } from "./styles.css";

export interface SidebarToggleProps extends Omit<ButtonProps, "children"> {
  children?: React.ReactNode;
}

export function SidebarToggle({
  children,
  ...rest
}: Readonly<SidebarToggleProps>) {
  const { collapse, keyboardShortkey, ariaKeyshortcuts } = useInternalSidebar();

  useEffect(() => {
    if (collapse === "disable") {
      console.warn(
        "Sidebar.Toggle: renders nothing when collapse is 'disable'.",
      );
    }
  }, [collapse]);

  if (collapse === "disable") {
    return null;
  }

  if (!keyboardShortkey) {
    return <Toggle {...rest}>{children}</Toggle>;
  }

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Toggle {...rest} aria-keyshortcuts={ariaKeyshortcuts}>
          {children}
        </Toggle>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Message>
          <KeyboardGroup keys={keyboardShortkey} />
        </Tooltip.Message>
      </Tooltip.Content>
    </Tooltip>
  );
}

function Toggle({ children, ...rest }: Readonly<SidebarToggleProps>) {
  const { isExpanded, toggleSidebar } = useSidebar();
  const { contentId, side } = useInternalSidebar();

  return (
    <Button
      {...rest}
      onClick={toggleSidebar}
      aria-controls={contentId}
      aria-expanded={isExpanded}
      data-expanded={isExpanded}
      data-side={side}
      className={styles.toggle}
    >
      {children ?? (
        <>
          <span className={styles.sidebarIcon}>
            <AppIcon icon="sidebar" />
          </span>
          <span className={styles.arrowIcon}>
            <AppIcon icon="sidebar-arrow" />
          </span>
        </>
      )}
    </Button>
  );
}
