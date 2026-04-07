import { render } from "@testing-library/react";

import { Field } from "@/Field";

describe("Field - structure", () => {
  describe("Field.Control", () => {
    it("must be used within the Field wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() =>
        render(
          <Field.Control>
            <input />
          </Field.Control>,
        ),
      ).toThrow("Field.Control must be used within the Field wrapper.");
    });
  });

  describe("Field.Label", () => {
    it("must be used within the Field wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() => render(<Field.Label>Label</Field.Label>)).toThrow(
        "Field.Label must be used within the Field wrapper.",
      );
    });

    it("handles asChild property correctly", () => {
      // asChild이 true인 경우, 자식 요소가 렌더링되어야 한다.
      const { getByText } = render(
        <Field>
          <Field.Label asChild>
            <p>Label</p>
          </Field.Label>
          <Field.Control>
            <input type="text" />
          </Field.Control>
        </Field>,
      );

      expect(getByText("Label")).toBeTruthy();
    });
  });

  describe("Field.Description", () => {
    it("must be used within the Field wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() =>
        render(<Field.Description>Description</Field.Description>),
      ).toThrow("Field.Description must be used within the Field wrapper.");
    });

    it("handles asChild property correctly", () => {
      // asChild이 true인 경우, 자식 요소가 렌더링되어야 한다.
      const { getByText } = render(
        <Field>
          <Field.Label>Label</Field.Label>
          <Field.Control>
            <input type="text" />
          </Field.Control>
          <Field.Description asChild>
            <span>Description</span>
          </Field.Description>
        </Field>,
      );

      expect(getByText("Description")).toBeTruthy();
    });
  });

  describe("Field.ErrorMessage", () => {
    it("must be used within the Field wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() =>
        render(<Field.ErrorMessage>Error Message</Field.ErrorMessage>),
      ).toThrow("Field.ErrorMessage must be used within the Field wrapper.");
    });

    it("handles asChild property correctly", () => {
      // asChild이 true인 경우, 자식 요소가 렌더링되어야 한다.
      const { getByText } = render(
        <Field>
          <Field.Label>Label</Field.Label>
          <Field.Control>
            <input type="text" />
          </Field.Control>
          <Field.ErrorMessage asChild>
            <p>Error Message</p>
          </Field.ErrorMessage>
        </Field>,
      );

      expect(getByText("Error Message")).toBeTruthy();
    });
  });
});
