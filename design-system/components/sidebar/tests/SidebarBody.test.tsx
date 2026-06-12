import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarToggle } from "@/Toggle/Toggle";

describe("SidebarBody", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <p>Test Content</p>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(getByText("Test Content")).toBeTruthy();
  });

  it("applies correct aria-label based on scope", () => {
    const { getByTestId } = render(
      <SidebarProvider>
        <SidebarBody scope="app" data-testid="app-sidebar">
          <p>App Scope</p>
        </SidebarBody>
        <SidebarBody scope="page" data-testid="page-sidebar">
          <p>Page Scope</p>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(getByTestId("app-sidebar").getAttribute("aria-label")).toBe(
      "Sidebar",
    );
    expect(getByTestId("page-sidebar").getAttribute("aria-label")).toBeNull();
  });

  describe("collapse='hide' inert behavior", () => {
    it("is not inert when expanded", () => {
      const { getByTestId } = render(
        <SidebarProvider collapse="hide" defaultExpanded>
          <SidebarBody data-testid="sidebar">
            <div />
          </SidebarBody>
        </SidebarProvider>,
      );

      expect(getByTestId("sidebar").hasAttribute("inert")).toBe(false);
    });

    it("becomes inert when collapsed", () => {
      const { getByTestId } = render(
        <SidebarProvider collapse="hide" defaultExpanded>
          <SidebarBody data-testid="sidebar">
            <div />
          </SidebarBody>
          <SidebarToggle data-testid="toggle" />
        </SidebarProvider>,
      );

      fireEvent.click(getByTestId("toggle"));
      expect(getByTestId("sidebar").hasAttribute("inert")).toBe(true);
    });

    it("is not inert when collapsed with collapse='icons'", () => {
      const { getByTestId } = render(
        <SidebarProvider collapse="icons" defaultExpanded>
          <SidebarBody data-testid="sidebar">
            <div />
          </SidebarBody>
          <SidebarToggle data-testid="toggle" />
        </SidebarProvider>,
      );

      fireEvent.click(getByTestId("toggle"));
      expect(getByTestId("sidebar").hasAttribute("inert")).toBe(false);
    });
  });
});
