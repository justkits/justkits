import { render } from "@testing-library/react";

import { Divider } from "@/Divider/Divider";

describe("Divider", () => {
  it("should render a decorative horizontal divider by default", () => {
    const { getByTestId } = render(
      <Divider decorative data-testid="divider" />,
    );
    const divider = getByTestId("divider");

    expect(divider).toBeTruthy();
    expect(divider.getAttribute("aria-hidden")).toBe("true");
  });

  it("should render a non-decorative horizontal divider when decorative is false", () => {
    const { getByTestId } = render(
      <Divider label="Section Divider" data-testid="divider" />,
    );
    const divider = getByTestId("divider");

    expect(divider).toBeTruthy();
    expect(divider.getAttribute("aria-orientation")).toBe("horizontal");
    expect(divider.getAttribute("aria-label")).toBe("Section Divider");
  });

  it("should render a decorative vertical divider when vertical is true and decorative is true", () => {
    const { getByTestId } = render(
      <Divider vertical decorative data-testid="divider" />,
    );
    const divider = getByTestId("divider");

    expect(divider).toBeTruthy();
    expect(divider.getAttribute("aria-hidden")).toBe("true");
  });

  it("should render a non-decorative vertical divider when vertical is true and decorative is false", () => {
    const { getByTestId } = render(<Divider vertical data-testid="divider" />);
    const divider = getByTestId("divider");

    expect(divider).toBeTruthy();
    expect(divider.getAttribute("aria-orientation")).toBe("vertical");
  });
});
