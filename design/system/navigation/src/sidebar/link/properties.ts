export type LinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "tabIndex"
> & {
  children: React.ReactNode;
  href: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  isActive?: boolean;
  as?: React.ElementType;
  indicator?: boolean;
};
