import { render } from "@testing-library/react";

import { Form, Field } from "@/Form";

describe("Form - structure", () => {
  describe("Form.Submit", () => {
    it("must be used within the Form wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() => render(<Form.Submit>Submit</Form.Submit>)).toThrow(
        "Form components must be used within the Form wrapper.",
      );
    });
  });

  describe("Form.Error", () => {
    it("must be used within the Form wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() => render(<Form.Error>Error</Form.Error>)).toThrow(
        "Form components must be used within the Form wrapper.",
      );
    });
  });

  describe("Field", () => {
    it("must be used within the Form wrapper", () => {
      expect(() => render(<Field>Field</Field>)).toThrow(
        "Form components must be used within the Form wrapper.",
      );
    });
  });

  describe("Field.Control", () => {
    it("must be used within the Field wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() =>
        render(
          <Form onSubmit={() => {}}>
            <Field.Control>
              <input />
            </Field.Control>
          </Form>,
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
  });

  describe("Field.Description", () => {
    it("must be used within the Field wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() =>
        render(<Field.Description>Description</Field.Description>),
      ).toThrow("Field.Description must be used within the Field wrapper.");
    });
  });

  describe("Field.ErrorMessage", () => {
    it("must be used within the Field wrapper", () => {
      // 그렇지 않으면 오류가 발생해야 한다.
      expect(() =>
        render(<Field.ErrorMessage>Error Message</Field.ErrorMessage>),
      ).toThrow("Field.ErrorMessage must be used within the Field wrapper.");
    });
  });
});
