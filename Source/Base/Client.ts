import { Client, Collection, Intents } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import StartConfig from "../Types/StartConfig";

class ContrastingClient extends Client {
	public commands = new Collection();

	constructor() {
		super({
			// Enables all the intents, because WHY NOT?
			intents: Intents.ALL,
			// WS means Websocket lol
			ws: {
				// Setting Browser as Discord Android -> Will look as if the bot is on Mobile 📱
				properties: { $browser: "Discord Android" },
			},
			// Allowed mentions, does as the thing says?
			allowedMentions: {
				// Replied User is ponged? I think he/she/they SHOULD NOT be ponged, so Yeah...
				repliedUser: false,
				// Types of mentions parsed 😀
				parse: [
					"everyone",
					"roles",
					"users",
				],
			},
		});
	}

	async start(config: StartConfig) {
		await this._loadCommands(config.commandDir);
		this.login(config.token);
	}

	private async _loadCommands(commandDir: string) {
		readdirSync(commandDir)
		// This returns an array (string[]) of all the files & directories in commandDir
			.forEach(async (dir) => {
				// Dir is the sub directory name in commandDir, I am not gonna add any files in the command Directory Lol
				const files = readdirSync(join(commandDir, dir));
				// Files is an array of all the file names in the subDirectory of commands

				for(const file of files) {
					// File is a string, which is a FILE NAME IN THE SUB DIRECTORY
					const pseudoPull = await import(join(commandDir, dir, file));
					// Ah yes, import is a promise, unlike Node.js where it is require() OOF
					// It is named Pseudopull because I'll be pulling the actual stuff using .default

					const pull = new pseudoPull.default(this);
					// This is what I was talking about! Now pull's gonna be a class instance (needs client as param 😸), which extends our beloved BaseCommand 🤔

					this.commands.set(pull.name.toLowerCase(), pull);
					// Setting it into our commands list properly 💃
				}
			});
	}
};

export default ContrastingClient;