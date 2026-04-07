import { render } from "@testing-library/react";

import { Field } from "@/Field";

describe("Field", () => {
  it("handles all aria attributes in normal state correctly", () => {
    const { getByTestId, queryByTestId } = render(
      <Field>
        <Field.Label data-testid="label">Label</Field.Label>
        <Field.Control>
          <input name="inputField" type="text" data-testid="input-field" />
        </Field.Control>
        <Field.Description data-testid="description">
          Description
        </Field.Description>
      </Field>,
    );

    const input = getByTestId("input-field") as HTMLInputElement;
    const label = getByTestId("label") as HTMLLabelElement;
    const description = getByTestId("description");

    // Control 요소 테스트
    expect(input.disabled).toBe(false);
    expect(input.required).toBe(false);
    expect(input.getAttribute("aria-invalid")).toBe(null);
    expect(input.getAttribute("aria-describedby")).toContain(description.id);

    // Label 요소 테스트
    expect(label.htmlFor).toBe(input.id);

    // Error Message 요소가 없는지 테스트
    expect(queryByTestId("error-message")).toBeNull();
  });

  it("handles all aria attributes in error state correctly", () => {
    const { getByTestId } = render(
      <Field>
        <Field.Label data-testid="label">Label</Field.Label>
        <Field.Control>
          <input name="inputField" type="text" data-testid="input-field" />
        </Field.Control>
        <Field.Description data-testid="description">
          Description
        </Field.Description>
        <Field.ErrorMessage data-testid="error-message">
          Error message
        </Field.ErrorMessage>
      </Field>,
    );

    const input = getByTestId("input-field") as HTMLInputElement;
    const errorMessage = getByTestId("error-message");

    // Control 요소 테스트
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toContain(errorMessage.id);
  });

  it("handles all aria attributes in disabled state correctly", () => {
    const { getByTestId } = render(
      <Field disabled>
        <Field.Label data-testid="label">Label</Field.Label>
        <Field.Control>
          <input name="inputField" type="text" data-testid="input-field" />
        </Field.Control>
        <Field.Description data-testid="description">
          Description
        </Field.Description>
      </Field>,
    );

    const input = getByTestId("input-field") as HTMLInputElement;

    // Control 요소 테스트
    expect(input.disabled).toBe(true);
  });

  it("handles all aria attributes in required state correctly", () => {
    const { getByTestId } = render(
      <Field required>
        <Field.Label data-testid="label">Label</Field.Label>
        <Field.Control>
          <input name="inputField" type="text" data-testid="input-field" />
        </Field.Control>
        <Field.Description data-testid="description">
          Description
        </Field.Description>
      </Field>,
    );

    const input = getByTestId("input-field") as HTMLInputElement;

    // Control 요소 테스트
    expect(input.required).toBe(true);
  });
});
