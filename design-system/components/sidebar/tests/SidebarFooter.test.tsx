import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarFooter } from "@/Footer/Footer";
import { SidebarToggle } from "@/Toggle/Toggle";

describe("SidebarFooter", () => {
  it("warns on console when SidebarFooter is in icon mode but 'collapsed' prop is not provided", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(
      <SidebarProvider collapse="icons" isExpanded={false}>
        <SidebarBody>
          <SidebarFooter>Footer Content</SidebarFooter>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "SidebarFooter: 'collapsed' prop should be provided when collapse is set to \"icons\".",
    );

    consoleWarnSpy.mockRestore();
  });

  it("renders collapsed when collapse is set to 'icons'", () => {
    const { getByTestId, getByText, queryByText } = render(
      <SidebarProvider collapse="icons">
        <SidebarBody>
          <SidebarFooter collapsed="Collapsed Footer">
            Footer Content
          </SidebarFooter>
        </SidebarBody>
        <SidebarToggle data-testid="sidebar-toggle" />
      </SidebarProvider>,
    );

    // initially, it should render footer content
    expect(queryByText("Collapsed Footer")).toBeNull();
    expect(getByText("Footer Content")).toBeTruthy();

    // toggle to collapsed state
    fireEvent.click(getByTestId("sidebar-toggle"));

    // it should render collapsed content
    expect(getByText("Collapsed Footer")).toBeTruthy();
    expect(queryByText("Footer Content")).toBeNull();
  });

  it("throws error when used outside of Sidebar", () => {
    expect(() =>
      render(
        <SidebarProvider>
          <SidebarFooter>Footer Content</SidebarFooter>
        </SidebarProvider>,
      ),
    ).toThrow("SidebarFooter must be used inside SidebarBody.");
  });
});
