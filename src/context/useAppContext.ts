// /context/useAppContext.ts
import { useContext } from "react";
import { AppDispatchContext, AppStateContext } from "./AppContext";

export const useAppState = () => {
	const context = useContext(AppStateContext);
	if (!context) {
		throw new Error("useAppState must be used within AppProvider");
	}
	return context;
};

export const useAppDispatch = () => {
	const context = useContext(AppDispatchContext);
	if (!context) {
		throw new Error("useAppDispatch must be used within AppProvider");
	}
	return context;
};
