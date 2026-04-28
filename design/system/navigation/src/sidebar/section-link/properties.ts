export type SectionLinkProviderProps = {
  children: React.ReactNode;
  isActive?: boolean;
  isSubitemActive?: boolean;
};

export type SectionLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "tabIndex"
> &
  SectionLinkProviderProps & {
    label: React.ReactNode;
    href: string;
    as?: React.ElementType;
    linkClassName?: string;
    linkStyle?: React.CSSProperties;
    toggleClassName?: string;
    toggleStyle?: React.CSSProperties;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
  } & (
    | {
        toggleSide: "none";
        toggle?: never;
        left?: React.ReactNode;
        right?: React.ReactNode;
      }
    | {
        toggleSide: "left";
        toggle: React.ReactNode;
        left?: never;
        right?: React.ReactNode;
      }
    | {
        toggleSide: "right";
        toggle: React.ReactNode;
        left?: React.ReactNode;
        right?: never;
      }
  );
