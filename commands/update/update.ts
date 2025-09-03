import {
	SlashCommandBuilder,
	MessageFlags,
	ChatInputCommandInteraction,
} from "discord.js";

const update = {
	data: new SlashCommandBuilder()
		.setName("update")
		.setDescription("Update your roles, callsign, et cetera.")
		.addUserOption((option) =>
			option.setName("user").setDescription("The user to be updated")
		),
	async execute(interaction: ChatInputCommandInteraction) {
		if (interaction.options.data[0]) {
			const interactionOptionsData = interaction.options.data[0];

			console.log(interactionOptionsData);
			console.log(interactionOptionsData.user.id);

			await interaction.reply({
				flags: MessageFlags.Ephemeral,
				content: `This command is under construction. Check back later. For now, please ask Command to help you.`,
			});
		}

		console.log(interaction.options.data);

		await interaction.reply({
			flags: MessageFlags.Ephemeral,
			content: `This command is under construction. Check back later. For now, please ask Command to help you.`,
		});
	},
};

export default update;

const updateWithUser = async (interaction: ChatInputCommandInteraction) => {};
