import { type RefObject, useEffect } from "react";

const NATIVE_SUBMITTABLE = new Set(["INPUT", "SELECT", "BUTTON"]);

/**
 * form 요소 내에서 Enter 키가 눌렸을 때 폼을 제출하는 훅.
 *  - textarea, contenteditable, 기본 제출 동작이 있는 요소는 무시한다.
 * @param ref - 대상 form 요소의 Ref
 */
export function useSubmitOnEnter(ref: RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const form = ref.current;
    if (!form) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const target = e.target as HTMLElement;
      if (target.tagName === "TEXTAREA" || target.isContentEditable) return;
      if (NATIVE_SUBMITTABLE.has(target.tagName)) return;
      form.requestSubmit();
    };

    form.addEventListener("keydown", onKeyDown);
    return () => form.removeEventListener("keydown", onKeyDown);
  }, [ref]);
}
