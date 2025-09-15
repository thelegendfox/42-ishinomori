import { Client, Collection } from "discord.js";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import type { Command, SubInteractionResponse } from "./types/commandTypes.ts";

/**
 * Imports all commands/subcommands/special responses to the client.
 * @param client - The client, when ready, from discord.js. Must be extended.
 */
export default async function importCommandsToClient(
	client: Client<true>
): Promise<void> {
	const foldersPath = "./commands/";
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith(".ts"));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const fileUrl = pathToFileURL(filePath).href;
			let command: Command = await (async () => {
				const file = await import(fileUrl);
				return file.default ?? file;
			})();
			// Set a new item in the Collection with the key as the command name and the value as the exported module

			if (command.notSlashCommand) {
				console.log(
					`Skipping command at ${filePath} as it has the notSlashCommand property.`
				);
			} else if (command.data && command.execute) {
				client.chatInputCommandInteractionResponses.set(
					command.data.name,
					command
				);
				console.log(`Added command ${command.data.name} to cache.`);
			} else if (!command.data || !command.execute) {
				console.warn(
					`The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}

			if (command.stringSelectMenuResponses) {
				addCommandsToCollection(
					command.stringSelectMenuResponses,
					client.stringSelectMenuInteractionResponses,
					"stringSelectMenuResponse"
				);
			}

			if (command.roleSelectMenuResponses) {
				addCommandsToCollection(
					command.roleSelectMenuResponses,
					client.roleSelectMenuInteractionResponses,
					"roleSelectMenuResponse"
				);
			}

			if (command.userSelectMenuResponses) {
				addCommandsToCollection(
					command.userSelectMenuResponses,
					client.userSelectMenuInteractionResponses,
					"userSelectMenuResponse"
				);
			}

			if (command.channelSelectMenuResponses) {
				addCommandsToCollection(
					command.channelSelectMenuResponses,
					client.channelSelectMenuInteractionResponses,
					"channelSelectMenuResponse"
				);
			}

			if (command.mentionableSelectMenuResponses) {
				addCommandsToCollection(
					command.mentionableSelectMenuResponses,
					client.mentionableSelectMenuInteractionResponses,
					"mentionableSelectMenuResponse"
				);
			}

			if (command.modalSubmitResponses) {
				addCommandsToCollection(
					command.modalSubmitResponses,
					client.modalSubmitInteractionResponses,
					"modalSubmitResponse"
				);
			}

			if (command.buttonResponses) {
				addCommandsToCollection(
					command.buttonResponses,
					client.buttonInteractionResponses,
					"buttonResponse"
				);
			}
		}
	}
}

/**
 * Adds an array of commands/interaction responses to a collection.
 * @private
 * @param array - The array with items to iterate through & add to the collection.
 * @param collection - The collection to add the array's items to.
 * @param typeOfCommand - A string describing what the commands are, e.g. "selectMenuResponses"
 */
function addCommandsToCollection(
	array: Array<any>,
	collection: Collection<any, any>,
	typeOfCommand: string
) {
	array.forEach((response: SubInteractionResponse) => {
		if (!response.id || !response.function) {
			console.log(
				`Command with type ${typeOfCommand} is missing a required id or function property. If the ID exists, it will be shown here: ${response.id}`
			);
			return;
		}
		collection.set(response.id, response.function);
		console.log(
			`Added ${typeOfCommand} to client's cache [id ${response.id}].`
		);
	});
}
