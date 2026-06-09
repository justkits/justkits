import { useContext } from "react";

import { AsChild } from "@/core/asChild";
import { CollapsibleContext } from "./_internals/contexts";

export interface CollapsibleContentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "id" | "hidden" | "aria-hidden" | "role" | "aria-labelledby"
> {
  children: React.ReactNode; // 필수로 만든다
  asChild?: boolean;
  role?: "region" | "group";
  ctxErrMsg?: string; // context가 없는 경우에 대한 에러 메시지
}

export function CollapsibleContent({
  children,
  asChild,
  role = asChild ? undefined : "group",
  ctxErrMsg = "Collapsible.Content must be used inside the Collapsible wrapper.",
  ...rest
}: Readonly<CollapsibleContentProps>) {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const { isOpen, unmountOnHide, contentId, toggleId } = context;

  if (unmountOnHide && !isOpen) {
    return null;
  }

  const Component = asChild ? AsChild : "div";

  return (
    <Component
      {...rest}
      id={contentId}
      role={role}
      hidden={!isOpen}
      aria-labelledby={role === "region" ? toggleId : undefined}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Component>
  );
}
