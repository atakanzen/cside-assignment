import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { RelayEnvironmentProvider } from "react-relay";
import relayEnvironment from "../utils/relay/environment";

export const Route = createRootRouteWithContext<{
	relayEnvironment: typeof relayEnvironment;
}>()({
	component: () => (
		<RelayEnvironmentProvider environment={relayEnvironment}>
			<div className="fixed w-screen h-12 bg-purple-200 flex items-center p-4">
				<h1 className="text-2xl font-bold">GitSherlocked</h1>
			</div>
			<Outlet />
			<TanStackRouterDevtools />
		</RelayEnvironmentProvider>
	),
});
