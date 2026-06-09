import { render } from "@testing-library/react";

import { useSidebar } from "@/contexts/core";
import { useInternalSidebar } from "@/contexts/internals";

describe("Sidebar - cornercases", () => {
  it("useSidebar - throws error when used outside of SidebarProvider", () => {
    const TestComponent = () => {
      useSidebar();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "useSidebar must be used within a SidebarProvider",
    );
  });

  it("useInternalSidebar - throws error when used outside of SidebarProvider", () => {
    const TestComponent = () => {
      useInternalSidebar();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "Sidebar components must be used within a SidebarProvider",
    );
  });
});
