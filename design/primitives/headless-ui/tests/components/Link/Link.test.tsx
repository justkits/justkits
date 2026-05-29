import { fireEvent, render } from "@testing-library/react";

import { Link } from "@/components/Link";

describe("Link", () => {
  beforeAll(() => {
    // Not Implemented: navigation to another Document 경고 무시
    globalThis.window.addEventListener("click", (e) => e.preventDefault());
  });

  it("renders an anchor element with the correct href", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    const { getByText } = render(
      <Link href="/test" onClick={onClick} onKeyDown={onKeyDown}>
        Test Link
      </Link>,
    );

    const link = getByText("Test Link");
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("/test");

    // 클릭 이벤트가 발생해야 한다.
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalled();

    // 키다운 이벤트가 발생해야 한다.
    fireEvent.keyDown(link, { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it("handles disabled state correctly", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    const { getByText } = render(
      <Link href="/test" isDisabled onClick={onClick} onKeyDown={onKeyDown}>
        Disabled Link
      </Link>,
    );

    const link = getByText("Disabled Link");
    expect(link).toBeTruthy();
    expect(link.getAttribute("aria-disabled")).toBe("true");

    // 클릭 이벤트가 발생하지 않아야 한다.
    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();

    // Enter/Space 키다운 이벤트가 발생하지 않아야 한다.
    fireEvent.keyDown(link, { key: "Enter" });
    fireEvent.keyDown(link, { key: " " });
    expect(onKeyDown).not.toHaveBeenCalled();

    // 다른 키는 전달되어야 한다.
    fireEvent.keyDown(link, { key: "Tab" });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  describe("external behavior", () => {
    it("opens in a new tab when isExternal is true", () => {
      const { getByText } = render(
        <Link href="https://example.com" isExternal>
          External Link
        </Link>,
      );

      const link = getByText("External Link");
      expect(link).toBeTruthy();
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("opens in a new tab for external links even when isExternal prop is not set", () => {
      const { getByText } = render(
        <Link href="https://example.com">External Link</Link>,
      );

      const link = getByText("External Link");
      expect(link).toBeTruthy();
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("does not open in a new tab when isExternal is false even for external links", () => {
      const { getByText } = render(
        <Link href="https://example.com" isExternal={false}>
          External Link
        </Link>,
      );

      const link = getByText("External Link");
      expect(link).toBeTruthy();
      expect(link.getAttribute("target")).toBeNull();
      expect(link.getAttribute("rel")).toBeNull();
    });
  });

  it("handles as prop correctly", () => {
    const { getByText } = render(
      <Link
        href="/test"
        as="button"
        className="link-class"
        style={{ color: "blue" }}
      >
        Button Link
      </Link>,
    );

    const button = getByText("Button Link");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("href")).toBe("/test");
  });

  it("handles as prop with newtab and disabled correctly", () => {
    const { getByText } = render(
      <Link href="/test" as="button" isExternal isDisabled>
        Button Link
      </Link>,
    );

    const button = getByText("Button Link");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("href")).toBe(null); // disabled 상태에서는 href가 제거되어야 한다.
    expect(button.getAttribute("target")).toBe("_blank");
    expect(button.getAttribute("rel")).toBe("noopener noreferrer");
    expect(button.getAttribute("aria-disabled")).toBe("true");
  });
});
