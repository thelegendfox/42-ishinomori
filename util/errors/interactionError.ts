import {
	ChatInputCommandInteraction,
	StringSelectMenuInteraction,
	RoleSelectMenuInteraction,
	UserSelectMenuInteraction,
	ChannelSelectMenuInteraction,
	MentionableSelectMenuInteraction,
	ModalSubmitInteraction,
	ButtonInteraction,
	MessageFlags,
} from "discord.js";

export default async function interactionError(
	interaction:
		| ChatInputCommandInteraction
		| StringSelectMenuInteraction
		| RoleSelectMenuInteraction
		| UserSelectMenuInteraction
		| ChannelSelectMenuInteraction
		| MentionableSelectMenuInteraction
		| ModalSubmitInteraction
		| ButtonInteraction,
	error: Error
) {
	console.error(error);

	if (interaction.replied || interaction.deferred) {
		await interaction
			.followUp({
				content:
					"We're sorry! There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			})
			.catch((error) => console.error(error));
	} else {
		await interaction
			.reply({
				content:
					"We're sorry! There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			})
			.catch((error) => console.error(error));
	}
}
