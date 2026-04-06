import {
  type HTMLAttributes,
  type ReactNode,
  useId,
  useLayoutEffect,
} from "react";

import { AsChild } from "@/core/asChild";
import { useField } from "./internals/contexts";

type NormalDescriptionProps = {
  asChild?: false;
  children: string;
};

type AsChildDescriptionProps = {
  asChild: true;
  children: ReactNode;
};

type FormDescriptionProps = (NormalDescriptionProps | AsChildDescriptionProps) &
  Omit<HTMLAttributes<HTMLParagraphElement>, "id" | "children">;

export function FieldDescription({
  asChild = false,
  children,
  ...props
}: FormDescriptionProps) {
  const id = useId();
  const { setDescriptionId } = useField(
    "Field.Description must be used within the Field wrapper.",
  );

  useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  if (asChild) {
    return (
      <AsChild {...props} id={id}>
        {children}
      </AsChild>
    );
  }

  return (
    <p {...props} id={id}>
      {children}
    </p>
  );
}
