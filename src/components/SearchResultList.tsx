import { formatStargazerCount } from "@/utils/helpers";
import type { SearchResultListQuery } from "@/utils/relay/__generated__/SearchResultListQuery.graphql";
import { CopyIcon, Share1Icon, StarFilledIcon } from "@radix-ui/react-icons";
import { type PreloadedQuery, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";

export const SearchQuery = graphql`
  query SearchResultListQuery($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10)  {
      nodes {
        ... on Repository {
          id,
          name,
					owner {
						login
					} 
          description,
          stargazerCount,
          forkCount,
					refs(refPrefix: "refs/heads/", first: 100) {
						totalCount,
					}
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
	if (!data.search.nodes) return;

	return (
		<ul className="mt-4 rounded border-2 border-purple-400 divide-y divide-purple-400">
			{data.search.nodes
				.filter((n) => !!n)
				.map((repo) => (
					<li
						key={repo.id}
						className="p-2 flex items-center justify-between gap-x-4 hover:cursor-pointer hover:bg-purple-100"
						title={repo.description ?? ""}
					>
						<div className="">
							{repo.owner?.login}/{repo.name}
						</div>
						<div className="flex items-center justify-center gap-1">
							<span>{formatStargazerCount(repo.stargazerCount)}</span>
							<StarFilledIcon color="purple" />
							<span>{formatStargazerCount(repo.forkCount)}</span>
							<CopyIcon color="purple" />
							<span>{formatStargazerCount(repo.refs?.totalCount)}</span>
							<Share1Icon color="purple" />
						</div>
					</li>
				))}
		</ul>
	);
};

export default SearchResultList;
