/**
 * Get the differences between two maps.
 *
 * Normally returns a Map of differences in form of key: key, value: [value, "added"|"removed"]. If no matches are found, Null is returned.
 * @param initialMap The initial Map to compare to (items not in this will be considered "added").
 * @param currentMap The current Map to compare the initial to (items not in this will be considered "removed").
 */
export default function getDifference(
	initialMap: Map<any, any>,
	currentMap: Map<any, any>
): Map<any, Array<any>> | null {
	let differences: Map<any, Array<any>> = new Map();

	// If it's in the initial map but not the current one, it must have been removed.
	for (const role of initialMap) {
		// Note: for...of loops on maps return 2 value arrays ([key, value])
		// That's why this is here
		const key = role[0];
		const value = role[1];

		if (currentMap.has(key) === false)
			differences.set(key, [value, "removed"]);
	}

	// But if it's in the current map but not the initial, it must have been added
	for (const role of currentMap) {
		const key = role[0];
		const value = role[1];

		if (initialMap.has(key) === false)
			differences.set(key, [value, "added"]);
	}

	return differences;
}
