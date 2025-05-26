import { useAppState } from "@/context/useAppContext";

const SearchResultList = () => {
	const { repoSearchResult } = useAppState();

	if (!repoSearchResult.length) return null;

	return (
		<ul className="mt-4 rounded border-2 border-purple-400 divide-y divide-purple-400">
			{repoSearchResult.map((repo) => (
				<li
					key={repo.id}
					className="p-2 flex items-center justify-center gap-x-4 hover:cursor-pointer hover:bg-purple-100"
				>
					<span>{repo.name}</span>
					<span>{repo.stargazerCount}</span>
				</li>
			))}
		</ul>
	);
};

export default SearchResultList;
