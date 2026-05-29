import { fireEvent, render } from "@testing-library/react";

import { LinkButton } from "@/LinkButton";

describe("LinkButton", () => {
  it("renders children correctly", () => {
    const onClick = vi.fn();

    const { getByText } = render(
      <LinkButton onClick={onClick}>Click Me</LinkButton>,
    );

    const button = getByText("Click Me");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
