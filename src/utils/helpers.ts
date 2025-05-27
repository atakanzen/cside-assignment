export const formatStargazerCount = (count: number | undefined): string => {
	if (count === undefined) return "";
	if (count < 1000) return count.toString();

	const value = count / 1000;
	const rounded = Math.round(value * 10) / 10;

	if (rounded % 1 === 0) {
		return `${rounded.toFixed(0)}k`;
	}

	return `${rounded.toFixed(1)}k`;
};
