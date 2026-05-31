import {
  IconButton as Component,
  type IconButtonProps as Props,
} from "@justkits/buttons/IconButton";
import { AppIcon, type IconName } from "@justkits/icons";
import { Text } from "@justkits/texts/Text";

export interface IconButtonProps extends Omit<Props, "children"> {
  icon: IconName;
  label?: string;
}

export function IconButton({
  icon,
  label,
  size = "medium",
  ...rest
}: Readonly<IconButtonProps>) {
  const variant = () => {
    switch (size) {
      case "small":
        return "bodySmall";
      case "medium":
        return "bodyMedium";
      case "large":
        return "bodyLarge";
    }
  };

  return (
    <Component {...rest} size={size}>
      <AppIcon icon={icon} />
      {label && <Text variant={variant()}>{label}</Text>}
    </Component>
  );
}
