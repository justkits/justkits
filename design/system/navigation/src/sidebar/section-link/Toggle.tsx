import {
  CollapsibleToggle,
  type CollapsibleToggleProps,
} from "@justkits/headless-ui/Collapsible";

export function SectionLinkToggle({
  children,
  ...rest
}: Readonly<CollapsibleToggleProps>) {
  return (
    <CollapsibleToggle
      {...rest}
      ctxErrMsg="SectionLinkToggle must be used inside SectionLinkProvider."
    >
      {children}
    </CollapsibleToggle>
  );
}
