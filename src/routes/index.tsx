import SearchContainer from "@/components/SearchContainer";
import { createFileRoute } from "@tanstack/react-router";
import { graphql, loadQuery } from "react-relay";
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
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<SearchContainer />
		</div>
	);
}
