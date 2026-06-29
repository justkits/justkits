import { useContext } from "react";
import { Collapsible } from "@justkits/headless-ui/Collapsible";
import { AppIcon } from "@justkits/icons";
import clsx from "clsx";

import { useSidebar } from "@/contexts/core";
import { SidebarNavContext } from "@/contexts/internals";
import { styles } from "./styles.css";

export type SidebarGroupProps = {
  children: React.ReactNode;
  label: React.ReactNode;
  right?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function SidebarGroup({
  children,
  label,
  right,
  defaultOpen = true,
  isOpen,
  onOpenChange,
  "aria-label": ariaLabel,
  className,
  style,
}: Readonly<SidebarGroupProps>) {
  const isInsideNav = useContext(SidebarNavContext);
  const { isCollapsedToIcons } = useSidebar();

  if (!isInsideNav) {
    throw new Error("SidebarGroup must be used inside SidebarNav.");
  }

  if (isCollapsedToIcons) {
    return (
      <div className={clsx(styles.group, className)} style={style}>
        {children}
      </div>
    );
  }

  const toggleLabel =
    ariaLabel ?? (typeof label === "string" ? label : "Toggle group");

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      unmountOnHide
    >
      <div className={clsx(styles.group, className)} style={style}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {typeof label === "string" ? <span>{label}</span> : label}
            <AppIcon icon="chevron-right" className={styles.icon} />
          </div>
          {right}
          <Collapsible.Toggle
            aria-label={toggleLabel}
            className={styles.toggle}
          />
        </div>
        <Collapsible.Content className={styles.subitems}>
          {children}
        </Collapsible.Content>
      </div>
    </Collapsible>
  );
}
