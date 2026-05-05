import { AsChild } from "@/core/asChild";

export interface LinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "aria-disabled" | "aria-current"
> {
  asChild?: boolean;
  disabled?: boolean;
  active?: boolean;
  newtab?: boolean;
}

export function Link({
  children,
  href,
  onClick: _onClick,
  newtab,
  active = false,
  disabled = false,
  asChild = false,
  ...rest
}: Readonly<LinkProps>) {
  const isExternal =
    href?.startsWith("http://") || href?.startsWith("https://");
  const isNewTab = newtab || (isExternal && newtab !== false);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    _onClick?.(event);
  };

  if (asChild) {
    return (
      <AsChild
        {...rest}
        href={href}
        onClick={onClick}
        disabled={disabled}
        target={isNewTab ? "_blank" : undefined}
        rel={isNewTab ? "noopener noreferrer" : undefined}
        aria-disabled={disabled || undefined}
        aria-current={active ? "page" : undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <a
      {...rest}
      href={href}
      onClick={onClick}
      target={isNewTab ? "_blank" : undefined}
      rel={isNewTab ? "noopener noreferrer" : undefined}
      aria-disabled={disabled || undefined}
      aria-current={active ? "page" : undefined}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </a>
  );
}
