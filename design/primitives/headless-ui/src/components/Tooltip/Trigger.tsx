import { useContext } from "react";

import { Button, type ButtonProps } from "@/components/Button";
import { TooltipContext } from "./_internals/contexts";

export interface TooltipTriggerProps extends Omit<
  ButtonProps,
  | "isDisabled"
  | "children"
  | "aria-describedby"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
  | "onTouchStart"
  | "onTouchEnd"
  | "onTouchMove"
  | "onTouchCancel"
> {
  children: React.ReactNode;
  ctxErrMsg?: string;
}

export function TooltipTrigger({
  children,
  asChild = false,
  ctxErrMsg = "Tooltip.Trigger must be used inside the Tooltip wrapper.",
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const {
    disabled,
    showTooltip,
    showTooltipWithDelay,
    hideTooltip,
    hideTooltipWithDelay,
    tooltipId,
    triggerRef,
  } = context;

  return (
    <Button
      {...rest}
      ref={triggerRef}
      asChild={asChild}
      isDisabled={disabled}
      aria-describedby={disabled ? undefined : tooltipId}
      onMouseEnter={showTooltipWithDelay}
      onMouseLeave={hideTooltipWithDelay}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
    </Button>
  );
}
