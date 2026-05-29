import clsx from "clsx";

import { Link, type LinkProps } from "@/Link";
import { styles } from "../styles.css";

export interface TextLinkProps extends Omit<LinkProps, "children"> {
  children: React.ReactNode;
}

export function TextLink({
  children,
  className,
  ...rest
}: Readonly<TextLinkProps>) {
  return (
    <Link {...rest} className={clsx(styles.linkButton, className)}>
      {children}
    </Link>
  );
}
