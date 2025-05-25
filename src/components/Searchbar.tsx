import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useState } from "react";

const Searchbar = () => {
	const [searchInput, setSearchInput] = useState<string>("");

	return (
		<TextField.Root
			className="w-xl"
			size="3"
			placeholder="Search a repository..."
			color="purple"
			type="search"
			variant="soft"
			value={searchInput}
			onChange={(e) => setSearchInput(e.target.value)}
		>
			<TextField.Slot>
				<MagnifyingGlassIcon />
			</TextField.Slot>
		</TextField.Root>
	);
};

export default Searchbar;
