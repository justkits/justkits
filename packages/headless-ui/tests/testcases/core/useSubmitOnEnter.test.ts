import { fireEvent, renderHook } from "@testing-library/react";

import { useSubmitOnEnter } from "@/core/keyboard/useSubmitOnEnter";

describe("useSubmitOnEnter - cornercases", () => {
  let form: HTMLFormElement;
  let requestSubmitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    form = document.createElement("form");
    document.body.appendChild(form);
    requestSubmitSpy = vi
      .spyOn(form, "requestSubmit")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    form.remove();
    vi.restoreAllMocks();
  });

  it("does not call anything if ref is null", () => {
    renderHook(() => useSubmitOnEnter({ current: null }));

    fireEvent.keyDown(document, { key: "Enter", bubbles: true });

    expect(requestSubmitSpy).not.toHaveBeenCalled();
  });
});
