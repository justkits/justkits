import { useState } from "react";
import { CollapsibleProvider } from "@justkits/headless-ui/Collapsible";

import type { SectionLinkProviderProps } from "./properties";

export function SectionLinkProvider({
  children,
  isActive = false,
  isSubitemActive = false,
}: Readonly<SectionLinkProviderProps>) {
  const [prevIsActive, setPrevIsActive] = useState<boolean>(isActive);
  const [isOpen, setIsOpen] = useState<boolean>(isSubitemActive || isActive);

  if (prevIsActive !== isActive) {
    setPrevIsActive(isActive);
    // 닫혀있는 경우 활성화되면 열기 (이미 열려있는 경우는 굳이 닫지 않음)
    if (!isOpen && isActive) {
      setIsOpen(true);
    }
  }

  return (
    <CollapsibleProvider isOpen={isOpen} onOpenChange={setIsOpen}>
      {children}
    </CollapsibleProvider>
  );
}
