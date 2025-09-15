/*

TODO: 
-Add SQL support. 
-Consider adding ratelimiting (in case people update too fast; don't want to oversaturate the db)

*/

// Declare this so client.chatInputCommandInteractionResponses exists
declare module "discord.js" {
	export interface Client {
		chatInputCommandInteractionResponses: Collection<string, any>;
		stringSelectMenuInteractionResponses: Collection<string, any>;
		roleSelectMenuInteractionResponses: Collection<string, any>;
		userSelectMenuInteractionResponses: Collection<string, any>;
		channelSelectMenuInteractionResponses: Collection<string, any>;
		mentionableSelectMenuInteractionResponses: Collection<string, any>;
		modalSubmitInteractionResponses: Collection<string, any>;
		buttonInteractionResponses: Collection<string, any>;
	}
}

/* prettier-ignore */
import { Client, Events, GatewayIntentBits, Collection, MessageFlags, BaseInteraction, StringSelectMenuInteraction, ChatInputCommandInteraction, RoleSelectMenuInteraction, UserSelectMenuInteraction, ChannelSelectMenuInteraction, MentionableSelectMenuInteraction, ModalSubmitInteraction, ButtonInteraction } from "discord.js";
import getDifference from "./util/getDifference.ts";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import update from "./commands/update/update.ts";
import sql from "./util/database.ts";
import config from "./util/config.ts";
import dotenv from "dotenv";
import importCommandsToClient from "./util/importCommandsToClient.ts";
import type { SubInteractionResponse } from "./util/types/commandTypes.ts";
dotenv.config();

const client: Client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.chatInputCommandInteractionResponses = new Collection();
client.chatInputCommandInteractionResponses = new Collection();
client.stringSelectMenuInteractionResponses = new Collection();
client.roleSelectMenuInteractionResponses = new Collection();
client.userSelectMenuInteractionResponses = new Collection();
client.channelSelectMenuInteractionResponses = new Collection();
client.mentionableSelectMenuInteractionResponses = new Collection();
client.modalSubmitInteractionResponses = new Collection();
client.buttonInteractionResponses = new Collection();

client.once(Events.ClientReady, async (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	await importCommandsToClient(readyClient);
	main();
});
client.login(process.env.DISCORD_TOKEN);

client.on(Events.Error, (err: Error) => {
	console.error(err);
	// process.exit();
});

async function main(): Promise<void> {
	// Most of this is from discord.js
	client.on(
		Events.InteractionCreate,
		async (interaction: BaseInteraction) => {
			if (interaction.isChatInputCommand()) {
				const command =
					interaction.client.chatInputCommandInteractionResponses.get(
						interaction.commandName
					);

				if (!command) {
					console.error(
						`No command matching ${interaction.commandName} was found.`
					);
					interaction.reply({
						content:
							"We're sorry! There was an error and the command could not be called. Please make a bug report as soon as possible.",
						flags: MessageFlags.Ephemeral,
					});
					return;
				}

				await command.execute(interaction).catch((error: Error) => {
					interactionError(interaction, error);
				});
			} else if (interaction.isStringSelectMenu()) {
				//
			} else if (interaction.isRoleSelectMenu()) {
				//
			} else if (interaction.isUserSelectMenu()) {
				//
			} else if (interaction.isChannelSelectMenu()) {
				//
			} else if (interaction.isMentionableSelectMenu()) {
				//
			} else if (interaction.isModalSubmit()) {
				//
			} else if (interaction.isButton()) {
				const funct = interaction.client.buttonInteractionResponses.get(
					interaction.customId
				);

				console.log(funct);
				if (!funct) {
					console.error(
						`No command with customId ${interaction.customId} was found.`
					);
					interaction.reply({
						content:
							"We're sorry! There was an error and the command could not be called. Please make a bug report as soon as possible.",
						flags: MessageFlags.Ephemeral,
					});
					return;
				}

				await funct(interaction).catch((error: Error) => {
					interactionError(interaction, error);
				});
			}
		}
	);
}

/**
 * ONLY USED AS A TEMPLATE. Does something.
 */
function doSomething() {
	console.log("did something");
}

async function interactionError(
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
		await interaction.followUp({
			content:
				"We're sorry! There was an error while executing this command!",
			flags: MessageFlags.Ephemeral,
		});
	} else {
		await interaction.reply({
			content:
				"We're sorry! There was an error while executing this command!",
			flags: MessageFlags.Ephemeral,
		});
	}
}
