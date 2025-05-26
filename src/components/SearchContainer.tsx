import { useAppDispatch, useAppState } from "@/context/useAppContext";
import type { SearchContainerQuery } from "@/utils/relay/__generated__/SearchContainerQuery.graphql";
import { useEffect, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import SearchResultList from "./SearchResultList";
import Searchbar from "./Searchbar";

const searchQuery = graphql`
  query SearchContainerQuery($query: String!, $skip: Boolean!) {
    
    search(query: $query, type: REPOSITORY, first: 10) @skip(if: $skip) {
      nodes {
        ... on Repository {
          id,
          name, 
          description,
          stargazerCount,
          forkCount
        }
      }
    }
  }
`;

const DEBOUNCE_DELAY = 500; // in milliseconds.

const SearchContainer = () => {
	const { repoSearchInput } = useAppState();
	const dispatch = useAppDispatch();

	const [debouncedInput, setDebouncedInput] = useState(repoSearchInput);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedInput(repoSearchInput);
		}, DEBOUNCE_DELAY);

		return () => {
			clearTimeout(handler);
		};
	}, [repoSearchInput]);

	const shouldQuery = debouncedInput.trim().length > 3;

	const data = useLazyLoadQuery<SearchContainerQuery>(searchQuery, {
		query: debouncedInput,
		skip: !shouldQuery,
	});

	// Update global state when data arrives
	useEffect(() => {
		if (data?.search?.nodes) {
			const repos = data.search.nodes.filter(
				(n) => n !== null && n !== undefined,
			);
			dispatch({ type: "updateSearchResult", payload: repos });
		}
	}, [data, dispatch]);

	return (
		<div className="flex flex-col gap-y-4 h-full justify-center">
			<Searchbar />
			<SearchResultList />
		</div>
	);
};

export default SearchContainer;
