import { useContext } from "react";
import { Collapsible } from "@justkits/headless-ui/Collapsible";
import { AppIcon } from "@justkits/icons";
import clsx from "clsx";

import { useSidebar } from "@/contexts/core";
import { SidebarNavContext } from "@/contexts/internals";
import { styles } from "./styles.css";

export type SidebarGroupProps = {
  // grouped items
  children: React.ReactNode;
  // group header label and right
  label?: React.ReactNode;
  right?: React.ReactNode;
  showRight?: "always" | "hover";
  // escape hatch for the header
  header?: React.ReactNode;
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
} & (
  | {
      collapsible: true;
      icon?: React.ReactNode;
      iconSide?: "left" | "right" | "end";
      showIcon?: "always" | "hover";
      defaultOpen?: boolean;
      isOpen?: boolean;
      onOpenChange?: (open: boolean) => void;
    }
  | {
      collapsible?: false;
      icon?: never;
      iconSide?: never;
      showIcon?: never;
      defaultOpen?: never;
      isOpen?: never;
      onOpenChange?: never;
    }
);

export function SidebarGroup({
  children,
  label,
  right,
  showRight = "hover",
  header,
  "aria-label": ariaLabel,
  collapsible = false,
  icon,
  iconSide = "right",
  showIcon = "hover",
  defaultOpen = true,
  isOpen,
  onOpenChange,
  className,
  style,
}: Readonly<SidebarGroupProps>) {
  const isInsideNav = useContext(SidebarNavContext);
  const { isCollapsedToIcons } = useSidebar();

  if (!isInsideNav) {
    throw new Error("SidebarGroup must be used inside SidebarNav.");
  }

  if (collapsible && iconSide === "end" && right) {
    console.warn(
      "Sidebar.Group: 'icon' is ignored when iconSide=\"end\" and 'right' is also provided. Only 'right' will be shown.",
    );
  }

  if (isCollapsedToIcons) {
    return (
      <div className={clsx(styles.group, className)} style={style}>
        {children}
      </div>
    );
  }

  if (!collapsible) {
    return (
      <div className={clsx(styles.group, className)} style={style}>
        {header ?? (
          <div className={styles.header({})}>
            <Label label={label} />
            <Right right={right} showRight={showRight} />
          </div>
        )}
        {children}
      </div>
    );
  }

  const isIconEnd = iconSide === "end";
  const showEndIcon = isIconEnd && !right;

  const toggleLabel =
    ariaLabel ?? (typeof label === "string" ? label : "Toggle group");

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className={clsx(styles.group, className)} style={style}>
        {header ?? (
          <div className={styles.header({ interactive: true })}>
            <div
              className={styles.headerLeft({
                iconSide: isIconEnd ? undefined : iconSide,
              })}
            >
              {!isIconEnd && <Icon icon={icon} showIcon={showIcon} />}
              <Label label={label} />
            </div>
            <Right right={right} showRight={showRight} />
            {showEndIcon && <Icon icon={icon} showIcon={showIcon} />}
            <Collapsible.Toggle
              aria-label={toggleLabel}
              className={styles.toggle}
            />
          </div>
        )}
        <Collapsible.Content asChild className={styles.children}>
          {children}
        </Collapsible.Content>
      </div>
    </Collapsible>
  );
}

function Icon({
  icon,
  showIcon,
}: Readonly<Pick<SidebarGroupProps, "icon" | "showIcon">>) {
  if (!icon) {
    return (
      <AppIcon
        icon="chevron-right"
        className={styles.icon({ showIcon, default: true })}
      />
    );
  }

  return <div className={styles.icon({ showIcon })}>{icon}</div>;
}

function Label({ label }: Readonly<Pick<SidebarGroupProps, "label">>) {
  if (!label) {
    return null;
  }

  const isLabelString = typeof label === "string";

  return isLabelString ? <span>{label}</span> : <>{label}</>;
}

function Right({
  right,
  showRight,
}: Readonly<Pick<SidebarGroupProps, "right" | "showRight">>) {
  if (!right) {
    return null;
  }

  return <div className={styles.headerRight({ showRight })}>{right}</div>;
}
