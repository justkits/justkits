import { useContext } from "react";

import { Button, type ButtonProps } from "@/components/Button";
import { PopoverContext } from "./_internals/contexts";

export interface PopoverTriggerProps extends Omit<
  ButtonProps,
  "onClick" | "aria-controls" | "aria-haspopup" | "aria-expanded" | "children"
> {
  children: React.ReactNode;
  ctxErrMsg?: string;
}

export function PopoverTrigger({
  children,
  asChild = false,
  ctxErrMsg = "Popover.Trigger must be used inside the Popover wrapper.",
  ...rest
}: Readonly<PopoverTriggerProps>) {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const { isOpen, togglePopover, unmountOnHide, contentId, triggerRef } =
    context;
  const ariaControls = unmountOnHide && !isOpen ? undefined : contentId;

  return (
    <Button
      {...rest}
      ref={triggerRef}
      asChild={asChild}
      onClick={togglePopover}
      aria-controls={ariaControls}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
    >
      {children}
    </Button>
  );
}
