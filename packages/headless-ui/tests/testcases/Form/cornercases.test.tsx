import { render } from "@testing-library/react";

import { Form, Field } from "@/Form";

describe("Form - corner cases", () => {
  it("handles asChild rendering correctly (all available components)", () => {
    render(
      <Form onSubmit={() => {}}>
        <Field>
          <Field.Label asChild>
            <p>Field 1</p>
          </Field.Label>
          <Field.Control>
            <input type="text" />
          </Field.Control>
          <Field.Description asChild>
            <span>Example Text Input</span>
          </Field.Description>
          <Field.ErrorMessage asChild>
            <p>Input error</p>
          </Field.ErrorMessage>
        </Field>
        <Form.Submit asChild>
          <button type="submit">Submit</button>
        </Form.Submit>
        <Form.Error asChild>
          <p>Form error</p>
        </Form.Error>
      </Form>,
    );
  });
});
