import { useContext, useEffect } from "react";

import { Button, type ButtonProps } from "@/components/Button";
import { ContentContext, PopoverContext } from "./_internals/contexts";

export interface PopoverCloseProps extends Omit<
  ButtonProps,
  "onClick" | "children"
> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  ctxErrMsg?: string;
}

export function PopoverClose({
  children,
  asChild = false,
  ctxErrMsg = "Popover.Close must be used inside the Popover wrapper.",
  onClick,
  isDisabled,
  ...rest
}: Readonly<PopoverCloseProps>) {
  const context = useContext(PopoverContext);
  const isInsideContent = useContext(ContentContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  if (!isInsideContent) {
    throw new Error("Popover.Close must be used inside Popover.Content.");
  }

  const { hidePopover, isPending, setPending } = context;

  useEffect(() => {
    return () => setPending(false);
  }, [setPending]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = onClick?.(e);

    if (typeof result?.then !== "function") {
      hidePopover();
      return;
    }

    setPending(true);

    try {
      await result;
      hidePopover();
    } catch {
      // rejected promise — popover stays open, pending cleared in finally
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      {...rest}
      asChild={asChild}
      isDisabled={isPending || isDisabled}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
