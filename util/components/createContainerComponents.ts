import { ComponentType, SeparatorSpacingSize, Component } from "discord.js";
import { fourtyTwo } from "../emojis.ts";
import componentFooter, {
	componentFooterWithoutButton,
} from "./componentFooter.ts";

/**
 *  Creates components nested within a container; automatically adds a header and footer.
 * @param options Options object: { headerTitle: string, headerEmoji?: boolean (toggles 42's emoji on/off), headerSeparatorSize: small/large, footerButton: boolean, components: Array<AnyComponentV2> (all components to be inside) }.
 * @returns ComponentHeader object, which contains ComponentHeader.Header and ComponentHeader.Separator
 */
export default function createContainerComponents(
	options: CreateContainerComponentsOptions
): ComponentsInContainer {
	if (!options.headerSeparatorSize)
		options.headerSeparatorSize = SeparatorSpacingSize.Large;

	if (!options.footerButton) options.footerButton = true;

	const headerContent = (() => {
		if (options.headerEmoji || options.headerEmoji === undefined)
			return `# ${options.headerTitle} ${fourtyTwo}`;
		else return `# ${options.headerTitle}`;
	})();

	const headerSeparator = {
		type: ComponentType.Separator,
		spacing: options.headerSeparatorSize,
	};

	const footer = options.footerButton
		? componentFooter
		: componentFooterWithoutButton;

	const components: ComponentsInContainer = {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: headerContent,
					},
					headerSeparator,
					...options.components,
					footer.separator,
					footer.main,
				],
			},
		],
	};

	return components;
}

type CreateContainerComponentsOptions = {
	headerTitle: string;
	headerEmoji?: boolean;
	headerSeparatorSize?: 1 | 2; // Small or Large Padding
	footerButton?: boolean;
	components: Array<any>; // fix any
};

type ComponentsInContainer = {
	components: [
		{
			type: 17;
			components: [
				// Container
				{
					type: 10; // Text Display for header
					content: string;
				},
				{
					type: number; // Should be 14 but TS freaks the hell out. Separator, either way
					spacing: 1 | 2; // Small or Large Padding
				},
				...Array<Component["data"]>, // fix any // components
				(
					| typeof componentFooter.separator
					| typeof componentFooterWithoutButton.separator
				),
				(
					| typeof componentFooter.main
					| typeof componentFooterWithoutButton.main
				)
			];
		}
	];
};
