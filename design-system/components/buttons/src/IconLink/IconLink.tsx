import { Tooltip } from "@justkits/headless-ui/Tooltip";
import clsx from "clsx";

import { Link, type LinkProps } from "@/Link";
import { styles } from "../styles.css";

export interface IconLinkProps extends Omit<LinkProps, "children"> {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
  rounded?: boolean;
  ghost?: boolean;
  size?: "small" | "medium" | "large";
}

export function IconLink({ tooltip, ...linkProps }: Readonly<IconLinkProps>) {
  if (tooltip) {
    return (
      <Tooltip portal>
        <Tooltip.Trigger asChild>
          <Component {...linkProps} />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Message>{tooltip}</Tooltip.Message>
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip>
    );
  }

  return <Component {...linkProps} />;
}

function Component({
  children,
  rounded = false,
  ghost = false,
  size = "medium",
  className,
  ...rest
}: Readonly<Omit<IconLinkProps, "tooltip">>) {
  return (
    <Link
      {...rest}
      className={clsx(styles.iconButton({ rounded, ghost, size }), className)}
    >
      {children}
    </Link>
  );
}
