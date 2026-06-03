import { useCallback, useId, useMemo, useState } from "react";

import { SidebarContext } from "./contexts/core";
import { InternalSidebarContext } from "./contexts/internals";

export interface SidebarProviderProps {
  children: React.ReactNode;
  collapse?: "hide" | "icons" | "disable";
  side?: "left" | "right";
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export function SidebarProvider({
  children,
  collapse = "hide",
  side = "left",
  defaultExpanded = false,
  expanded,
  onExpandedChange,
}: Readonly<SidebarProviderProps>) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = expanded ?? internalExpanded;
  const contentId = useId();

  const toggleSidebar = useCallback(() => {
    if (collapse === "disable") return;

    if (expanded === undefined) {
      setInternalExpanded((prev) => !prev);
    } else {
      onExpandedChange?.(!expanded);
    }
  }, [collapse, expanded, onExpandedChange]);

  const contextValue = useMemo(
    () => ({ isExpanded, toggleSidebar }),
    [isExpanded, toggleSidebar],
  );

  const internalContextValue = useMemo(
    () => ({
      contentId,
      collapse,
      side,
      isIconMode: collapse === "icons" && !isExpanded,
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
