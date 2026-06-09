import { useContext } from "react";

import { Button, type ButtonProps } from "@/components/Button";
import { CollapsibleContext } from "./_internals/contexts";

export interface CollapsibleToggleProps extends Omit<
  ButtonProps,
  "isDisabled" | "onClick" | "aria-controls" | "aria-expanded"
> {
  ctxErrMsg?: string;
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

  const { isOpen, isDisabled, unmountOnHide, toggle, contentId, toggleId } =
    context;
  const ariaControls = unmountOnHide && !isOpen ? undefined : contentId;

  return (
    <Button
      {...rest}
      id={toggleId}
      asChild={asChild}
      isDisabled={isDisabled}
      onClick={toggle}
      aria-controls={ariaControls}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
