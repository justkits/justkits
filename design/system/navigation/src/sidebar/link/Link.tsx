import clsx from "clsx";

import type { LinkProps } from "./properties";
import { styles } from "./styles.css";

export function Link({
  href,
  children,
  left,
  right,
  isActive,
  as: LinkComponent = "a",
  className,
  ...props
}: Readonly<LinkProps>) {
  // left나 right에 toggle 등 버튼이 들어올 수 있기 때문에, div로 감싸서 스타일링
  // 링크에 적용할 props와 div에 적용할 props 분리
  const { style, ...linkProps } = props;

  return (
    <div
      className={clsx(styles.wrapper, className)}
      style={style}
      data-active={isActive}
    >
      <LinkComponent {...linkProps} href={href} className={styles.link} />
      {left}
      {children}
      {right}
    </div>
  );
}
