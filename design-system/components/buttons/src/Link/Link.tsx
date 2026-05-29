import {
  Link as HeadlessLink,
  type LinkProps,
} from "@justkits/headless-ui/Link";
import clsx from "clsx";

import { styles } from "./styles.css";

export function Link({ children, className, ...rest }: Readonly<LinkProps>) {
  return (
    <HeadlessLink {...rest} className={clsx(styles.link, className)}>
      {children}
    </HeadlessLink>
  );
}
