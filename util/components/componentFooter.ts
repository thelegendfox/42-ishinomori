import { ComponentType, ButtonStyle, SeparatorSpacingSize } from "discord.js";
import { fourtyTwo } from "../emojis.ts";

export const componentFooter = {
	separator: {
		type: ComponentType.Separator,
		divider: false,
		spacing: SeparatorSpacingSize.Large,
	},
	main: {
		type: ComponentType.Section,
		components: [
			{
				type: ComponentType.TextDisplay,
				content: `${fourtyTwo} | Fourty Two - Ishinomori`,
			},
		],
		accessory: {
			type: ComponentType.Button,
			custom_id: "footer_help",
			label: "Help",
			style: ButtonStyle.Secondary,
		},
	},
};

export const componentFooterWithoutButton = {
	separator: {
		type: ComponentType.Separator,
		divider: false,
		spacing: SeparatorSpacingSize.Large,
	},
	main: {
		type: ComponentType.TextDisplay,
		content: `${fourtyTwo} | Fourty Two - Ishinomori`,
	},
};

export default componentFooter;
