/*

TODO: 
-Add SQL support. 
-Consider adding ratelimiting (in case people update too fast; don't want to oversaturate the db)

*/

// Declare this so client.commands exists
declare module "discord.js" {
	export interface Client {
		commands: Collection<string, any>;
	}
}

/* prettier-ignore */
import { Client, Events, GatewayIntentBits, Collection, MessageFlags } from "discord.js";
import getDifference from "./util/getDifference.ts";
import path from "node:path";
import fs from "node:fs";
// import { fileURLToPath } from "node:url";
import update from "./commands/update/update.ts";
import sql from "./util/database.ts";
import config from "./util/config.ts";
import dotenv from "dotenv";
dotenv.config();

const client: Client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	client.commands.set(update.data.name, update);
	main();
});
client.login(process.env.DISCORD_TOKEN);

//

//

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".ts"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
}

client.on(Events.Error, (err: Error) => {
	console.error(err);
	// process.exit();
});

async function main(): Promise<void> {
	// Most of this is from discord.js
	client.on(Events.InteractionCreate, async (interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(
			interaction.commandName
		);

		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`
			);
			interaction.reply({
				content:
					"We're sorry! There was an error and the command could not be called.",
				flags: MessageFlags.Ephemeral,
			});
			return;
		}

		await command.execute(interaction).catch(async (error: Error) => {
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
		});
	});
}

/**
 * ONLY USED AS A TEMPLATE. Does something.
 */
function doSomething() {
	console.log("did something");
}
