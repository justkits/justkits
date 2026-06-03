import clsx from "clsx";

import { useSidebar } from "@/contexts/core";
import { SidebarBodyContext, useInternalSidebar } from "@/contexts/internals";
import { sidebar } from "./styles.css";

interface SidebarProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  children: React.ReactNode;
  scope?: "app" | "page";
  appearance?: "default" | "floating" | "inset";
}

export function Sidebar({
  children,
  scope = "app",
  appearance = "default",
  className,
  ...rest
}: Readonly<SidebarProps>) {
  const { isExpanded } = useSidebar();
  const { contentId, collapse, side } = useInternalSidebar();

  const Component = scope === "app" ? "aside" : "div";

  return (
    <SidebarBodyContext value={true}>
      <Component
        {...rest}
        id={contentId}
        data-state={isExpanded ? "expanded" : "collapsed"}
        data-appearance={appearance}
        data-side={side}
        className={clsx(sidebar({ appearance, collapse, side }), className)}
      >
        {children}
      </Component>
    </SidebarBodyContext>
  );
}
