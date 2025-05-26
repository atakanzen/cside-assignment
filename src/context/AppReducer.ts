import type { Repository } from "@/types/Repository";
import type { AppState } from "./AppState";

type SearchInputChangeAction = {
	type: "searchInputChange";
	payload: string;
};

type UpdateSearchResult = {
	type: "updateSearchResult";
	payload: Repository[];
};

export type AppAction = SearchInputChangeAction | UpdateSearchResult;

export const appReducer = (state: AppState, action: AppAction): AppState => {
	switch (action.type) {
		case "searchInputChange": {
			return {
				...state,
				repoSearchInput: action.payload,
			};
		}
		case "updateSearchResult": {
			return {
				...state,
				repoSearchResult: action.payload,
			};
		}
		default: {
			throw Error(`Unknown action: ${action}`);
		}
	}
};
