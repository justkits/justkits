import { type HTMLAttributes } from "react";

import { Portal } from "@/core/portal";
import { zIndices } from "@/core/zindex";
import { ContentContext, useTooltip } from "./internals/contexts";

type TooltipContentProps = Omit<HTMLAttributes<HTMLDivElement>, "id" | "role">;

export function TooltipContent({
  children,
  className,
  style,
  ...rest
}: Readonly<TooltipContentProps>) {
  const {
    isOpen,
    tooltipId,
    containerStyles,
    floatingRef,
    isPortalMode,
    showTooltip,
    hideTooltip,
    closeDelay,
  } = useTooltip();

  if (!isOpen) return null;

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <div
          style={{
            ...containerStyles,
            zIndex: zIndices.tooltip,
            ...style,
          }}
          className={className}
          {...rest}
          id={tooltipId}
          role="tooltip"
          ref={floatingRef}
          onMouseEnter={() => showTooltip(0)}
          onMouseLeave={() => hideTooltip(closeDelay)}
        >
          {children}
        </div>
      </ContentContext.Provider>
    </Portal>
  );
}
