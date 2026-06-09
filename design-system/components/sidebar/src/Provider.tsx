import { useCallback, useId, useMemo, useState } from "react";

import { SidebarContext } from "./contexts/core";
import { InternalSidebarContext } from "./contexts/internals";

export interface SidebarProviderProps {
  children: React.ReactNode;
  collapse?: "hide" | "icons" | "disable";
  side?: "left" | "right";
  defaultExpanded?: boolean;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export function SidebarProvider({
  children,
  collapse = "hide",
  side = "left",
  defaultExpanded = true,
  isExpanded: controlledExpanded,
  onExpandedChange,
}: Readonly<SidebarProviderProps>) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded ?? internalExpanded;
  const contentId = useId();

  const toggleSidebar = useCallback(() => {
    if (collapse === "disable") {
      console.warn(
        'SidebarProvider: toggleSidebar called but collapse is set to "disable".',
      );
      return;
    }

    if (controlledExpanded === undefined) {
      setInternalExpanded((prev) => !prev);
    } else {
      if (!onExpandedChange) {
        console.warn(
          "SidebarProvider: `isExpanded` is controlled but `onExpandedChange` is not provided. The sidebar cannot be toggled.",
        );
        return;
      }
      onExpandedChange(!controlledExpanded);
    }
  }, [collapse, controlledExpanded, onExpandedChange]);

  const contextValue = useMemo(
    () => ({ isExpanded, toggleSidebar }),
    [isExpanded, toggleSidebar],
  );

  const internalContextValue = useMemo(
    () => ({
      collapse,
      side,
      isIconMode: collapse === "icons",
      isCollapsedToIcons: collapse === "icons" && !isExpanded,
      contentId,
    }),
    [contentId, collapse, side, isExpanded],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <InternalSidebarContext.Provider value={internalContextValue}>
        {children}
      </InternalSidebarContext.Provider>
    </SidebarContext.Provider>
  );
}
