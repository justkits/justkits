import { SidebarProvider } from "./contexts/Provider";

import { SidebarToggle } from "./toggle/Toggle";

export const Sidebar = Object.assign(SidebarProvider, {
  Toggle: SidebarToggle,
});

export { SidebarProvider } from "./contexts/Provider";

export { SidebarToggle } from "./toggle/Toggle";
