import {
	ButtonInteraction,
	ChannelSelectMenuInteraction,
	ChatInputCommandInteraction,
	MentionableSelectMenuInteraction,
	ModalSubmitInteraction,
	RoleSelectMenuInteraction,
	// SlashCommandOptionsOnlyBuilder,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandsOnlyBuilder,
	StringSelectMenuInteraction,
	UserSelectMenuInteraction,
} from "discord.js";

type Command = {
	notSlashCommand?: boolean;
	data?:
		| SlashCommandBuilder
		| SlashCommandOptionsOnlyBuilder
		| SlashCommandSubcommandsOnlyBuilder;
	execute?: (interaction: ChatInputCommandInteraction) => Promise<void>;
	stringSelectMenuResponses?: Array<SubInteractionResponse>;
	roleSelectMenuResponses?: Array<SubInteractionResponse>;
	userSelectMenuResponses?: Array<SubInteractionResponse>;
	channelSelectMenuResponses?: Array<SubInteractionResponse>;
	mentionableSelectMenuResponses?: Array<SubInteractionResponse>;
	modalSubmitResponses?: Array<SubInteractionResponse>;
	buttonResponses?: Array<SubInteractionResponse>;
};

type SubInteractionResponse = {
	id: string;
	function: (
		interaction: // | StringSelectMenuInteraction
		// | RoleSelectMenuInteraction
		// | UserSelectMenuInteraction
		// | ChannelSelectMenuInteraction
		// | MentionableSelectMenuInteraction
		// | ModalSubmitInteraction
		// | ButtonInteraction
		any // fix this any
	) => Promise<void>;
};

export type { Command, SubInteractionResponse };
