import { formatStargazerCount } from "@/utils/helpers";
import type { SearchResultListQuery } from "@/utils/relay/__generated__/SearchResultListQuery.graphql";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { type PreloadedQuery, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import RepositoryDetailDialog from "./RepositoryDetailDialog";

export const SearchQuery = graphql`
  query SearchResultListQuery($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10)  {
      nodes {
        ... on Repository {
          id,
          name,
					description
					owner {
						login
					} 
          stargazerCount,
					...RepositoryDetailDialog_repository
        }
      }
    }
  }
`;

interface SearchResultListProps {
	queryRef: PreloadedQuery<SearchResultListQuery>;
}

const SearchResultList = ({ queryRef }: SearchResultListProps) => {
	const data = usePreloadedQuery<SearchResultListQuery>(SearchQuery, queryRef);

	const [selectedRepo, setSelectedRepo] = useState<
		| NonNullable<SearchResultListQuery["response"]["search"]["nodes"]>[number]
		| null
	>(null);

	if (!data.search.nodes) return;

	const handleRepoClick = (
		repo: NonNullable<
			SearchResultListQuery["response"]["search"]["nodes"]
		>[number],
	) => {
		setSelectedRepo(repo);
	};

	return (
		<>
			<ul className="mt-4 rounded border-2 border-purple-400 divide-y divide-purple-400">
				{data.search.nodes
					.filter((n) => !!n)
					.map((repo) => (
						<li
							key={repo.id}
							className="p-2 hover:bg-purple-100"
							title={repo.description ?? ""}
						>
							<button
								type="button"
								className="w-full flex items-center justify-between gap-x-4 p-2 hover:cursor-pointer focus:outline-none"
								onClick={() => handleRepoClick(repo)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleRepoClick(repo);
									}
								}}
							>
								<div>
									{repo.owner?.login}/{repo.name}
								</div>
								<div className="flex items-center justify-center gap-1">
									<span>{formatStargazerCount(repo.stargazerCount)}</span>
									<StarFilledIcon color="purple" />
								</div>
							</button>
						</li>
					))}
			</ul>
			{selectedRepo && (
				<RepositoryDetailDialog
					repositoryRef={selectedRepo}
					onClose={() => setSelectedRepo(null)}
				/>
			)}
		</>
	);
};

export default SearchResultList;
