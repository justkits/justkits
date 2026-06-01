import { render } from "@testing-library/react";

import { Spinner } from "@/components/Loading";

describe("Spinner", () => {
  it("renders the default Spinner correctly", () => {
    const { getByTestId } = render(<Spinner data-testid="spinner" />);
    const spinner = getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  it("renders the Spinner with the correct custom properties", () => {
    const { getByTestId } = render(
      <Spinner
        variant="loading-tail"
        size="large"
        className="custom-spinner"
        style={{ animationDuration: "2s" }}
        data-testid="spinner"
      />,
    );

    const spinner = getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });
});
