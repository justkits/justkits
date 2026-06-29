import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarGroup } from "@/Group/Group";
import { SidebarGroupRight } from "@/Group/Right";
import { SidebarToggle } from "@/Toggle/Toggle";

describe("SidebarGroup", () => {
  it("renders children with default props correctly (label is string)", () => {
    const { getByLabelText, getByText, queryByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup label="Test Group">
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    // Verify that the label is rendered
    expect(getByText("Test Group")).toBeTruthy();
    expect(getByText("Child Content")).toBeTruthy();

    // check if aria-label is set correctly on the toggle button
    expect(getByLabelText("Test Group")).toBeTruthy();

    // Simulate clicking the toggle button to collapse the group
    const toggleButton = getByLabelText("Test Group");
    fireEvent.click(toggleButton);

    // After collapsing, the child content should not be visible
    expect(queryByText("Child Content")).toBeNull();
  });

  it("renders children with default props correctly (label is React element)", () => {
    const { getByLabelText, getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup
              label={<div>Test Group</div>}
              aria-label="Custom Aria Label"
            >
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    // Verify that the label is rendered
    expect(getByText("Test Group")).toBeTruthy();
    expect(getByText("Child Content")).toBeTruthy();

    // check custom aria-label is set correctly on the toggle button
    expect(getByLabelText("Custom Aria Label")).toBeTruthy();
  });

  it("falls back to default aria-label when label is React element and no aria-label is provided", () => {
    const { getByLabelText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup label={<div>Test Group</div>}>
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    // Verify that the default aria-label is set correctly on the toggle button
    expect(getByLabelText("Toggle group")).toBeTruthy();
  });

  it("renders with right content", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup
              label="Test Group"
              right={<SidebarGroupRight>Right Content</SidebarGroupRight>}
            >
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

  it("handles controlled open state correctly", () => {
    const onOpenChangeMock = vi.fn();

    const { getByLabelText, queryByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup
              label="Test Group"
              isOpen={true}
              onOpenChange={onOpenChangeMock}
            >
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    // Initially, the content should not be visible
    expect(queryByText("Child Content")).toBeTruthy();

    // Simulate clicking the toggle button to collapse the group
    const toggleButton = getByLabelText("Test Group");
    fireEvent.click(toggleButton);

    // The onOpenChange callback should be called with the new state (false)
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });

  it("only renders children when sidebar is collapsed to icons", () => {
    const { getByText, queryByText } = render(
      <SidebarProvider collapse="icons">
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup label="Test Group">
              <div>Child Content</div>
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
        <SidebarToggle data-testid="sidebar-toggle">Toggle</SidebarToggle>
      </SidebarProvider>,
    );

    // When collapsed to icons, the child content should be rendered
    expect(getByText("Test Group")).toBeTruthy();
    expect(getByText("Child Content")).toBeTruthy();

    // Simulate clicking the toggle button to expand the sidebar
    const toggleButton = getByText("Toggle");
    fireEvent.click(toggleButton);

    // After expanding, the child content should still be rendered, but not the label
    expect(queryByText("Test Group")).toBeNull();
    expect(getByText("Child Content")).toBeTruthy();
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
