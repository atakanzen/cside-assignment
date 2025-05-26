// /context/AppProvider.tsx
import { useReducer } from "react";
import { AppDispatchContext, AppStateContext } from "./AppContext";
import { appReducer } from "./AppReducer";
import { initialAppState } from "./AppState";

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	const [state, dispatch] = useReducer(appReducer, initialAppState);

	return (
		<AppStateContext.Provider value={state}>
			<AppDispatchContext.Provider value={dispatch}>
				{children}
			</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	);
};
