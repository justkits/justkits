import { render } from "@testing-library/react";

import { SidebarProvider } from "@/Provider";
import { SidebarBody } from "@/Body/Body";

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
});
