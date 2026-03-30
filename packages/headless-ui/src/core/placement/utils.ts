import { type CSSProperties } from "react";

import { type FloatingPlacement } from "./types";

export function arrowStyle(
  placement: FloatingPlacement,
  shiftX: number,
  shiftY: number,
): CSSProperties {
  const isVertical = placement === "top" || placement === "bottom";
  const isStart = placement === "top" || placement === "left";
  if (isVertical) {
    return {
      [isStart ? "bottom" : "top"]: 0,
      left: "50%",
      [isStart ? "marginBottom" : "marginTop"]: -4,
      clipPath: isStart
        ? "polygon(0% 100%, 100% 0%, 100% 100%)"
        : "polygon(0% 0%, 100% 0%, 0% 100%)",
      transform: `translateX(calc(-50% - ${shiftX}px)) translateY(${shiftY}px) rotate(45deg)`,
    };
  }
  return {
    [isStart ? "right" : "left"]: 0,
    top: "50%",
    [isStart ? "marginRight" : "marginLeft"]: -8,
    clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
    transform: `translateX(${shiftX}px) translateY(calc(-50% - ${shiftY}px))${placement === "right" ? " rotate(180deg)" : ""}`,
  };
}

function flipPlacement(
  trigger: DOMRect,
  floating: DOMRect,
  defaultPlacement: FloatingPlacement,
  offset: number,
): FloatingPlacement {
  if (defaultPlacement === "top" && trigger.top < floating.height + offset)
    return "bottom";
  if (
    defaultPlacement === "bottom" &&
    window.innerHeight - trigger.bottom < floating.height + offset
  )
    return "top";
  if (defaultPlacement === "left" && trigger.left < floating.width + offset)
    return "right";
  if (
    defaultPlacement === "right" &&
    window.innerWidth - trigger.right < floating.width + offset
  )
    return "left";
  return defaultPlacement;
}

function clampShift(natural: number, max: number, offset: number): number {
  if (natural < offset) return offset - natural;
  if (natural > max) return max - natural;
  return 0;
}

export function computeFloatingPosition(
  trigger: DOMRect,
  floating: DOMRect,
  defaultPlacement: FloatingPlacement,
  offset: number,
) {
  const placement = flipPlacement(trigger, floating, defaultPlacement, offset);

  if (placement === "top" || placement === "bottom") {
    const naturalX = trigger.left + trigger.width / 2 - floating.width / 2;
    const y =
      placement === "top"
        ? trigger.top - floating.height - offset
        : trigger.bottom + offset;
    const shiftX = clampShift(
      naturalX,
      window.innerWidth - offset - floating.width,
      offset,
    );
    return { placement, x: naturalX + shiftX, y, shiftX, shiftY: 0 };
  }

  const naturalY = trigger.top + trigger.height / 2 - floating.height / 2;
  const x =
    placement === "left"
      ? trigger.left - floating.width - offset
      : trigger.right + offset;
  const shiftY = clampShift(
    naturalY,
    window.innerHeight - offset - floating.height,
    offset,
  );
  return { placement, x, y: naturalY + shiftY, shiftX: 0, shiftY };
}
