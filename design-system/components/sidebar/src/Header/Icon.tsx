import { SidebarToggle } from "@/Toggle/Toggle";
import { styles } from "./styles.css";

export interface SidebarHeaderIconProps {
  children: React.ReactNode;
  /**
   * The toggle button rendered on hover. Defaults to `<SidebarToggle />`.
   * Override to pass a custom toggle with additional props (e.g. `data-testid`,
   * a keyboard shortcut label, or a fully custom trigger).
   *
   * @default <SidebarToggle />
   */
  toggle?: React.ReactNode;
}

/**
 * The default content for `SidebarHeader`'s `collapsed` slot when the sidebar
 * is in icon-collapsed mode (`collapse="icons"`).
 *
 * Renders `children` (typically a logo or brand icon) at rest, and reveals
 * a `SidebarToggle` on hover so users can expand the sidebar without cluttering
 * the icon layout permanently.
 *
 * Pass `toggle` to replace the default `<SidebarToggle />` with a custom trigger.
 *
 * @example
 * <SidebarHeader
 *   collapsed={
 *     <SidebarHeaderIcon>
 *       <AppLogo compact />
 *     </SidebarHeaderIcon>
 *   }
 * >
 *   <AppLogo />
 *   <AppName />
 * </SidebarHeader>
 */
export function SidebarHeaderIcon({
  children,
  toggle = <SidebarToggle />,
}: Readonly<SidebarHeaderIconProps>) {
  return (
    <div className={styles.swapContainer}>
      <span className={styles.collapsedIcon}>{children}</span>
      <span className={styles.toggle}>{toggle}</span>
    </div>
  );
}
