import clsx from "clsx";

import { useSidebar } from "@/contexts/core";
import { SidebarBodyContext, useInternalSidebar } from "@/contexts/internals";
import { styles } from "./styles.css";

export interface SidebarBodyProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "id"
> {
  children: React.ReactNode;
  scope?: "app" | "page";
  appearance?: "default" | "floating" | "inset";
}

export function SidebarBody({
  children,
  scope = "app",
  appearance = "default",
  className,
  "aria-label": ariaLabel = scope === "app" ? "Sidebar" : undefined,
  ...rest
}: Readonly<SidebarBodyProps>) {
  const { isExpanded } = useSidebar();
  const { contentId, collapse, side } = useInternalSidebar();

  const Component = scope === "app" ? "aside" : "div";

  const isHidden = collapse === "hide" && !isExpanded;

  return (
    <SidebarBodyContext value={true}>
      <Component
        {...rest}
        aria-label={ariaLabel}
        id={contentId}
        inert={isHidden ? true : undefined}
        data-state={isExpanded ? "expanded" : "collapsed"}
        data-appearance={appearance}
        data-side={side}
        className={clsx(
          styles.sidebar({ appearance, collapse, side }),
          className,
        )}
      >
        {children}
      </Component>
    </SidebarBodyContext>
  );
}
