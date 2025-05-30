const AppHeader = () => {
	return (
		<div className="fixed w-screen h-12 bg-purple-200 flex items-center p-4 gap-x-2">
			<h1 className="text-2xl font-bold">GitSherlocked</h1>
			<p>
				A C/Side interview assignment by{" "}
				<a
					className="underline"
					href="https://atakanzen.com"
					rel="noreferrer"
					target="_blank"
				>
					Atakan Zengin
				</a>
			</p>
		</div>
	);
};

export default AppHeader;
