import { type ButtonHTMLAttributes } from "react";

import { AsChild } from "@/core/asChild";
import { useForm } from "./internals/contexts";

type FormSubmitProps = {
  asChild?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled">;

export function FormSubmit({
  asChild = false,
  children,
  ...props
}: FormSubmitProps) {
  const { disabled } = useForm();

  if (asChild) {
    return (
      <AsChild {...props} type="submit" disabled={disabled}>
        {children}
      </AsChild>
    );
  }

  return (
    <button {...props} type="submit" disabled={disabled}>
      {children}
    </button>
  );
}
