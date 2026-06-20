import { render } from "@testing-library/react";

import { SidebarProvider } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarLink } from "@/Link/Link";

describe("SidebarLink", () => {
  beforeAll(() => {
    globalThis.window.addEventListener("click", (e) => e.preventDefault());
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarLink href="/test">Test Link</SidebarLink>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(getByText("Test Link")).toBeTruthy();
  });

  it("renders correctly with isActive", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarLink href="/test" isActive>
              Test Link
            </SidebarLink>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(getByText("Test Link")).toBeTruthy();

    const linkElement = getByText("Test Link").closest("div");
    expect(linkElement?.dataset.active).toBe("true");
  });

  it("renders correctly with isDisabled", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarBody>
          <SidebarNav>
            <SidebarLink href="/test" isDisabled>
              Test Link
            </SidebarLink>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(getByText("Test Link")).toBeTruthy();

    const linkElement = getByText("Test Link").closest("div");
    expect(linkElement?.dataset.disabled).toBe("true");
  });

  it("throws error when used outside of SidebarNav", () => {
    expect(() =>
      render(
        <SidebarProvider>
          <SidebarBody>
            <SidebarLink href="/test">Test Link</SidebarLink>
          </SidebarBody>
        </SidebarProvider>,
      ),
    ).toThrow("Sidebar.Link must be used inside Sidebar.Nav.");
  });
});
