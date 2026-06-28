import { useContext } from "react";
import { Collapsible } from "@justkits/headless-ui/Collapsible";
import { Tooltip } from "@justkits/headless-ui/Tooltip";

import { SidebarLink } from "@/Link/Link";
import { useSidebar } from "@/contexts/core";
import { SidebarNavContext, useInternalSidebar } from "@/contexts/internals";
import { styles } from "./styles.css";

export interface SidebarItemProps {
  href: string;
  as?: React.ElementType;
  isActive?: boolean;
  isDisabled?: boolean;
  isExternal?: boolean;
  label: React.ReactNode;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function SidebarItem({
  isActive = false,
  label,
  icon,
  right,
  defaultOpen = false,
  isOpen,
  onOpenChange,
  children,
  ...linkProps
}: Readonly<SidebarItemProps>) {
  const isInsideNav = useContext(SidebarNavContext);
  const { isCollapsedToIcons } = useSidebar();
  const { side } = useInternalSidebar();

  if (!isInsideNav) {
    throw new Error("Sidebar.Item must be used inside Sidebar.Nav.");
  }

  if (isCollapsedToIcons) {
    if (!icon) {
      console.warn(
        "SidebarItem: 'icon' prop is required when sidebar collapse is 'icons'.",
      );
      return null;
    }

    return (
      <Tooltip position={side === "left" ? "right" : "left"} openDelay={200}>
        <Tooltip.Trigger asChild>
          <Link {...linkProps} isActive={isActive} isCollapsedToIcons>
            {icon}
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Message>{label}</Tooltip.Message>
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip>
    );
  }

  if (!children)
    return (
      <Link {...linkProps} isActive={isActive}>
        <LinkContent
          icon={icon}
          label={label}
          right={right}
          isActive={isActive}
        />
      </Link>
    );

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className={styles.wrapper}>
        <Link {...linkProps} isActive={isActive}>
          <LinkContent
            icon={icon}
            label={label}
            right={right}
            isActive={isActive}
          />
        </Link>
        <Collapsible.Content className={styles.subitems}>
          {children}
        </Collapsible.Content>
      </div>
    </Collapsible>
  );
}

type LinkProps = Pick<
  SidebarItemProps,
  "href" | "as" | "isActive" | "isDisabled" | "isExternal"
> & {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  isCollapsedToIcons?: boolean;
};

function Link({
  children,
  as,
  href,
  isActive,
  isDisabled,
  isExternal,
  ref,
  isCollapsedToIcons,
}: Readonly<LinkProps>) {
  return (
    <SidebarLink
      as={as}
      ref={ref}
      className={styles.link({ isActive, isDisabled, isCollapsedToIcons })}
      href={href}
      isActive={isActive}
      isDisabled={isDisabled}
      isExternal={isExternal}
    >
      {children}
    </SidebarLink>
  );
}

type LinkContentProps = Pick<
  SidebarItemProps,
  "icon" | "label" | "right" | "isActive"
>;

function LinkContent({
  icon,
  label,
  right,
  isActive,
}: Readonly<LinkContentProps>) {
  return (
    <>
      {icon}
      <div className={styles.labelSlot}>
        {typeof label === "string" ? <span>{label}</span> : label}
      </div>
      {right}
      {isActive && <div className={styles.indicator} aria-hidden="true" />}
    </>
  );
}
