import type { IssuesList_issue$key } from "@/utils/relay/__generated__/IssuesList_issue.graphql";
import { Button } from "@radix-ui/themes";
import { graphql, usePaginationFragment } from "react-relay";

interface IssuesListProps {
	issueRef: IssuesList_issue$key; // Replace `any` with the generated fragment type if available
}

const IssuesList = ({ issueRef }: IssuesListProps) => {
	const {
		data: issue,
		loadNext,
		hasNext,
		isLoadingNext,
	} = usePaginationFragment(
		graphql`
      fragment IssuesList_issue on Issue
      @refetchable(queryName: "IssuesListPaginationQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 5 },
        after: { type: "String" }
      ) {
        id
        comments(first: $first, after: $after) @connection(key: "IssuesList_comments") {
          edges {
            node {
              id
              body
              createdAt
              author {
                ... on User {
                  login
                  avatarUrl
                }
                ... on Bot {
                  login
                  avatarUrl
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
		issueRef,
	);

	return (
		<div>
			{issue.comments.edges?.map((edge) => {
				if (!edge || !edge.node) return null;
				const comment = edge.node;
				return (
					<div key={comment.id} className="border p-2 rounded mb-2">
						<div className="flex items-center gap-2 mb-1">
							<img
								src={comment.author?.avatarUrl}
								alt={comment.author?.login}
								className="w-6 h-6 rounded-full"
							/>
							<span className="font-bold">{comment.author?.login}</span>
							<span className="text-xs text-gray-500">
								{new Date(comment.createdAt).toLocaleString()}
							</span>
						</div>
						<p>{comment.body}</p>
					</div>
				);
			})}
			{hasNext && (
				<Button
					onClick={() => loadNext(5)}
					disabled={isLoadingNext}
					className="mt-2"
				>
					{isLoadingNext ? "Loading..." : "Load More Discussions"}
				</Button>
			)}
		</div>
	);
};

export default IssuesList;
