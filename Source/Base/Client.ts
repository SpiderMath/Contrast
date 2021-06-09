import { Client, Intents } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import StartConfig from "../Types/StartConfig";
import Logger from "../Util/Logger";
import BaseCommand from "./BaseCommand";
import BaseEvent from "./BaseEvent";
import CommandManager from "./CommandManager";

class ContrastingClient extends Client {
	public commands: CommandManager;
	public logger = Logger;
	public prefixes: string[] = [];

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

		// Assigning Commands to CommandManager
		this.commands = new CommandManager(this);
	}

	async start(config: StartConfig) {
		this.prefixes = config.prefixes;

		await this._loadEvents(config.eventDir);
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

					const pull = new pseudoPull.default(this) as BaseCommand;
					// This is what I was talking about! Now pull's gonna be a class instance (needs client as param 😸), which extends our beloved BaseCommand 🤔

					// Stuff you should always do 😬
					pull.category = dir;
					pull.location = join(commandDir, dir, file);

					this.commands.register(pull);
					// Setting it into our commands list properly 💃

					// Logging to let the dumb owner know that the command was loaded
					this.logger.success("client/commands", `Loaded Command ${pull.name}`);
				}
			});
	}

	private async _loadEvents(eventDir: string) {
		readdirSync(eventDir)
		// This returns an array (string[]) of all the files in Event Dir
			.forEach(async (fName) => {
				// fName as the name suggests is the File name lul
				const pseudoPull = await import(join(eventDir, fName));

				// Initialization
				const pull = new pseudoPull.default(this) as BaseEvent;

				// Listening for the event
				// @ts-ignore
				this.on(pull.name, async (...args: any[]) => await pull.run(...args));

				// Logging to let the dumb dev know that his event is being listened to
				this.logger.success("client/events", `Listening for Event ${pull.name}`);
			});
	}
};

export default ContrastingClient;