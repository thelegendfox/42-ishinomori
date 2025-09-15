/*


Consider moving option selection to a modal


*/
import type { Command } from "../../util/types/commandTypes.ts";
import componentHeader from "../../util/components/createComponentHeader.ts";
import componentFooter from "../../util/components/componentFooter.ts";
import {
	SlashCommandBuilder,
	MessageFlags,
	ChatInputCommandInteraction,
	InteractionContextType,
	PermissionFlagsBits,
	ComponentType,
} from "discord.js";

const header = componentHeader({ title: "Ticket Configuration" });

const createTicket = {
	data: new SlashCommandBuilder()
		.setName("ticket-config")
		.setDescription("Configurate your server's tickets!")
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			flags: MessageFlags.IsComponentsV2 + MessageFlags.Ephemeral,
			components: ticketConfigStartPage,
		});
	},
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

const ticketConfigStartPage = [
	{
		type: ComponentType.Container,
		components: [
			header.header,
			header.separator,
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
			componentFooter.separator,
			componentFooter.main,
		],
	},
];
