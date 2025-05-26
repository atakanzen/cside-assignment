// /context/AppContext.tsx
import { createContext } from "react";
import type { AppAction } from "./AppReducer";
import type { AppState } from "./AppState";

// State-only context
export const AppStateContext = createContext<AppState | undefined>(undefined);

// Dispatch-only context
export const AppDispatchContext = createContext<
	React.Dispatch<AppAction> | undefined
>(undefined);
