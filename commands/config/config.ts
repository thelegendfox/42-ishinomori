import type { Command } from "../../util/types/commandTypes.ts";
import {
	SlashCommandBuilder,
	MessageFlags,
	ComponentType,
	SeparatorSpacingSize,
	ChatInputCommandInteraction,
	ButtonStyle,
	PermissionsBitField,
	PermissionFlagsBits,
	InteractionContextType,
} from "discord.js";

const config: Command = {
	data: new SlashCommandBuilder()
		.setName("config")
		.setDescription("Set your server's settings!")
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction: ChatInputCommandInteraction) {
		const interactionMemberPermissions = interaction.member
			?.permissions as Readonly<PermissionsBitField>;

		if (
			!interactionMemberPermissions.has(PermissionFlagsBits.ManageGuild)
		) {
			await interaction.reply({
				flags: MessageFlags.Ephemeral,
				content:
					"You don't have permission to perform this action.\n-# Manage Server permission required",
			});
		}

		await interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [
				{
					type: ComponentType.Container,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `# Configuration Options`,
						},
						{
							type: ComponentType.Separator,
							spacing: SeparatorSpacingSize.Large,
						},
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: "config",
									placeholder: "Select one",
									options: [
										{
											label: "Hello World",
											value: "helloWorld",
										},
										{
											label: "HelloWorld",
											value: "helloorld",
										},
									],
									// type: ComponentType.Separator
								},
							],
						},

						// bottom...
						{
							type: ComponentType.Section,
							components: [
								{
									type: ComponentType.TextDisplay,
									content: `<:42:1412861651505647726> | Fourty Two - Ishinomori`,
								},
							],
							accessory: {
								type: ComponentType.Button,
								custom_id: "footer_help",
								label: "Help",
								style: ButtonStyle.Secondary,
							},
						},
					],
				},
			],
		});
	},
};

export default config;
