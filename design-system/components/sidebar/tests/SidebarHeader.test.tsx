import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarHeader } from "@/Header/Header";
import { SidebarHeaderIcon } from "@/Header/Icon";
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

  it("handles collapse to icons correctly", () => {
    const { getByTestId, getByText, queryByText } = render(
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
    expect(getByText("Header Content")).toBeTruthy();
    expect(queryByText("Collapsed Header")).toBeNull();

    fireEvent.click(toggle);
    expect(sidebar.dataset.state).toBe("collapsed");
    expect(getByText("Collapsed Header")).toBeTruthy();
    expect(queryByText("Header Content")).toBeNull();
  });

  it("renders SidebarHeaderIcon when provided", () => {
    const { getByTestId, getByText, queryByText } = render(
      <SidebarProvider collapse="icons">
        <SidebarBody data-testid="sidebar">
          <SidebarHeader
            collapsed={
              <SidebarHeaderIcon
                data-testid="header-icon"
                toggle={<div data-testid="custom-toggle">Custom Toggle</div>}
              >
                Header Icon
              </SidebarHeaderIcon>
            }
          >
            Header Content
          </SidebarHeader>
        </SidebarBody>
        <SidebarToggle data-testid="sidebar-toggle" />
      </SidebarProvider>,
    );

    // initially expanded
    expect(getByText("Header Content")).toBeTruthy();

    // toggle to collapsed state
    const toggle = getByTestId("sidebar-toggle");
    fireEvent.click(toggle);

    // check content if it's switched
    expect(queryByText("Header Content")).toBeNull();
  });

  it("warns when 'collapsed' prop is missing with sidebar collapse 'icons'", () => {
    const consoleWarnMock = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const { getByTestId } = render(
      <SidebarProvider collapse="icons">
        <SidebarBody data-testid="sidebar">
          <SidebarHeader>Header Content</SidebarHeader>
        </SidebarBody>
        <SidebarToggle data-testid="sidebar-toggle" />
      </SidebarProvider>,
    );

    fireEvent.click(getByTestId("sidebar-toggle"));

    expect(consoleWarnMock).toHaveBeenCalledWith(
      "SidebarHeader: 'collapsed' prop is required when sidebar collapse is 'icons'.",
    );

    consoleWarnMock.mockRestore();
  });

  it("warns when 'collapsed' prop is provided but sidebar collapse is not 'icons'", () => {
    const consoleWarnMock = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const { getByTestId } = render(
      <SidebarProvider collapse="hide">
        <SidebarBody data-testid="sidebar">
          <SidebarHeader collapsed="Collapsed Header">
            Header Content
          </SidebarHeader>
        </SidebarBody>
        <SidebarToggle data-testid="sidebar-toggle" />
      </SidebarProvider>,
    );

    fireEvent.click(getByTestId("sidebar-toggle"));

    expect(consoleWarnMock).toHaveBeenCalledWith(
      "SidebarHeader: 'collapsed' prop has no effect when sidebar collapse is not 'icons'.",
    );

    consoleWarnMock.mockRestore();
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
