import { createContext, useContext } from "react";

type SidebarContextValue = {
  isExpanded: boolean;
  toggleSidebar: () => void;
  isCollapsedToIcons: boolean;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}
