import { formatStargazerCount } from "@/utils/helpers";
import type { RepositoryDetailDialog_repository$key } from "@/utils/relay/__generated__/RepositoryDetailDialog_repository.graphql";
import { CopyIcon, Share1Icon, StarFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { graphql, usePaginationFragment } from "react-relay";
import Collaborators from "./Collaborators";
import IssuesList from "./IssuesList";

interface RepositoryDetailDialogProps {
	repositoryRef: RepositoryDetailDialog_repository$key;
	onClose: () => void;
}

const RepositoryDetailDialog = ({
	repositoryRef,
	onClose,
}: RepositoryDetailDialogProps) => {
	const {
		data: repository,
		loadNext,
		hasNext,
		isLoadingNext,
	} = usePaginationFragment(
		graphql`
		fragment RepositoryDetailDialog_repository on Repository
		@refetchable(queryName: "RepositoryDetailDialogPaginationQuery")
		@argumentDefinitions(
			first: { type: "Int", defaultValue: 10 },
			after: { type: "String" }
		) {
			id
			name
			description
			stargazerCount
			forkCount
			url
			owner {
				login
			}
			refs(refPrefix: "refs/heads/", first: 100) { 
				totalCount
			}
			...Collaborators_repository
			issues(first: $first, after: $after) @connection(key: "RepositoryDetailDialog_issues") {
				edges {
					node {
						id
						title
						body
						createdAt
						labels(first: 5) {
							nodes {
								id
								name
							}
						}
						url
						...IssuesList_issue @arguments(first: 5)
					}
				}
				pageInfo {
					hasNextPage
					endCursor
				}
			}
		}
        `,
		repositoryRef,
	);

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 border">
			<div className="bg-white rounded shadow-lg w-1/2 h-1/2 flex flex-col justify-between">
				<div className="flex justify-between items-center border-b p-4">
					<h2 className="text-xl font-bold">
						<a
							className="cursor-pointer underline text-purple-500"
							href={repository.url}
							target="_blank"
							rel="noreferrer"
						>
							{repository.owner.login}/{repository.name}
						</a>
					</h2>
					<div className="flex items-center justify-center gap-x-2">
						<div
							title="Stargazers"
							className="flex items-center justify-center gap-x-1"
						>
							{formatStargazerCount(repository.stargazerCount)}
							<StarFilledIcon color="purple" />
						</div>
						<div
							title="Forks"
							className="flex items-center justify-center gap-x-1"
						>
							{formatStargazerCount(repository.forkCount)}
							<CopyIcon color="purple" />
						</div>
						<div
							title="Branches"
							className="flex items-center justify-center gap-x-1"
						>
							{formatStargazerCount(repository.refs?.totalCount)}
							<Share1Icon color="purple" />
						</div>
					</div>
				</div>
				<div className="p-4 h-full flex flex-col items-start gap-4 overflow-hidden">
					<div>
						<h3 className="text-lg font-semibold mb-2">Description</h3>
						<p>{repository.description}</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-2">Collaborators</h3>
						<Collaborators repositoryRef={repository} />
					</div>
					<h3 className="text-lg font-semibold">Issues</h3>
					<div className="overflow-y-scroll">
						{repository.issues?.edges && repository.issues.edges.length > 0 ? (
							repository.issues.edges.map((edge) => {
								if (!edge || !edge.node) return null;
								const issue = edge.node;
								return (
									<div key={issue.id} className="border p-2 rounded mb-2">
										<h4 className="font-bold text-md underline text-purple-500 cursor-pointer">
											<a href={issue.url} target="_blank" rel="noreferrer">
												{issue.title}
											</a>
										</h4>
										<p className="text-sm text-gray-600">{issue.body}</p>
										<p className="text-xs text-gray-400">
											Created on{" "}
											{new Date(issue.createdAt).toLocaleDateString()}
										</p>
										<div className="mt-1 flex flex-wrap gap-1">
											{issue.labels?.nodes?.map((label) => (
												<span
													key={label?.id}
													className="bg-purple-200 text-purple-800 text-xs px-2 rounded"
												>
													{label?.name}
												</span>
											))}
										</div>
										<div className="mt-2">
											<IssuesList issueRef={issue} />
										</div>
									</div>
								);
							})
						) : (
							<p className="text-sm text-gray-500">No issues found.</p>
						)}
						{hasNext && (
							<Button
								onClick={() => loadNext(10)}
								disabled={isLoadingNext}
								className="mt-2"
							>
								{isLoadingNext ? "Loading..." : "Load More Issues"}
							</Button>
						)}
					</div>
				</div>
				<div className="flex w-full justify-end items-center p-4 gap-x-2">
					<Button
						onClick={onClose}
						color="purple"
						variant="outline"
						className="cursor-pointer!"
					>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
};

export default RepositoryDetailDialog;
