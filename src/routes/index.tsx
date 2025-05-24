import SearchResultList from "@/components/SearchResultList";
import Searchbar from "@/components/Searchbar";
import { createFileRoute } from "@tanstack/react-router";
import { graphql, loadQuery, usePreloadedQuery } from "react-relay";
import type { routesQuery } from "../utils/relay/__generated__/routesQuery.graphql";

const INDEX_QUERY = graphql`
  query routesQuery {
    viewer {
      name
    }
  }
`;

export const Route = createFileRoute("/")({
	component: App,
	pendingComponent: () => <div>Loading...</div>,
	loader: async ({ context: { relayEnvironment } }) => {
		return loadQuery<routesQuery>(
			relayEnvironment,
			INDEX_QUERY,
			{},
			{ fetchPolicy: "store-and-network" },
		);
	},
});

function App() {
	const preloadedQuery = Route.useLoaderData();
	const data = usePreloadedQuery<routesQuery>(INDEX_QUERY, preloadedQuery);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="flex flex-col gap-y-4 h-full justify-center">
				<Searchbar />
				{/* Once Data From Searchbar query show here as a list. */}
				<SearchResultList />
			</div>
		</div>
	);
}
