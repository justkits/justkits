import clsx from "clsx";

import { Pressable, type PressableProps } from "@/Pressable";
import { styles } from "./styles.css";

export interface FormButtonProps extends Omit<PressableProps, "children"> {
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  size?: "small" | "large" | "fill";
  outlined?: boolean;
  fallback?: React.ReactNode;
  loadingVariant?: "left" | "right" | "replace";
}

export function FormButton({
  children,
  iconLeft,
  iconRight,
  variant = "primary",
  size = "large",
  outlined = false,
  fallback,
  loadingVariant = "replace",
  isDisabled = false,
  isLoading = false,
  className,
  ...rest
}: Readonly<FormButtonProps>) {
  if (isLoading && fallback) {
    return (
      <Pressable
        {...rest}
        isDisabled={isDisabled}
        isLoading={isLoading}
        className={clsx(
          styles.formButton({
            variant,
            size,
            outlined,
          }),
          className,
        )}
      >
        {loadingVariant === "replace" ? (
          fallback
        ) : (
          <>
            {loadingVariant === "left" ? fallback : iconLeft}
            {children}
            {loadingVariant === "right" ? fallback : iconRight}
          </>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      {...rest}
      isDisabled={isDisabled}
      isLoading={isLoading}
      className={clsx(
        styles.formButton({
          variant,
          size,
          outlined,
        }),
        className,
      )}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Pressable>
  );
}
