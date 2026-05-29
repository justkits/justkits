import { render } from "@testing-library/react";

import { FormButton } from "@/FormButton";

describe("FormButton", () => {
  it("renders iconLeft, iconRight and children correctly", () => {
    const { getByText } = render(
      <FormButton iconLeft={<span>L</span>} iconRight={<span>R</span>}>
        Submit
      </FormButton>,
    );

    expect(getByText("L")).toBeTruthy();
    expect(getByText("R")).toBeTruthy();
    expect(getByText("Submit")).toBeTruthy();
  });

  describe("loading", () => {
    it("replace: shows fallback, hides everything else", () => {
      const { getByText, queryByText } = render(
        <FormButton
          isLoading
          fallback={<span>Loading...</span>}
          iconLeft={<span>L</span>}
          iconRight={<span>R</span>}
        >
          Submit
        </FormButton>,
      );

      expect(getByText("Loading...")).toBeTruthy();
      expect(queryByText("Submit")).toBeNull();
      expect(queryByText("L")).toBeNull();
      expect(queryByText("R")).toBeNull();
    });

    it("left: shows fallback alongside children", () => {
      const { getByText, queryByText } = render(
        <FormButton
          isLoading
          loadingVariant="left"
          fallback={<span>...</span>}
          iconLeft={<span>L</span>}
          iconRight={<span>R</span>}
        >
          Submit
        </FormButton>,
      );

      expect(getByText("...")).toBeTruthy();
      expect(getByText("Submit")).toBeTruthy();
      expect(getByText("R")).toBeTruthy();
      expect(queryByText("L")).toBeNull();
    });

    it("right: shows fallback alongside children", () => {
      const { getByText, queryByText } = render(
        <FormButton
          isLoading
          loadingVariant="right"
          fallback={<span>...</span>}
          iconLeft={<span>L</span>}
          iconRight={<span>R</span>}
        >
          Submit
        </FormButton>,
      );

      expect(getByText("...")).toBeTruthy();
      expect(getByText("Submit")).toBeTruthy();
      expect(getByText("L")).toBeTruthy();
      expect(queryByText("R")).toBeNull();
    });

    it("no fallback: still renders children", () => {
      const { getByText } = render(<FormButton isLoading>Submit</FormButton>);
      expect(getByText("Submit")).toBeTruthy();
    });
  });
});
