import { createContext } from "react";

// True when rendered inside Alert.Content — throws if not
export const ContentContext = createContext(false);
