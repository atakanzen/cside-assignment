import type { SearchResultListQuery$variables } from "@/utils/relay/__generated__/SearchResultListQuery.graphql";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { IconButton, TextField } from "@radix-ui/themes";
import {
	type ChangeEventHandler,
	type KeyboardEventHandler,
	memo,
} from "react";
import type { UseQueryLoaderLoadQueryOptions } from "react-relay";

interface SearchbarProps {
	value: string;
	onChange: (value: string) => void;
	onPressEnter: (
		variables: SearchResultListQuery$variables,
		options?: UseQueryLoaderLoadQueryOptions | undefined,
	) => void;
}

const Searchbar = ({ value, onChange, onPressEnter }: SearchbarProps) => {
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		onChange(e.target.value);
	};

	const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter") onPressEnter({ query: value });
	};

	return (
		<TextField.Root
			className="w-xl"
			size="3"
			placeholder="Search a repository..."
			color="purple"
			type="search"
			variant="soft"
			value={value}
			onChange={handleChange}
			onKeyDown={handleOnKeyDown}
		>
			<TextField.Slot side="right">
				<IconButton variant="ghost" className="hover:cursor-pointer!">
					<MagnifyingGlassIcon />
				</IconButton>
			</TextField.Slot>
		</TextField.Root>
	);
};

export default memo(Searchbar);
