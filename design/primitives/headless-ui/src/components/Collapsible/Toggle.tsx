import { useContext } from "react";

import { AsChild } from "@/core/asChild";
import { CollapsibleContext } from "./_internals/contexts";

export interface CollapsibleToggleProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "disabled"
  | "children"
  | "role"
  | "onClick"
  | "aria-controls"
  | "aria-disabled"
  | "aria-expanded"
> {
  children: React.ReactNode; // 필수로 만든다
  asChild?: boolean;
  ctxErrMsg?: string; // context가 없는 경우에 대한 에러 메시지
}

export function CollapsibleToggle({
  children,
  asChild = false,
  ctxErrMsg = "Collapsible.Toggle must be used inside the Collapsible wrapper.",
  ...rest
}: Readonly<CollapsibleToggleProps>) {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const { isOpen, disabled, unmountOnHide, toggle, contentId, toggleId } =
    context;
  const ariaControls = unmountOnHide && !isOpen ? undefined : contentId;

  if (asChild) {
    return (
      <AsChild
        {...rest}
        id={toggleId}
        role="button"
        onClick={toggle}
        disabled={disabled}
        aria-controls={ariaControls}
        aria-disabled={disabled}
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      {...rest}
      id={toggleId}
      onClick={toggle}
      disabled={disabled}
      aria-controls={ariaControls}
      aria-disabled={disabled}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </button>
  );
}
