/*


Consider moving option selection to a modal


*/
import type { Command } from "../../util/types/commandTypes.ts";
import createContainerComponents from "../../util/components/createContainerComponents.ts";
import {
	SlashCommandBuilder,
	MessageFlags,
	ChatInputCommandInteraction,
	InteractionContextType,
	PermissionFlagsBits,
	ComponentType,
	StringSelectMenuInteraction,
} from "discord.js";
import interactionError from "../../util/errors/interactionError.ts";

// const header = componentHeader({ title: "Ticket Configuration" });

// let ticketPanel: Collection<string, InteractionResponse> = new Collection();

const createTicket: Command = {
	data: new SlashCommandBuilder()
		.setName("ticket-config")
		.setDescription("Configurate your server's tickets!")
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			flags: MessageFlags.IsComponentsV2 + MessageFlags.Ephemeral,
			components: ticketConfigStartPage.components,
		});
	},
	stringSelectMenuResponses: [
		{
			id: "ticketConfigPageSelect",
			function: async (interaction: StringSelectMenuInteraction) => {
				await interaction
					.update({
						components: editComponents.components,
					})
					.catch((error) => interactionError(interaction, error));
			},
		},
	],
};

export default createTicket;

const ticketConfigPageSelectOptions = [
	{
		label: "Hello",
		value: "world",
		description: "World!",
	},
	{
		label: "Foo",
		value: "bar",
		description: "Bar",
	},
];

const ticketConfigStartPage = createContainerComponents({
	headerTitle: "Ticket Configuration",
	components: [
		{
			type: ComponentType.TextDisplay,
			content: "Click below to select the setting to edit:",
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: "ticketConfigPageSelect",
					placeholder: "Settings",
					options: ticketConfigPageSelectOptions,
				},
			],
		},
	],
});

const editComponents = createContainerComponents({
	headerTitle: "Ticket Configuration - Page Foo",
	components: [
		{
			type: ComponentType.TextDisplay,
			content: "Hello World!",
		},
	],
});
