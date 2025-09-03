/*

TODO: REGISTER COMMAND

*/

import { SlashCommandBuilder, MessageFlags } from "discord.js";

const update = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Get your ping!"),
	async execute(interaction: any) {
		await interaction.reply({
			flags: MessageFlags.Ephemeral,
			content: `Pong! In the futire, this will contain more info about the bot's actual ping.`,
		});
	},
};

export default update;
