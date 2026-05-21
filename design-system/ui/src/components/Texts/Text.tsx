import clsx from "clsx";

import { styles } from "./styles.css";

type TagOptions = Pick<
  React.JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
>;

export type TextVariants =
  | "hero"
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "description";

const tagMap: Record<TextVariants, keyof TagOptions> = {
  hero: "h1",
  titleLarge: "h2",
  titleMedium: "h3",
  titleSmall: "h4",
  bodyLarge: "p",
  bodyMedium: "p",
  bodySmall: "p",
  description: "p",
};

export interface TextProps<T extends TextVariants> {
  variant: T;
  children: string;
  as?: keyof TagOptions;
  className?: string;
  style?: React.CSSProperties;
}

export function Text<T extends TextVariants>({
  variant,
  as,
  children,
  className,
  ...rest
}: Readonly<TextProps<T>>) {
  const Component = as || tagMap[variant];

  return (
    <Component {...rest} className={clsx(styles.text({ variant }), className)}>
      {children}
    </Component>
  );
}
