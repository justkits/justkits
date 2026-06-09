import { Link, type LinkProps } from "@justkits/headless-ui/Link";
import { AppIcon, type IconName } from "@justkits/icons";

import { Text } from "@/components/Texts";
import { styles } from "./styles.css";

export interface SidebarLinkProps extends Omit<LinkProps, "href" | "children"> {
  label: string;
  href: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  isActive?: boolean;
  indicator?: boolean;
  icon?: IconName;
}

export function SidebarLink({
  label,
  href,
  isActive = false,
  isDisabled = false,
  isExternal = false,
  indicator = false,
  icon,
  left,
  right,
  ...rest
}: Readonly<SidebarLinkProps>) {
  const showIndicator = isActive && indicator;

  return (
    <Link
      {...rest}
      className={styles.link({ active: isActive, isDisabled })}
      href={href}
      isDisabled={isDisabled}
      isExternal={isExternal}
    >
      <Left left={left} icon={icon} />
      <Text
        variant="bodySmall"
        className={styles.linkLabel({ active: isActive, isDisabled })}
      >
        {label}
      </Text>
      <Right right={right} isExternal={isExternal} />
      {showIndicator && <span className={styles.indicator} />}
    </Link>
  );
}

function Left({
  left,
  icon,
}: Readonly<Pick<SidebarLinkProps, "left" | "icon">>) {
  if (left) return left;

  if (icon) {
    return <AppIcon icon={icon} />;
  }

  return null;
}

function Right({
  right,
  isExternal,
}: Readonly<Pick<SidebarLinkProps, "right" | "isExternal">>) {
  if (right) return right;

  if (isExternal) {
    return <AppIcon icon="external-link" />;
  }

  return null;
}
