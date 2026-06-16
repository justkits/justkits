import { fireEvent, render } from "@testing-library/react";

import { useSidebar } from "@/contexts/core";
import { SidebarProvider, SidebarProviderProps } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarToggle } from "@/Toggle/Toggle";

function TestComponent({ children, ...rest }: Readonly<SidebarProviderProps>) {
  return (
    <SidebarProvider {...rest}>
      <SidebarBody data-testid="sidebar">{children}</SidebarBody>
      <SidebarToggle data-testid="sidebar-toggle">Toggle</SidebarToggle>
    </SidebarProvider>
  );
}

describe("SidebarToggle", () => {
  it("renders and handles toggle correctly", () => {
    const { getByTestId } = render(
      <TestComponent>Sidebar Contents</TestComponent>,
    );

    const toggle = getByTestId("sidebar-toggle");
    const sidebar = getByTestId("sidebar");

    // Initially expanded
    expect(sidebar.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(sidebar.dataset.state).toBe("collapsed");

    fireEvent.click(toggle);
    expect(sidebar.dataset.state).toBe("expanded");
  });

  it("respects controlled expanded state", () => {
    const onExpandedChange = vi.fn();
    const { getByTestId } = render(
      <TestComponent isExpanded={false} onExpandedChange={onExpandedChange}>
        Sidebar Contents
      </TestComponent>,
    );

    const toggle = getByTestId("sidebar-toggle");
    const sidebar = getByTestId("sidebar");

    // Initially collapsed
    expect(sidebar.dataset.state).toBe("collapsed");

    fireEvent.click(toggle);
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  describe("keyboard shortcut", () => {
    it("adds aria-keyshortcuts to the button when keyboardShortkey is set", () => {
      const { getByTestId } = render(
        <TestComponent>Sidebar Contents</TestComponent>,
      );

      expect(
        getByTestId("sidebar-toggle").getAttribute("aria-keyshortcuts"),
      ).toBe("Control+B");
    });

    it("uses the default shortcut when keyboardShortkey is not provided", () => {
      const { getByTestId } = render(
        <TestComponent>Sidebar Contents</TestComponent>,
      );

      expect(
        getByTestId("sidebar-toggle").getAttribute("aria-keyshortcuts"),
      ).toBe("Control+B");
    });
  });

  describe("warnings", () => {
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
    });

    it("warns on console when toggle is called when isExpanded is controlled but onExpandedChange is not provided", () => {
      const { getByTestId } = render(
        <SidebarProvider isExpanded={false}>
          <SidebarToggle data-testid="sidebar-toggle" />
        </SidebarProvider>,
      );

      const toggle = getByTestId("sidebar-toggle");

      fireEvent.click(toggle);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "SidebarProvider: `isExpanded` is controlled but `onExpandedChange` is not provided. The sidebar cannot be toggled.",
      );
    });

    it("warns on console when toggle is trying to be rendered when collapse is set to 'disable'", () => {
      const { queryByTestId } = render(
        <SidebarProvider collapse="disable">
          <SidebarToggle />
        </SidebarProvider>,
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Sidebar.Toggle: renders nothing when collapse is 'disable'.",
      );

      const toggle = queryByTestId("sidebar-toggle");
      expect(toggle).toBeNull();
    });

    it("warns on console when toggleSidebar is called but collapse is set to 'disable'", () => {
      function TestToggle() {
        const { toggleSidebar } = useSidebar();

        return (
          <button onClick={toggleSidebar} data-testid="sidebar-toggle">
            Toggle Sidebar
          </button>
        );
      }

      const { getByTestId } = render(
        <SidebarProvider collapse="disable">
          <TestToggle />
        </SidebarProvider>,
      );

      const toggle = getByTestId("sidebar-toggle");

      fireEvent.click(toggle);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'SidebarProvider: toggleSidebar called but collapse is set to "disable".',
      );
    });
  });
});
