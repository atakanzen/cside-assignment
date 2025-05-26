import { useAppDispatch, useAppState } from "@/context/useAppContext";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

const Searchbar = () => {
	const state = useAppState();
	const dispatch = useAppDispatch();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch({ type: "searchInputChange", payload: e.target.value });
	};

	return (
		<TextField.Root
			className="w-xl"
			size="3"
			placeholder="Search a repository..."
			color="purple"
			type="search"
			variant="soft"
			value={state.repoSearchInput}
			onChange={handleChange}
		>
			<TextField.Slot>
				<MagnifyingGlassIcon />
			</TextField.Slot>
		</TextField.Root>
	);
};

export default Searchbar;
