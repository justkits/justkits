import { createContext, useContext } from "react";

type InternalSidebarContextValue = {
  collapse: "hide" | "icons" | "disable";
  side: "left" | "right";
  isIconMode: boolean;
  isCollapsedToIcons: boolean;
  contentId: string;
};

export const InternalSidebarContext =
  createContext<InternalSidebarContextValue | null>(null);

export function useInternalSidebar() {
  const context = useContext(InternalSidebarContext);

  if (!context) {
    throw new Error("Sidebar components must be used within a SidebarProvider");
  }

  return context;
}

export const SidebarBodyContext = createContext<boolean>(false);
export const SidebarNavContext = createContext<boolean>(false);
