import type { Command } from "../../util/types/commandTypes.ts";
import componentHeader from "../../util/components/createComponentHeader.ts";
import componentFooter from "../../util/components/componentFooter.ts";
import {
	SlashCommandBuilder,
	MessageFlags,
	ChatInputCommandInteraction,
	ModalBuilder,
	ComponentType,
	SeparatorSpacingSize,
	ButtonStyle,
	Collection,
	Role,
	InteractionContextType,
	PermissionFlagsBits,
} from "discord.js";

const header = componentHeader({ title: "Update a User" });

const updateComponentsNormal = [
	{
		type: ComponentType.Container,
		components: [
			header.header,
			header.separator,
			{
				type: ComponentType.Separator,
				padding: SeparatorSpacingSize.Large,
			},
			{
				type: ComponentType.Section,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "Click here to update yourself:",
					},
				],
				accessory: {
					type: ComponentType.Button,
					style: ButtonStyle.Primary,
					label: "Update",
					custom_id: "updateSelfButton",
				},
			},
			componentFooter.separator,
			componentFooter.main,
		],
	},
];

const updateComponentsModerator = [
	{
		type: ComponentType.Container,
		components: [
			{
				type: ComponentType.TextDisplay,
				content: "# Update a User's Roles <:42:1412861651505647726>",
			},
			{
				type: ComponentType.Separator,
				padding: SeparatorSpacingSize.Large,
			},
			{
				type: ComponentType.Section,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "Click here to update yourself:",
					},
				],
				accessory: {
					type: ComponentType.Button,
					style: ButtonStyle.Primary,
					label: "Update",
					custom_id: "updateSelfButton",
				},
			},
			{
				type: ComponentType.Separator,
				padding: SeparatorSpacingSize.Large,
			},
			{
				type: ComponentType.TextDisplay,
				content: "Or, click below to update a specific user:",
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.UserSelect,
						custom_id: "updateModeratorUserSelect",
						placeholder: "The user to update",
					},
				],
			},
			componentFooter.separator,
			componentFooter.main,
		],
	},
];

// Eventually add to config
const SUPERINTENDENT_ROLE = "1409765417039302682";
const moderatorRoles = [SUPERINTENDENT_ROLE];

const update: Command = {
	data: new SlashCommandBuilder()
		.setName("update")
		.setDescription("Update your roles, callsign, et cetera.")
		.addUserOption((option) =>
			option.setName("user").setDescription("The user to be updated")
		)
		.setContexts(InteractionContextType.Guild),
	async execute(interaction: ChatInputCommandInteraction) {
		// if (interaction.options.data[0]) {
		// const interactionOptionsData = interaction.options.data[0];

		// console.log(interactionOptionsData);
		// console.log(interactionOptionsData?.user?.id);

		// await interaction.reply({
		// 	flags: MessageFlags.Ephemeral,
		// 	content: `This command is under construction. Check back later. For now, please ask Command to help you.`,
		// });

		// const interactionMember: Collection<Snowflake, Role> | undefined = interaction.member?.roles.valueOf();
		// console.log(interaction.member?.roles.valueOf().equals(null));
		const interactionMemberRoles: Collection<string, Role> =
			interaction.member?.roles.valueOf() as Collection<string, Role>;
		const interactionMemberPermissions: Collection<string, bigint> =
			interaction.member?.roles.valueOf() as Collection<string, bigint>;

		const messageData = (() => {
			const returnVal: any = {
				flags: MessageFlags.IsComponentsV2 + MessageFlags.Ephemeral,
				components: updateComponentsNormal,
			};

			if (
				interactionMemberPermissions.has("ManageRoles") ||
				interactionMemberRoles.hasAny(...moderatorRoles)
			) {
				// returnVal.flags = MessageFlags.IsComponentsV2;
				returnVal.components = updateComponentsModerator;
			}

			return returnVal;
		})();

		await interaction.reply(messageData).catch((error) => {
			// handle eventually
			console.error(error);
			return;
		});
		// }
		// await interaction.showModal(modal)
	},
};

export default update;

const updateWithUser = async (interaction: ChatInputCommandInteraction) => {};
