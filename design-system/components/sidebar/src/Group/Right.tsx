import clsx from "clsx";

import { styles } from "./styles.css";

export interface SidebarGroupRightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * When `true`, the content is hidden by default and fades in when the
   * group header is hovered or focused.
   *
   * @default false
   */
  showOnHover?: boolean;
}

/**
 * A wrapper for content placed in `SidebarGroup`'s `right` slot.
 *
 * Lifts its children above the toggle overlay so interactive elements
 * (buttons, badges) receive clicks correctly. Pass `showOnHover` to
 * reveal the content only when the group header is hovered or focused.
 *
 * @example
 * // Always visible
 * <SidebarGroup label="Projects" right={<SidebarGroupRight><Badge>3</Badge></SidebarGroupRight>} />
 *
 * @example
 * // Reveal on hover
 * <SidebarGroup label="Projects" right={<SidebarGroupRight showOnHover><IconButton icon="plus" /></SidebarGroupRight>} />
 */
export function SidebarGroupRight({
  children,
  showOnHover = false,
  className,
  ...rest
}: Readonly<SidebarGroupRightProps>) {
  return (
    <div
      {...rest}
      className={clsx(styles.headerRight({ showOnHover }), className)}
    >
      {children}
    </div>
  );
}
