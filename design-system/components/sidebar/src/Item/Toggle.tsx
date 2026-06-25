import {
  CollapsibleToggle,
  type CollapsibleToggleProps,
} from "@justkits/headless-ui/Collapsible";
import { AppIcon } from "@justkits/icons";
import clsx from "clsx";

import { styles } from "./styles.css";

export type SidebarItemToggleProps = CollapsibleToggleProps;

/**
 * A toggle button that expands and collapses a `SidebarItem`'s children.
 *
 * Renders a chevron-right icon by default, which rotates 90° when the item
 * is open. Pass `children` to replace the default icon with a custom one.
 *
 * Must be passed to `SidebarItem` via the `icon` or `right` prop, and only
 * has an effect when the `SidebarItem` has `children`. Both slots sit above
 * the link overlay, so clicks on the toggle are not intercepted by the link.
 *
 * @example
 * // In the right slot
 * <SidebarItem
 *   href="/settings"
 *   label="Settings"
 *   right={<SidebarItemToggle />}
 * >
 *   <SidebarItem href="/settings/profile" label="Profile" />
 * </SidebarItem>
 *
 * @example
 * // In the icon slot with a custom icon
 * <SidebarItem
 *   href="/settings"
 *   label="Settings"
 *   icon={<SidebarItemToggle><MyIcon /></SidebarItemToggle>}
 * >
 *   <SidebarItem href="/settings/profile" label="Profile" />
 * </SidebarItem>
 */
export function SidebarItemToggle({
  children = <AppIcon icon="chevron-right" className={styles.toggleIcon} />,
  className,
  ...rest
}: Readonly<CollapsibleToggleProps>) {
  return (
    <CollapsibleToggle {...rest} className={clsx(styles.toggle, className)}>
      {children}
    </CollapsibleToggle>
  );
}
