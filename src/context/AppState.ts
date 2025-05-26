import type { Repository } from "@/types/Repository";

export type AppState = {
	repoSearchInput: string;
	repoSearchResult: Repository[];
};

export const initialAppState: AppState = {
	repoSearchInput: "",
	repoSearchResult: [],
};
