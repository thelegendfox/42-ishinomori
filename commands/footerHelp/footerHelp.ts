import type { Command } from "../../util/types/commandTypes.ts";
import { MessageFlags, ButtonInteraction, ComponentType } from "discord.js";
import createContainerComponents from "../../util/components/createContainerComponents.ts";

const footerHelp: Command = {
	notSlashCommand: true,
	buttonResponses: [
		{
			id: "footer_help",
			function: async (interaction: ButtonInteraction): Promise<void> => {
				interaction.reply({
					flags: MessageFlags.IsComponentsV2 + MessageFlags.Ephemeral,
					components: components.components,
				});
			},
		},
	],
};

export default footerHelp;

const components = createContainerComponents({
	headerTitle: "Happy ta' Help!",
	components: [{ type: ComponentType.TextDisplay, content: "Hello World!" }],
});
