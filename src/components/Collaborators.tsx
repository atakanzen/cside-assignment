import type { Collaborators_repository$key } from "@/utils/relay/__generated__/Collaborators_repository.graphql";
import { graphql, useFragment } from "react-relay";

interface CollaboratorsProps {
	repositoryRef: Collaborators_repository$key;
}

const Collaborators = ({ repositoryRef }: CollaboratorsProps) => {
	const data = useFragment(
		graphql`
      fragment Collaborators_repository on Repository
      @argumentDefinitions(first: {type: "Int", defaultValue: 25}) {
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: $first) {
                edges {
                  node {
                    author {
                      __typename
                      ... on GitActor {
                        name
                        avatarUrl
                      }
                      email
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
		repositoryRef,
	);

	const edges = data?.defaultBranchRef?.target?.history?.edges || [];

	// Deduplicate authors by login (or email if login is missing)
	const authorMap = new Map<string, { login: string; avatarUrl?: string }>();
	for (const edge of edges) {
		const author = edge?.node?.author;
		if (author) {
			const key = author.name || author.email;
			if (key && !authorMap.has(key)) {
				authorMap.set(key, {
					login: author.name || author.email || "Unknown",
					avatarUrl: author.avatarUrl,
				});
			}
		}
	}
	const contributors = Array.from(authorMap.values());

	return (
		<div>
			{contributors.length > 0 ? (
				<div className="flex items-center">
					{contributors.map((contributor, index) => (
						<div
							key={contributor.login}
							className={`relative group ${index !== 0 ? "-ml-3" : ""}`}
						>
							<img
								src={contributor.avatarUrl}
								alt={contributor.login}
								className="w-10 h-10 rounded-full border-2 border-white transition-transform duration-200 transform hover:-translate-y-1"
							/>
							<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
								{contributor.login}
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-sm text-gray-500">No contributors found.</p>
			)}
		</div>
	);
};

export default Collaborators;
