import { styles } from "./styles.css";

export interface SidebarItemRightProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * When `true`, the content is hidden by default and fades in when the
   * sidebar item is hovered or focused.
   *
   * @default false
   */
  showOnHover?: boolean;
}

/**
 * A wrapper for content placed in the `right` slot of a `SidebarItem`.
 *
 * Handles positioning above the link overlay and optionally hides the content
 * until the item is hovered or focused via `showRight="hover"`. Useful for
 * action buttons or badges that should only appear on interaction.
 *
 * Must be passed to `SidebarItem` via the `right` prop.
 *
 * @example
 * // Always visible badge
 * <SidebarItem
 *   href="/inbox"
 *   label="Inbox"
 *   right={<SidebarItemRight><Badge>4</Badge></SidebarItemRight>}
 * />
 *
 * @example
 * // Action button that appears on hover
 * <SidebarItem
 *   href="/inbox"
 *   label="Inbox"
 *   right={
 *     <SidebarItemRight showOnHover>
 *       <IconButton icon="plus" />
 *     </SidebarItemRight>
 *   }
 * />
 */
export function SidebarItemRight({
  children,
  showOnHover = false,
  ...rest
}: Readonly<SidebarItemRightProps>) {
  return (
    <div {...rest} className={styles.rightSlot({ showOnHover })}>
      {children}
    </div>
  );
}
