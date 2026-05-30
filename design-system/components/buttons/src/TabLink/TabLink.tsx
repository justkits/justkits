import clsx from "clsx";

import { Link, type LinkProps } from "@/Link";
import { styles } from "./styles.css";

export interface TabLinkProps extends Omit<LinkProps, "href" | "children"> {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
}

export function TabLink({
  children,
  href,
  isActive = false,
  className,
  ...rest
}: Readonly<TabLinkProps>) {
  return (
    <div className={styles.tab({ isActive })}>
      <Link
        {...rest}
        href={href}
        className={clsx(styles.link({ isActive }), className)}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Link>
    </div>
  );
}
