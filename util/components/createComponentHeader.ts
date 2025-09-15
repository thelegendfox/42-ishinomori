import { ComponentType, SeparatorSpacingSize } from "discord.js";
import { fourtyTwo } from "../emojis.ts";

/**
 *  Creates a new component header.
 * @param options Options object: { title: string, emoji?: boolean (toggles 42's emoji on/off), separatorSize: small/large }.
 * @returns ComponentHeader object, which contains ComponentHeader.Header and ComponentHeader.Separator
 */
export default function componentHeader(
	options: ComponentHeaderOptions
): ComponentHeader {
	if (!options.separatorSize)
		options.separatorSize = SeparatorSpacingSize.Large;

	const headerContent = (() => {
		if (options.emoji || options.emoji === undefined)
			return `# ${options.title} ${fourtyTwo}`;
		else return `# ${options.title}`;
	})();

	const separator = {
		type: ComponentType.Separator,
		spacing: options.separatorSize,
	};

	return {
		header: {
			type: ComponentType.TextDisplay,
			content: headerContent,
		},
		separator: separator,
	};
}

type ComponentHeaderOptions = {
	title: string;
	emoji?: boolean;
	separatorSize?: 1 | 2; // Small or Large Padding
	// thumbnailUrl?: string;
};

type ComponentHeader = {
	header: {
		type: 10; // Text Display
		content: string;
	};
	separator: {
		type: number; // Should be 14 but TS freaks the hell out. Separator, either way
		spacing: 1 | 2; // Small or Large Padding
	};
};
