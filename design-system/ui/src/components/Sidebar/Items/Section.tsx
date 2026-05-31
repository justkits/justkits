import { Collapsible } from "@justkits/headless-ui/Collapsible";

import { IconButton } from "@/components/Buttons";
import { Text } from "@/components/Texts";
import { styles } from "./styles.css";

interface SidebarSectionProps {
  children: React.ReactNode;
  label: string;
}

export function SidebarSection({
  children,
  label,
}: Readonly<SidebarSectionProps>) {
  return (
    <Collapsible>
      <div className={styles.wrapper}>
        <Text variant="bodySmall" className={styles.sectionLabel}>
          {label}
        </Text>
        <Collapsible.Toggle asChild>
          <IconButton className={styles.toggle} icon="chevron-right" />
        </Collapsible.Toggle>
      </div>
      <Collapsible.Content role="group">
        <div className={styles.items}>{children}</div>
      </Collapsible.Content>
    </Collapsible>
  );
}
