import { SidebarToggle as HeadlessToggle } from "@justkits/headless-ui/Sidebar";

import { IconButton, type IconButtonProps } from "@/components/Buttons";

interface SidebarToggleProps extends Omit<IconButtonProps, "icon"> {
  icon?: IconButtonProps["icon"];
}

export function SidebarToggle({
  icon = "sidebar-arrow",
}: Readonly<SidebarToggleProps>) {
  return (
    <HeadlessToggle asChild>
      <IconButton icon={icon} />
    </HeadlessToggle>
  );
}
