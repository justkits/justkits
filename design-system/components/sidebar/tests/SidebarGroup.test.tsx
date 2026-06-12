import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarGroup } from "@/Group/Group";
import { SidebarToggle } from "@/Toggle/Toggle";

describe("SidebarGroup", () => {
  it("renders children with default props correctly", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup>
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    // Verify that the label is rendered
    expect(getByText("Child Content")).toBeTruthy();
  });

  it("renders with label and right content", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup label="Test Group" right={<div>Right Content</div>}>
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    // Verify that the label and right content are rendered
    expect(getByText("Test Group")).toBeTruthy();
    expect(getByText("Right Content")).toBeTruthy();
    expect(getByText("Child Content")).toBeTruthy();
  });

  it("renders with label component (not just string)", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup label={<div>Custom Label</div>}>
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    // Verify that the custom label is rendered
    expect(getByText("Custom Label")).toBeTruthy();
    expect(getByText("Child Content")).toBeTruthy();
  });

  it("renders with custom header", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup header={<div>Custom Header</div>}>
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    // Verify that the custom header is rendered
    expect(getByText("Custom Header")).toBeTruthy();
    expect(getByText("Child Content")).toBeTruthy();
  });

  it("handles default iconMode correctly", () => {
    const { getByTestId, getByText, queryByText } = render(
      <SidebarProvider collapse="icons">
        <SidebarBody data-testid="sidebar-body">
          <SidebarNav>
            <SidebarGroup label="Test Group">
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
        <SidebarToggle data-testid="sidebar-toggle" />
      </SidebarProvider>,
    );

    const body = getByTestId("sidebar-body");
    const toggle = getByTestId("sidebar-toggle");

    // Initial states
    expect(body.dataset.state).toBe("expanded");
    expect(getByText("Child Content")).toBeTruthy();
    expect(getByText("Test Group")).toBeTruthy();

    fireEvent.click(toggle);
    expect(body.dataset.state).toBe("collapsed");
    expect(getByText("Child Content")).toBeTruthy(); // child content should still be visible
    expect(queryByText("Test Group")).toBeNull(); // label should not be visible
  });

  describe("collapsible toggle accessible name", () => {
    it("uses string label as aria-label on the toggle", () => {
      const { getByRole } = render(
        <SidebarProvider>
          <SidebarBody>
            <SidebarNav>
              <SidebarGroup label="Projects" collapsible>
                <div>Child Content</div>
              </SidebarGroup>
            </SidebarNav>
          </SidebarBody>
        </SidebarProvider>,
      );

      expect(getByRole("button", { name: "Projects" })).toBeTruthy();
    });

    it("uses aria-label prop over string label", () => {
      const { getByRole } = render(
        <SidebarProvider>
          <SidebarBody>
            <SidebarNav>
              <SidebarGroup
                label="Projects"
                aria-label="Toggle Projects group"
                collapsible
              >
                <div>Child Content</div>
              </SidebarGroup>
            </SidebarNav>
          </SidebarBody>
        </SidebarProvider>,
      );

      expect(
        getByRole("button", { name: "Toggle Projects group" }),
      ).toBeTruthy();
    });

    it("falls back to 'Toggle group' when label is a ReactNode", () => {
      const { getByRole } = render(
        <SidebarProvider>
          <SidebarBody>
            <SidebarNav>
              <SidebarGroup label={<span>Projects</span>} collapsible>
                <div>Child Content</div>
              </SidebarGroup>
            </SidebarNav>
          </SidebarBody>
        </SidebarProvider>,
      );

      expect(getByRole("button", { name: "Toggle group" })).toBeTruthy();
    });
  });

  describe("collapsible behavior", () => {
    it("handles collapsible state changes correctly", () => {
      const { getByTestId, getByRole } = render(
        <SidebarProvider>
          <SidebarBody>
            <SidebarNav>
              <SidebarGroup label="Test Group" collapsible>
                <div data-testid="child-content">Child Content</div>
              </SidebarGroup>
            </SidebarNav>
          </SidebarBody>
        </SidebarProvider>,
      );

      const toggle = getByRole("button");
      const content = getByTestId("child-content");

      // Initially, the group should be expanded
      expect(content.dataset.state).toBe("open");

      // Simulate collapsing the group
      fireEvent.click(toggle);
      expect(content.dataset.state).toBe("closed"); // child content should still be visible when collapsed
    });

    it("handles custom collapsible icon and iconSide correctly", () => {
      const { getByTestId, getByRole } = render(
        <SidebarProvider>
          <SidebarBody>
            <SidebarNav>
              <SidebarGroup
                label="Test Group"
                collapsible
                icon={<div data-testid="custom-icon">Custom Icon</div>}
                iconSide="end"
              >
                <div data-testid="child-content">Child Content</div>
              </SidebarGroup>
            </SidebarNav>
          </SidebarBody>
        </SidebarProvider>,
      );

      const toggle = getByRole("button");
      const content = getByTestId("child-content");

      // Verify that the custom icon is rendered on the correct side
      expect(getByTestId("custom-icon")).toBeTruthy();

      // Simulate collapsing the group
      fireEvent.click(toggle);
      expect(content.dataset.state).toBe("closed"); // child content should still be visible when collapsed
    });

    it("warns on console when iconSide is 'end' and right is provided", () => {
      const consoleWarn = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      render(
        <SidebarProvider>
          <SidebarBody>
            <SidebarNav>
              <SidebarGroup
                label="Test Group"
                collapsible
                iconSide="end"
                right={<div>Right Content</div>}
              >
                <div>Child Content</div>
              </SidebarGroup>
            </SidebarNav>
          </SidebarBody>
        </SidebarProvider>,
      );

      expect(consoleWarn).toHaveBeenCalledWith(
        "Sidebar.Group: 'icon' is ignored when iconSide=\"end\" and 'right' is also provided. Only 'right' will be shown.",
      );

      consoleWarn.mockRestore();
    });
  });

  it("throws error when not used inside SidebarNav", () => {
    // Suppress console error for this test
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <SidebarProvider>
          <SidebarGroup label="Test Group">
            <div>Child Content</div>
          </SidebarGroup>
        </SidebarProvider>,
      );
    }).toThrow("SidebarGroup must be used inside SidebarNav.");

    // Restore console error
    consoleError.mockRestore();
  });
});
