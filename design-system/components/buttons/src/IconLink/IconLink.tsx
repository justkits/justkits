import { Tooltip } from "@justkits/headless-ui/Tooltip";
import clsx from "clsx";

import { Link, type LinkProps } from "@/Link";
import { styles } from "../styles.css";

export interface IconLinkProps extends Omit<LinkProps, "children"> {
  icon: React.ReactNode;
  label?: React.ReactNode;
  rounded?: boolean;
  ghost?: boolean;
  size?: "small" | "medium" | "large";
}

export function IconLink({ label, ...linkProps }: IconLinkProps) {
  if (label) {
    return (
      <Tooltip portal>
        <Tooltip.Trigger asChild>
          <Component {...linkProps} />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Message>{label}</Tooltip.Message>
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip>
    );
  }

  return <Component {...linkProps} />;
}

function Component({
  icon,
  rounded = false,
  ghost = false,
  size = "medium",
  className,
  ...rest
}: Omit<IconLinkProps, "tooltip">) {
  return (
    <Link
      {...rest}
      className={clsx(styles.iconButton({ rounded, ghost, size }), className)}
    >
      {icon}
    </Link>
  );
}
