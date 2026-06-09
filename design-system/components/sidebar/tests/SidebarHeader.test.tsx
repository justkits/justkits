import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarHeader } from "@/Header/Header";
import { SidebarToggle } from "@/Toggle/Toggle";

describe("SidebarHeader", () => {
  it("renders and handles toggle", () => {
    const { getByTestId, getByText } = render(
      <SidebarProvider>
        <SidebarBody data-testid="sidebar">
          <SidebarHeader>Header Content</SidebarHeader>
        </SidebarBody>
        <SidebarToggle data-testid="sidebar-toggle" />
      </SidebarProvider>,
    );

    expect(getByText("Header Content")).toBeTruthy();

    const sidebar = getByTestId("sidebar");
    const toggle = getByTestId("sidebar-toggle");

    expect(sidebar.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(sidebar.dataset.state).toBe("collapsed");
  });

  describe("collapse to icons behavior", () => {
    it("handles with default props correctly", () => {
      const { getByTestId } = render(
        <SidebarProvider collapse="icons">
          <SidebarBody data-testid="sidebar">
            <SidebarHeader collapsed="Collapsed Header">
              Header Content
            </SidebarHeader>
          </SidebarBody>
          <SidebarToggle data-testid="sidebar-toggle" />
        </SidebarProvider>,
      );

      const sidebar = getByTestId("sidebar");
      const toggle = getByTestId("sidebar-toggle");

      expect(sidebar.dataset.state).toBe("expanded");
      expect(getByTestId("sidebar").textContent).toContain("Header Content");

      fireEvent.click(toggle);
      expect(sidebar.dataset.state).toBe("collapsed");
      expect(getByTestId("sidebar").textContent).toContain("Collapsed Header");
    });

    it("handles toggleVariant 'none' correctly", () => {
      const { getByTestId } = render(
        <SidebarProvider collapse="icons">
          <SidebarBody data-testid="sidebar">
            <SidebarHeader
              collapsed="Collapsed Header"
              toggleVariant="none"
              toggle={<div data-testid="custom-toggle">Custom Toggle</div>}
            >
              Header Content
            </SidebarHeader>
          </SidebarBody>
          <SidebarToggle data-testid="sidebar-toggle" />
        </SidebarProvider>,
      );

      const sidebar = getByTestId("sidebar");

      expect(sidebar.dataset.state).toBe("expanded");
      expect(getByTestId("sidebar").textContent).toContain("Header Content");

      fireEvent.click(getByTestId("sidebar-toggle"));
      expect(sidebar.dataset.state).toBe("collapsed");
      expect(getByTestId("sidebar").textContent).toContain("Collapsed Header");
    });

    it("handles toggleVariant 'always' correctly", () => {
      const { getByTestId } = render(
        <SidebarProvider collapse="icons">
          <SidebarBody data-testid="sidebar">
            <SidebarHeader
              collapsed="Collapsed Header"
              toggleVariant="always"
              toggle={<div data-testid="custom-toggle">Custom Toggle</div>}
            >
              Header Content
            </SidebarHeader>
          </SidebarBody>
          <SidebarToggle data-testid="sidebar-toggle" />
        </SidebarProvider>,
      );

      const sidebar = getByTestId("sidebar");

      expect(sidebar.dataset.state).toBe("expanded");
      expect(getByTestId("sidebar").textContent).toContain("Header Content");

      fireEvent.click(getByTestId("sidebar-toggle"));
      expect(sidebar.dataset.state).toBe("collapsed");
      expect(getByTestId("sidebar").textContent).toContain("Custom Toggle");
    });

    it("warns when 'collapsed' prop is missing with toggleVariant 'hover'", () => {
      const consoleWarnMock = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      const { getByTestId } = render(
        <SidebarProvider collapse="icons">
          <SidebarBody data-testid="sidebar">
            <SidebarHeader toggleVariant="hover">Header Content</SidebarHeader>
          </SidebarBody>
          <SidebarToggle data-testid="sidebar-toggle" />
        </SidebarProvider>,
      );

      fireEvent.click(getByTestId("sidebar-toggle"));

      expect(consoleWarnMock).toHaveBeenCalledWith(
        "SidebarHeader: 'collapsed' prop should be provided when toggleVariant is not 'always'.",
      );

      consoleWarnMock.mockRestore();
    });
  });

  it("throws error when used outside of SidebarBody", () => {
    expect(() =>
      render(
        <SidebarProvider>
          <SidebarHeader>Header Content</SidebarHeader>
        </SidebarProvider>,
      ),
    ).toThrow("SidebarHeader must be used inside SidebarBody.");
  });
});
