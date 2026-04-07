import { render } from "@testing-library/react";

import { Form } from "@/Form";

describe("Form - structure", () => {
  describe("Form.Submit", () => {
    it("must be used within the Form wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() => render(<Form.Submit>Submit</Form.Submit>)).toThrow(
        "Form components must be used within the Form wrapper.",
      );
    });

    it("handles asChild property correctly", () => {
      // asChild이 true인 경우, 자식 요소가 렌더링되어야 한다.
      const { getByText } = render(
        <Form onSubmit={() => {}}>
          <Form.Submit asChild>
            <button type="submit">Submit</button>
          </Form.Submit>
        </Form>,
      );

      expect(getByText("Submit")).toBeTruthy();
    });
  });

  describe("Form.Error", () => {
    it("must be used within the Form wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() =>
        render(<Form.ErrorMessage>Error</Form.ErrorMessage>),
      ).toThrow("Form components must be used within the Form wrapper.");
    });

    it("handles asChild property correctly", () => {
      // asChild이 true인 경우, 자식 요소가 렌더링되어야 한다.
      const { getByText } = render(
        <Form onSubmit={() => {}}>
          <Form.ErrorMessage asChild>
            <p>Error</p>
          </Form.ErrorMessage>
        </Form>,
      );

      expect(getByText("Error")).toBeTruthy();
    });
  });
});
