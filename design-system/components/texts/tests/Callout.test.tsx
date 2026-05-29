import { render } from "@testing-library/react";

import { Callout } from "@/Callout";

describe("Callout", () => {
  it("renders the callout with correct content and default properties", () => {
    const { getByText } = render(
      <Callout title="Test Callout" icon={<span>Icon</span>}>
        This is an info callout
      </Callout>,
    );

    expect(getByText("Icon")).toBeTruthy();
    expect(getByText("Test Callout")).toBeTruthy();
    expect(getByText("This is an info callout")).toBeTruthy();

    // default variant and size: check using class names
    const calloutElement = getByText("Test Callout")
      .parentElement as HTMLElement;
    expect(calloutElement.className).toContain("info");
    expect(calloutElement.className).toContain("medium");
  });

  it("applies the correct variant and size classes", () => {
    const { container } = render(
      <Callout
        title="Warning Callout"
        icon={<span>Icon</span>}
        variant="warning"
        size="large"
      >
        This is a warning callout
      </Callout>,
    );

    const calloutElement = container.firstChild as HTMLElement;
    expect(calloutElement.className).toContain("warning");
    expect(calloutElement.className).toContain("large");
  });

  it("renders small callout correctly", () => {
    const { getByText } = render(
      <Callout
        title="Small Callout"
        icon={<span>Icon</span>}
        variant="success"
        size="small"
      >
        This is a small callout
      </Callout>,
    );

    expect(getByText("Icon")).toBeTruthy();
    expect(getByText("Small Callout")).toBeTruthy();
    expect(getByText("This is a small callout")).toBeTruthy();

    const calloutElement = getByText("Small Callout")
      .parentElement as HTMLElement;
    expect(calloutElement.className).toContain("success");
    expect(calloutElement.className).toContain("small");
  });

  it("handles callout without content (children) correctly", () => {
    const { getByText } = render(
      <Callout title="Note Callout" icon={<span>Icon</span>} variant="note" />,
    );

    expect(getByText("Icon")).toBeTruthy();
    expect(getByText("Note Callout")).toBeTruthy();
  });
});
