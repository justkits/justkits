import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider, type SidebarProviderProps } from "@/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarToggle } from "@/Toggle/Toggle";
import { SidebarItem } from "@/Item/Item";
import { SidebarItemToggle } from "@/Item/Toggle";
import { SidebarItemRight } from "@/Item/Right";

function Wrapper({ children, ...rest }: Readonly<SidebarProviderProps>) {
  return (
    <SidebarProvider {...rest}>
      <SidebarBody>
        <SidebarNav>{children}</SidebarNav>
      </SidebarBody>
      <SidebarToggle data-testid="toggle" />
    </SidebarProvider>
  );
}

describe("SidebarItem", () => {
  beforeAll(() => {
    globalThis.window.addEventListener("click", (e) => e.preventDefault());
  });

  it("renders normal mode correctly (no children, non-icon-mode)", () => {
    const { getByRole, getByText, rerender } = render(
      <Wrapper>
        <SidebarItem href="/test" label="Dashboard" />
      </Wrapper>,
    );

    expect(getByText("Dashboard")).toBeTruthy();

    // renders active state correctly
    rerender(
      <Wrapper>
        <SidebarItem href="/test" label="Dashboard" isActive />
      </Wrapper>,
    );

    expect(getByText("Dashboard")).toBeTruthy();
    expect(getByRole("link").getAttribute("aria-current")).toBe("page");
  });

  it("renders icon mode correctly", () => {
    const { getByTestId, getByText, queryByText, rerender } = render(
      <Wrapper collapse="icons">
        <SidebarItem href="/test" label="Dashboard" icon={<span>Icon</span>} />
      </Wrapper>,
    );

    expect(getByText("Icon")).toBeTruthy();
    expect(getByText("Dashboard")).toBeTruthy();

    // label should not be visible in icon mode
    fireEvent.click(getByTestId("toggle"));
    expect(queryByText("Dashboard")).toBeNull();

    // try rendering in right side (coverage purpose)
    rerender(
      <Wrapper collapse="icons" side="right">
        <SidebarItem href="/test" label="Dashboard" icon={<span>Icon</span>} />
      </Wrapper>,
    );

    expect(getByText("Icon")).toBeTruthy();
  });

  it("renders right content correctly", () => {
    const { getByText } = render(
      <Wrapper>
        <SidebarItem
          href="/test"
          label="Dashboard"
          right={<SidebarItemRight>Right</SidebarItemRight>}
        />
      </Wrapper>,
    );

    expect(getByText("Right")).toBeTruthy();
  });

  it("renders right content on hover correctly", () => {
    const { getByText } = render(
      <Wrapper>
        <SidebarItem
          href="/test"
          label="Dashboard"
          right={<SidebarItemRight showOnHover>Right</SidebarItemRight>}
        />
      </Wrapper>,
    );

    expect(getByText("Right")).toBeTruthy();
  });

  it("renders and toggles children correctly", () => {
    const { getByRole, getByTestId, getByText, rerender } = render(
      <Wrapper>
        <SidebarItem
          href="/test"
          label="Dashboard"
          right={<SidebarItemToggle data-testid="item-toggle" />}
        >
          <SidebarItem href="/test/sub" label="Sub Item" />
        </SidebarItem>
      </Wrapper>,
    );

    expect(getByText("Dashboard")).toBeTruthy();
    expect(getByText("Sub Item")).toBeTruthy();

    const subitem = getByRole("group", { hidden: true });
    expect(subitem.dataset.state).toBe("closed");

    fireEvent.click(getByTestId("item-toggle"));
    expect(subitem.dataset.state).toBe("open");

    // renders correctly when active
    rerender(
      <Wrapper>
        <SidebarItem
          href="/test"
          label="Dashboard"
          isActive
          right={<SidebarItemToggle data-testid="item-toggle" />}
        >
          <SidebarItem href="/test/sub" label="Sub Item" />
        </SidebarItem>
      </Wrapper>,
    );

    expect(
      getByText("Dashboard").parentElement?.parentElement?.dataset.active,
    ).toBe("true");
  });

  it("renders correctly even if label is not a string", () => {
    const { getByText, rerender } = render(
      <Wrapper>
        <SidebarItem href="/test" label={<span>Dashboard</span>} />
      </Wrapper>,
    );

    expect(getByText("Dashboard")).toBeTruthy();

    // renders correctly with children
    rerender(
      <Wrapper>
        <SidebarItem
          href="/test"
          label={<span>Dashboard</span>}
          right={<SidebarItemToggle data-testid="item-toggle" />}
        >
          <SidebarItem href="/test/sub" label={<span>Sub Item</span>} />
        </SidebarItem>
      </Wrapper>,
    );

    expect(getByText("Dashboard")).toBeTruthy();
    expect(getByText("Sub Item")).toBeTruthy();
  });

  it("should warn on console and render nothing if icon is not provided in icon mode", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const { queryByText } = render(
      <Wrapper collapse="icons" defaultExpanded={false}>
        <SidebarItem href="/test" label="Dashboard" />
      </Wrapper>,
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "SidebarItem: 'icon' prop is required when sidebar collapse is 'icons'.",
    );
    expect(queryByText("Dashboard")).toBeNull();

    consoleWarnSpy.mockRestore();
  });

  it("throws an error if SidebarItem is used outside of SidebarNav", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() =>
      render(
        <SidebarProvider>
          <SidebarItem href="/test" label="Dashboard" />
        </SidebarProvider>,
      ),
    ).toThrow("Sidebar.Item must be used inside Sidebar.Nav.");

    consoleErrorSpy.mockRestore();
  });
});
