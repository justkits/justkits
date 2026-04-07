import { Form } from "@/Form";

export function TestComponent({
  onSubmit,
  disabled = false,
  errorMsg,
}: Readonly<{
  onSubmit: () => void | Promise<void>;
  disabled?: boolean;
  errorMsg?: string;
}>) {
  return (
    <Form onSubmit={onSubmit} disabled={disabled} data-testid="form">
      <input name="inputField" type="text" data-testid="input-field" />
      <textarea name="textareaField" data-testid="textarea-field" />
      <input
        name="checkboxField"
        type="checkbox"
        data-testid="checkbox-field"
      />
      <div tabIndex={0}>Focusable Element</div> {/* NOSONAR */}
      <Form.Submit>Submit</Form.Submit>
      {errorMsg && <Form.ErrorMessage>{errorMsg}</Form.ErrorMessage>}
    </Form>
  );
}
