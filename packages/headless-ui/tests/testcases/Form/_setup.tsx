import { Form, Field } from "@/Form";

export function TestComponent({
  onSubmit,
  disabled = false,
  inputError,
  textareaError,
  checkboxError,
}: Readonly<{
  onSubmit: () => void | Promise<void>;
  disabled?: boolean;
  inputError?: string;
  textareaError?: string;
  checkboxError?: string;
}>) {
  return (
    <Form onSubmit={onSubmit} disabled={disabled} data-testid="form">
      <Field>
        <Field.Label>Field 1</Field.Label>
        <Field.Control>
          <input name="inputField" type="text" data-testid="input-field" />
        </Field.Control>
        <Field.Description>Example Text Input</Field.Description>
        {inputError && <Field.ErrorMessage>{inputError}</Field.ErrorMessage>}
      </Field>
      <Field>
        <Field.Label>Field 2</Field.Label>
        <Field.Control>
          <textarea name="textareaField" data-testid="textarea-field" />
        </Field.Control>
        <Field.Description>Example Textarea</Field.Description>
        {textareaError && (
          <Field.ErrorMessage>{textareaError}</Field.ErrorMessage>
        )}
      </Field>
      <Field>
        <Field.Label>Field 3</Field.Label>
        <Field.Control>
          <input
            name="checkboxField"
            type="checkbox"
            data-testid="checkbox-field"
          />
        </Field.Control>
        <Field.Description>Example Checkbox</Field.Description>
        {checkboxError && (
          <Field.ErrorMessage>{checkboxError}</Field.ErrorMessage>
        )}
      </Field>
      <div tabIndex={0}>Focusable Element</div> {/* NOSONAR */}
      <Form.Submit>Submit</Form.Submit>
      {(inputError || textareaError || checkboxError) && (
        <Form.Error>
          Form has errors. Please fix them before submitting.
        </Form.Error>
      )}
    </Form>
  );
}
