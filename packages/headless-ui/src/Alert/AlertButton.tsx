import { type HTMLAttributes, type MouseEvent, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { useAlert } from "./internals/context";
import { ContentContext } from "./internals/registries";

type AlertButtonProps = {
  asChild?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
} & Omit<HTMLAttributes<HTMLButtonElement>, "onClick">;

export function AlertButton({
  children,
  className,
  style,
  onClick,
  asChild = false,
  ...rest
}: Readonly<AlertButtonProps>) {
  const { closeAlert, isPending, setPending } = useAlert();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Alert.Button must be used within Alert.Content");
  }

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    setPending(true);
    try {
      await onClick?.(e);
      setPending(false);
      closeAlert();
    } catch {
      // onClick rejected: dialog stays open, developer handles the error
      setPending(false);
    }
  };

  if (asChild) {
    return (
      <AsChild
        className={className}
        style={style}
        onClick={handleClick}
        disabled={isPending}
        {...rest}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      data-testid="alert-non-as-child-button"
      type="button"
      className={className}
      style={style}
      onClick={handleClick}
      disabled={isPending}
      {...rest}
    >
      {children}
    </button>
  );
}
