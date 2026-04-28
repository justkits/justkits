import {
  CollapsibleContent,
  type CollapsibleContentProps,
} from "@justkits/headless-ui/Collapsible";

export function SectionLinkContent({
  children,
  ...rest
}: Readonly<CollapsibleContentProps>) {
  return (
    <CollapsibleContent
      {...rest}
      role="group"
      ctxErrMsg="SectionLinkContent must be used inside SectionLinkProvider."
    >
      {children}
    </CollapsibleContent>
  );
}
