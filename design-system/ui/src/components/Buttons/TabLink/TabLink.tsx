import {
  TabLink as Component,
  type TabLinkProps as Props,
} from "@justkits/buttons/TabLink";
import { Text } from "@justkits/texts/Text";

import { styles } from "./styles.css";

export interface TabLinkProps extends Omit<Props, "children"> {
  label: string;
}

export function TabLink({
  label,
  isActive = false,
  ...rest
}: Readonly<TabLinkProps>) {
  return (
    <Component isActive={isActive} {...rest}>
      <Text variant="titleMedium" className={styles.label({ isActive })}>
        {label}
      </Text>
    </Component>
  );
}
