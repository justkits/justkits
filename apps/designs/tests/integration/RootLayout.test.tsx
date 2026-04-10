import { fireEvent, render } from "@testing-library/react";

import { RootLayout } from "@app/root";

describe("RootLayout", () => {
  it("renders header, main and footer correctly", () => {
    const { getByRole, getByText } = render(
      <RootLayout>
        <div>Main Content</div>
      </RootLayout>,
    );

    expect(getByRole("banner")).toBeTruthy(); // Header
    expect(getByRole("main")).toBeTruthy(); // Main content
    expect(getByRole("contentinfo")).toBeTruthy(); // Footer

    // children도 제대로 렌더링되는지 확인
    expect(getByText("Main Content")).toBeTruthy();
  });

  it("does not render sidebar if not given in children", () => {
    const { queryByTestId } = render(
      <RootLayout>
        <div>Main Content</div>
      </RootLayout>,
    );

    expect(queryByTestId("sidebar")).toBeNull(); // Sidebar는 렌더링되지 않아야 함
  });

  it("handles logo click correctly (move to home)", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Main Content</div>
      </RootLayout>,
    );

    fireEvent.click(getByTestId("home-link"));
  });

  it("handles link clicks correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Main Content</div>
      </RootLayout>,
    );

    fireEvent.click(getByText("Primitives"));
  });
});
