import { useContext } from "react";
import { Link, type LinkProps } from "@justkits/headless-ui/Link";
import clsx from "clsx";

import { SidebarNavContext } from "@/contexts/internals";
import { styles } from "./styles.css";

export interface SidebarLinkProps extends Omit<LinkProps, "href" | "children"> {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export function SidebarLink({
  children,
  href,
  isActive = false,
  isDisabled = false,
  isExternal = false,
  className,
  style,
  ref,
  ...rest
}: Readonly<SidebarLinkProps>) {
  const isInsideNav = useContext(SidebarNavContext);

  if (!isInsideNav) {
    throw new Error("Sidebar.Link must be used inside Sidebar.Nav.");
  }

  return (
    <div
      ref={ref}
      className={clsx(styles.link, className)}
      style={style}
      data-active={isActive || undefined}
      data-disabled={isDisabled || undefined}
    >
      {children}
      <Link
        {...rest}
        href={href}
        isDisabled={isDisabled}
        isExternal={isExternal}
        aria-current={isActive ? "page" : undefined}
        className={styles.linkOverlay}
      />
    </div>
  );
}
