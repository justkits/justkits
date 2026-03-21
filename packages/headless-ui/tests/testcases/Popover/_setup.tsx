import { ReactNode, useState } from "react";

import { Popover } from "@/Popover";

export function TestComponent({
  children,
  arrow = false,
}: Readonly<{
  children?: ReactNode;
  arrow?: boolean;
}>) {
  return (
    <>
      <Popover>
        <Popover.Trigger data-testid="popover-trigger">트리거</Popover.Trigger>
        <Popover.Content data-testid="popover-content">
          {children}
          {arrow && <Popover.Arrow data-testid="popover-arrow" />}
        </Popover.Content>
      </Popover>
      <button data-testid="outside-button">외부 버튼</button>
    </>
  );
}

export function ControlledComponent() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Popover isOpen={open} onOpenChange={setOpen}>
        <Popover.Trigger data-testid="popover-trigger">트리거</Popover.Trigger>
        <Popover.Content data-testid="popover-content">
          팝오버 메시지
        </Popover.Content>
      </Popover>
      <button
        data-testid="toggle-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        토글 팝오버
      </button>
    </>
  );
}
