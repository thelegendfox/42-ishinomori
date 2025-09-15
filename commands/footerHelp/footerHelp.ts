import type { Command } from "../../util/types/commandTypes.ts";
import {
	SlashCommandBuilder,
	MessageFlags,
	ChatInputCommandInteraction,
	InteractionContextType,
	ButtonInteraction,
} from "discord.js";
import componentHeader from "../../util/components/createComponentHeader.ts";
import componentFooter from "../../util/components/componentFooter.ts";

const header = componentHeader({ title: "Happy ta' Help!" });

const footerHelp: Command = {
	notSlashCommand: true,
	buttonResponses: [
		{
			id: "footer_help",
			function: async (interaction: ButtonInteraction): Promise<void> => {
				interaction.reply({
					flags: MessageFlags.IsComponentsV2 + MessageFlags.Ephemeral,
					components: [
						header.header,
						header.separator,
						//
						componentFooter.separator,
						componentFooter.main,
					],
				});
			},
		},
	],
};

export default footerHelp;
