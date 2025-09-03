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
// import path from "node:path";
// import fs from "node:fs";
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

client.on(Events.Error, (err: Error) => {
	console.error(err);
	// process.exit();
});

async function main(): Promise<void> {
	client.on(Events.GuildBanAdd, (ban) => {
		//
	});
	client.on(Events.GuildBanRemove, (ban) => {
		//
	});
	client.on(Events.GuildMemberAdd, (member) => {
		//
	});
	client.on(Events.GuildMemberRemove, (member) => {
		//
	});
	client.on(Events.UserUpdate, (oldUser, newUser) => {
		/*

        Tracks the following:
            -Updated avatars
            -Updated usernames (NOT global display names)

        */

		// if(oldUser.bot || newUser.bot) return;
		// Turn back on in prod

		if (oldUser.avatar !== newUser.avatar) {
			console.log(
				`User avatar hash changed from "${oldUser.avatar}" to "${newUser.avatar}" (user ID: "${newUser.id}")`
			);
		}
		if (oldUser.username !== newUser.username) {
			console.log(
				`User username changed from "${oldUser.username}" to "${newUser.username}" (user ID: "${newUser.id}")`
			);
		}
	});
	client.on(Events.GuildMemberUpdate, (oldMember, newMember) => {
		/*

        Tracks the following:
            -Updated roles
            -Updated display names

        */

		// if(oldUser.bot || newUser.bot) return;
		// Turn back on in prod

		let oldRoles: Map<String, String> = new Map();
		let newRoles: Map<String, String> = new Map();

		// Do this to easily compare old and new roles (@see: getDifferences)
		oldMember.roles.cache.forEach((role) =>
			oldRoles.set(role.id, role.name)
		);
		newMember.roles.cache.forEach((role) =>
			newRoles.set(role.id, role.name)
		);

		const differentRoles = getDifference(oldRoles, newRoles) ?? [];

		// Log all differences in roles.
		for (const role of differentRoles) {
			if (!differentRoles) break;

			const id = role[0];
			const info = {
				name: role[1][0],
				action: role[1][1],
			};
			console.log(`Role ${info.action}: ${info.name} (${id})`);
		}

		// Log differences in display names (only if there are differences)
		if (oldMember.displayName !== newMember.displayName)
			console.log(
				`Member display name changed from "${oldMember.displayName}" to "${newMember.displayName}" (Member ID: "${newMember.id}")`
			);
	});

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
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: "There was an error while executing this command!",
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.reply({
					content: "There was an error while executing this command!",
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	});
}

/**
 * ONLY USED AS A TEMPLATE. Does something.
 */
function doSomething() {
	console.log("did something");
}
