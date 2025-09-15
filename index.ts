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
// import getDifference from "./util/getDifference.ts";
// import path from "node:path";
// import fs from "node:fs";
// import { fileURLToPath, pathToFileURL } from "node:url";
// import update from "./commands/update/update.ts";
// import sql from "./util/database.ts";
// import config from "./util/config.ts";
import Ansi, { AnsiRaw } from "./util/Ansi.ts";
import interactionError from "./util/errors/interactionError.ts";
import dotenv from "dotenv";
import importCommandsToClient from "./util/importCommandsToClient.ts";
import type {
	Command,
	SubInteractionResponse,
} from "./util/types/commandTypes.ts";
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
	console.log(`${Ansi.Info} Logged in as ${readyClient.user.tag}.`);
	console.log(`${Ansi.Info} Importing commands to client cache...`);

	await importCommandsToClient(readyClient);

	console.log(`${Ansi.Info} All responses saved to cache.`);
	console.log(
		`${Ansi.Mngmt} Starting function ${AnsiRaw.Foreground.Gray}main()${AnsiRaw.Reset}...`
	);
	main();
});
client.login(process.env.DISCORD_TOKEN);

client.on(Events.Error, (err: Error) => {
	console.error(Ansi.Error, err);
	// process.exit();
});

async function main(): Promise<void> {
	client.on(
		Events.InteractionCreate,
		async (interaction: BaseInteraction) => {
			if (interaction.isChatInputCommand()) {
				console.log(
					`\n${Ansi.Cmd} Received Chat Input Command Interaction`
				);
				const command =
					interaction.client.chatInputCommandInteractionResponses.get(
						interaction.commandName
					);

				if (!command) {
					console.error(
						`${Ansi.Error} No command matching ${interaction.commandName} was found.`
					);
					interaction.reply({
						content:
							"We're sorry! There was an error and the command could not be called. Please make a bug report as soon as possible.",
						flags: MessageFlags.Ephemeral,
					});
					return;
				}

				console.log(
					`${Ansi.Cmd} Attempting to execute command ${interaction.commandName}...`
				);

				await command.execute(interaction).catch((error: Error) => {
					interactionError(interaction, error);
					return;
				});

				console.log(
					`${Ansi.Cmd} Successfully executed command ${interaction.commandName}!`
				);
			} else if (interaction.isStringSelectMenu()) {
				respondToSpecialInteraction(
					interaction as StringSelectMenuInteraction
				);
			} else if (interaction.isRoleSelectMenu()) {
				respondToSpecialInteraction(
					interaction as RoleSelectMenuInteraction
				);
			} else if (interaction.isUserSelectMenu()) {
				respondToSpecialInteraction(
					interaction as UserSelectMenuInteraction
				);
			} else if (interaction.isChannelSelectMenu()) {
				respondToSpecialInteraction(
					interaction as ChannelSelectMenuInteraction
				);
			} else if (interaction.isMentionableSelectMenu()) {
				respondToSpecialInteraction(
					interaction as MentionableSelectMenuInteraction
				);
			} else if (interaction.isModalSubmit()) {
				respondToSpecialInteraction(
					interaction as ModalSubmitInteraction
				);
			} else if (interaction.isButton()) {
				respondToSpecialInteraction(interaction as ButtonInteraction);
			}
		}
	);
	console.log(
		`${Ansi.Info} Function ${AnsiRaw.Foreground.Gray}main()${AnsiRaw.Reset} has started.`
	);
}

/**
 * ONLY USED AS A TEMPLATE. Does something.
 */
function doSomething() {
	console.log("did something");
}

async function respondToSpecialInteraction(
	interaction:
		| StringSelectMenuInteraction
		| RoleSelectMenuInteraction
		| UserSelectMenuInteraction
		| ChannelSelectMenuInteraction
		| MentionableSelectMenuInteraction
		| ModalSubmitInteraction
		| ButtonInteraction
) {
	let cacheLocation;

	if (interaction instanceof StringSelectMenuInteraction) {
		console.log(`\n${Ansi.Cmd} Received String Select Menu Interaction`);
		cacheLocation = client.stringSelectMenuInteractionResponses;
	} else if (interaction instanceof RoleSelectMenuInteraction) {
		console.log(`\n${Ansi.Cmd} Received Role Select Menu Interaction`);
		cacheLocation = client.roleSelectMenuInteractionResponses;
	} else if (interaction instanceof UserSelectMenuInteraction) {
		console.log(`\n${Ansi.Cmd} Received User Select Menu Interaction`);
		cacheLocation = client.userSelectMenuInteractionResponses;
	} else if (interaction instanceof ChannelSelectMenuInteraction) {
		console.log(`\n${Ansi.Cmd} Received Channel Select Menu Interaction`);
		cacheLocation = client.channelSelectMenuInteractionResponses;
	} else if (interaction instanceof MentionableSelectMenuInteraction) {
		console.log(
			`\n${Ansi.Cmd} Received Mentionable Select Menu Interaction`
		);
		cacheLocation = client.mentionableSelectMenuInteractionResponses;
	} else if (interaction instanceof ModalSubmitInteraction) {
		console.log(`\n${Ansi.Cmd} Received Modal Submit Interaction`);
		cacheLocation = client.modalSubmitInteractionResponses;
	} else if (interaction instanceof ButtonInteraction) {
		console.log(`\n${Ansi.Cmd} Received Button Interaction`);
		cacheLocation = client.buttonInteractionResponses;
	} else
		return interactionError(
			interaction,
			new Error(
				"respondToInteraction suffered a fatal error: interaction had an unknown type"
			)
		);

	if (!cacheLocation)
		return interactionError(
			interaction,
			new Error(
				"respondToInteraction suffered a fatal error: cacheLocation was undefined"
			)
		);

	const funct: SubInteractionResponse["function"] = cacheLocation.get(
		interaction.customId
	);

	if (!funct) {
		console.error(
			`${Ansi.Error} No command with customId ${interaction.customId} was found.`
		);
		interaction
			.reply({
				content:
					"We're sorry! There was an error and the command could not be called. Please make a bug report as soon as possible.",
				flags: MessageFlags.Ephemeral,
			})
			.catch((error) => interactionError(interaction, error));
		return;
	}

	console.log(
		`${Ansi.Cmd} Attempting to respond to command with ID ${interaction.customId}...`
	);

	await funct(interaction).catch((error: Error) => {
		interactionError(interaction, error);
		return;
	});

	console.log(
		`${Ansi.Cmd} Successfully responded to command with ID ${interaction.customId}!`
	);
}

/*
ChatInputCommandInteraction
StringSelectMenuInteraction
RoleSelectMenuInteraction
ChannelSelectMenuInteraction
MentionableSelectMenuInteraction
ModalSubmitInteraction
ButtonInteraction
*/
