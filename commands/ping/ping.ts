import type { Command } from "../../util/types/commandTypes.ts";
import {
	SlashCommandBuilder,
	MessageFlags,
	ChatInputCommandInteraction,
	InteractionContextType,
} from "discord.js";

const ping: Command = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Get your ping!"),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			flags: MessageFlags.Ephemeral,
			content: `Pong! In the futire, this will contain more info about the bot's actual ping.`,
		});
	},
};

export default ping;
