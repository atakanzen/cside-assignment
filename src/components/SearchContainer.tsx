import type { SearchResultListQuery } from "@/utils/relay/__generated__/SearchResultListQuery.graphql";
import { useState } from "react";
import { useQueryLoader } from "react-relay";
import SearchResultList, { SearchQuery } from "./SearchResultList";
import Searchbar from "./Searchbar";

const SearchContainer = () => {
	const [searchInput, setSearchInput] = useState("");

	const [queryRef, loadQuery] =
		useQueryLoader<SearchResultListQuery>(SearchQuery);

	return (
		<div className="flex flex-col gap-y-4 h-full justify-center">
			<Searchbar
				value={searchInput}
				onChange={setSearchInput}
				onPressEnter={loadQuery}
			/>
			{queryRef && <SearchResultList queryRef={queryRef} />}
		</div>
	);
};

export default SearchContainer;
