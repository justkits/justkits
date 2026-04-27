import { createContext } from "react";

type CollapsibleContextValue = {
  isOpen: boolean;
  disabled: boolean;
  unmountOnHide: boolean;
  toggle: () => void;
  contentId: string;
  toggleId: string;
};

export const CollapsibleContext = createContext<CollapsibleContextValue | null>(
  null,
);
