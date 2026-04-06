import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TestComponent } from "./_setup";

describe("Form - interactions", () => {
  it("calls onSubmit when the form is submitted (Submit click)", () => {
    const onSubmit = vi.fn();
    const { getByTestId, getByText } = render(
      <TestComponent onSubmit={onSubmit} />,
    );

    // 폼은 간단하게 채운다.
    fireEvent.change(getByTestId("input-field"), { target: { value: "Test" } });
    fireEvent.change(getByTestId("textarea-field"), {
      target: { value: "Test" },
    });
    fireEvent.click(getByTestId("checkbox-field"));

    fireEvent.click(getByText("Submit"));

    const expectedFormData = new FormData();
    expectedFormData.append("inputField", "Test");
    expectedFormData.append("textareaField", "Test");
    expectedFormData.append("checkboxField", "on");

    expect(onSubmit).toHaveBeenCalledWith(expectedFormData);
  });

  it("calls onSubmit when the form is submitted (Enter key)", () => {
    const onSubmit = vi.fn();
    const { getByTestId, getByText } = render(
      <TestComponent onSubmit={onSubmit} />,
    );

    // 폼은 간단하게 채운다.
    fireEvent.change(getByTestId("input-field"), { target: { value: "Test" } });
    fireEvent.change(getByTestId("textarea-field"), {
      target: { value: "Test" },
    });
    fireEvent.click(getByTestId("checkbox-field"));

    // 다른 키에는 onSubmit이 호출되지 않아야 한다.
    fireEvent.keyDown(getByTestId("form"), { key: "a", code: "KeyA" });
    expect(onSubmit).not.toHaveBeenCalled();

    // textarea에서는 엔터 키로 줄바꿈이 되어야 하므로, textarea에 포커스가 있을 때 엔터 키를 눌러도 onSubmit이 호출되지 않아야 한다.
    fireEvent.keyDown(getByTestId("textarea-field"), {
      key: "Enter",
      code: "Enter",
    });
    expect(onSubmit).not.toHaveBeenCalled();

    // 체크박스에 포커스가 있을 때 엔터 키를 눌러도 onSubmit이 호출되지 않아야 한다.
    fireEvent.keyDown(getByTestId("checkbox-field"), {
      key: "Enter",
      code: "Enter",
    });
    expect(onSubmit).not.toHaveBeenCalled();

    // 폼 내에서 엔터 키를 눌렀을 때 onSubmit이 호출되어야 한다.
    fireEvent.keyDown(getByText("Focusable Element"), {
      key: "Enter",
      code: "Enter",
    });

    const expectedFormData = new FormData();
    expectedFormData.append("inputField", "Test");
    expectedFormData.append("textareaField", "Test");
    expectedFormData.append("checkboxField", "on");

    expect(onSubmit).toHaveBeenCalledWith(expectedFormData);
  });

  it("displays error messages when there are errors", () => {
    const { getByText } = render(
      <TestComponent
        onSubmit={() => {}}
        inputError="Input error"
        textareaError="Textarea error"
        checkboxError="Checkbox error"
      />,
    );

    expect(getByText("Input error")).toBeTruthy();
    expect(getByText("Textarea error")).toBeTruthy();
    expect(getByText("Checkbox error")).toBeTruthy();

    expect(
      getByText("Form has errors. Please fix them before submitting."),
    ).toBeTruthy();
  });

  it("handles form submission with promise correctly", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const { getByText } = render(<TestComponent onSubmit={onSubmit} />);

    fireEvent.click(getByText("Submit"));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it("handles form submission with rejected promise correctly", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("Submission failed"));
    const { getByText } = render(<TestComponent onSubmit={onSubmit} />);

    fireEvent.click(getByText("Submit"));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it("does not change fields and submit if the form is disabled", () => {
    const onSubmit = vi.fn();
    const { getByTestId, getByText } = render(
      <TestComponent onSubmit={onSubmit} disabled />,
    );

    userEvent.type(getByTestId("input-field"), "Test");
    userEvent.type(getByTestId("textarea-field"), "Test");
    userEvent.click(getByTestId("checkbox-field"));

    fireEvent.click(getByText("Submit"));

    expect(onSubmit).not.toHaveBeenCalled();
    expect((getByTestId("input-field") as HTMLInputElement).value).toBe("");
    expect((getByTestId("textarea-field") as HTMLTextAreaElement).value).toBe(
      "",
    );
    expect((getByTestId("checkbox-field") as HTMLInputElement).checked).toBe(
      false,
    );

    // 엔터 키로 disabled 상태에서 제출을 시도해도 onSubmit이 호출되지 않아야 한다.
    fireEvent.keyDown(getByTestId("form"), { key: "Enter", code: "Enter" });
    expect(onSubmit).not.toHaveBeenCalled();

    // 테스트 환경에서 억지로 submit 이벤트를 발생시켜도 onSubmit이 호출되지 않아야 한다.
    fireEvent.submit(getByTestId("form"));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
