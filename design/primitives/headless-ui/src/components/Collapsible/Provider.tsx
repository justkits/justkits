import { useCallback, useId, useMemo } from "react";

import { useOpenState } from "@/core/disclosure";
import { CollapsibleContext } from "./_internals/contexts";

export interface CollapsibleProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  isDisabled?: boolean;
  unmountOnHide?: boolean;
}

export function CollapsibleProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  isDisabled = false,
  unmountOnHide = false,
}: Readonly<CollapsibleProps>) {
  const { isOpen, show, hide } = useOpenState(
    controlledOpen,
    onOpenChange,
    defaultOpen,
  );
  const contentId = useId();
  const toggleId = useId();

  const toggle = useCallback(() => {
    if (isOpen) {
      hide();
    } else {
      show();
    }
  }, [isOpen, show, hide]);

  const contextValue = useMemo(
    () => ({
      isOpen: isDisabled ? false : isOpen,
      isDisabled,
      unmountOnHide,
      toggle,
      contentId,
      toggleId,
    }),
    [isOpen, isDisabled, unmountOnHide, toggle, contentId, toggleId],
  );

  return (
    <CollapsibleContext.Provider value={contextValue}>
      {children}
    </CollapsibleContext.Provider>
  );
}
