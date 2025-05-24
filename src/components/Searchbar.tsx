import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

const Searchbar = () => {
	return (
		<TextField.Root
			className="w-xl"
			size="3"
			placeholder="Search a repository..."
			color="purple"
			type="search"
			variant="soft"
		>
			<TextField.Slot>
				<MagnifyingGlassIcon />
			</TextField.Slot>
		</TextField.Root>
	);
};

export default Searchbar;
