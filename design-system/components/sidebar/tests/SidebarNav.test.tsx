import { render } from "@testing-library/react";

import { SidebarProvider } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";

describe("SidebarNav", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <div>Test Nav Item</div>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(getByText("Test Nav Item")).toBeTruthy();
  });

  it("throws error when used outside of Sidebar", () => {
    // Suppress console error for this test
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<SidebarNav>Test</SidebarNav>)).toThrow(
      "SidebarNav must be used inside SidebarBody.",
    );

    // Restore console error
    consoleErrorMock.mockRestore();
  });
});
