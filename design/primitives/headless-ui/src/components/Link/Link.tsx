export interface LinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "aria-disabled" | "aria-current"
> {
  as?: React.ElementType;
  isDisabled?: boolean;
  isExternal?: boolean;
}

export function Link({
  children,
  href,
  onClick,
  onKeyDown,
  isExternal,
  isDisabled = false,
  as: Component = "a",
  ...rest
}: Readonly<LinkProps>) {
  const hrefExternal =
    !!href && (href.includes("://") || href.startsWith("//"));
  const newTab = isExternal ?? hrefExternal;

  const doNothingOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => e.preventDefault();

  const doNothingOnKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    } else {
      onKeyDown?.(e);
    }
  };

  return (
    <Component
      {...rest}
      href={isDisabled ? undefined : href}
      onClick={isDisabled ? doNothingOnClick : onClick}
      onKeyDown={isDisabled ? doNothingOnKeyDown : onKeyDown}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : undefined}
    >
      {children}
    </Component>
  );
}
