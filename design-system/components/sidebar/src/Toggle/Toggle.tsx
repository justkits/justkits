import { Button, type ButtonProps } from "@justkits/headless-ui/Button";
import { Tooltip } from "@justkits/headless-ui/Tooltip";
import { KeyboardGroup } from "@justkits/keyboard";
import clsx from "clsx";

import { SidebarToggleIcon } from "./Icon";
import { useSidebar } from "@/contexts/core";
import { useInternalSidebar } from "@/contexts/internals";
import { styles } from "./styles.css";

export interface SidebarToggleProps extends Omit<ButtonProps, "children"> {
  children?: React.ReactNode;
  disableTooltip?: boolean;
}

export function SidebarToggle({
  children = <SidebarToggleIcon />,
  disableTooltip = false,
  className,
  ...rest
}: Readonly<SidebarToggleProps>) {
  const { isExpanded, toggleSidebar } = useSidebar();
  const { collapse, contentId, keyboardShortkey, ariaKeyshortcuts, side } =
    useInternalSidebar();

  if (collapse === "disable") {
    console.warn("Sidebar.Toggle: renders nothing when collapse is 'disable'.");
    return null;
  }

  const buttonProps = {
    ...rest,
    onClick: toggleSidebar,
    "aria-controls": contentId,
    "aria-expanded": isExpanded,
    "data-expanded": isExpanded,
    "data-side": side,
    className: clsx(styles.toggle, className),
  };

  if (!disableTooltip && keyboardShortkey) {
    return (
      <Tooltip position={side === "left" ? "right" : "left"}>
        <Tooltip.Trigger {...buttonProps} aria-keyshortcuts={ariaKeyshortcuts}>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Message>
            <KeyboardGroup keys={keyboardShortkey} />
          </Tooltip.Message>
        </Tooltip.Content>
      </Tooltip>
    );
  }

  if (!disableTooltip && !keyboardShortkey) {
    console.warn(
      "SidebarToggle: please use the 'disableTooltip' prop only when 'keyboardShortkey' is provided to the SidebarProvider.",
    );
  }

  return <Button {...buttonProps}>{children}</Button>;
}
