import { Client, Collection, Intents, User } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Command } from "../Types/Command";
import { Config } from "../Types/Config";
import Logger from "../Helpers/Logger";
import { Event } from "../Types/Event";
import { stripIndents } from "common-tags";

class GasperClient extends Client {
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public logger = Logger;
	public prefixes: string[] = [];
	public messages = {
		error: (err: Error) => stripIndents`
		${this.emotes.error} Something went wrong while executing the command! Please try again later!
		Error: ${err.message}
		`,
	};
	public emotes = { success: "", error: "", loading: "" };
	// @ts-ignore
	public owner: User;
	public autoReactOnMentionCooldown: Collection<string, number> = new Collection();

	constructor() {
		super({
			ws: {
				intents: Intents.ALL,
				properties: { $browser: "Discord Android" },
			},
			disableMentions: "everyone",
		});
	}

	start(config: Config) {
		// Loads commands
		this._loadCommands(config.commandDir);
		// Loads the events the bot listens for
		this._loadEvents(config.eventDir);

		// Prefix handler
		if(typeof config.prefixes === "string") config.prefixes = [config.prefixes];

		// Login
		super.login(config.token);

		this.on("ready", () => {
			Object
				.keys(this.emotes)
				// This gives me the list of emotes in the client, like the names, so I get an Array of ["success", "error", ...]
				.forEach(emoteName => {
					// emoteName is the requiredProperty name
					// @ts-ignore
					const emojiID: string | undefined = config.emotes[emoteName];

					if(!emojiID) throw new Error(`Emoji ${emoteName} not provided`);

					// @ts-ignore
					this.emotes[emoteName] = emojiID.length <= 3 ? emojiID : this.emojis.cache.get(emojiID);
					// Checking emojiID length, if less than 3 then I get a unicode emoji. So I'll take that in. If it is longer then I'll just get the cache

					// @ts-ignore
					if(!this.emotes[emoteName]) throw new Error(`${emojiID} is not a valid emoji!`);
					// Checking if there was an emote found for the given ID

					this.logger.success("client/emotes", `Loaded emote: ${emoteName} 👀`);
					// Message signifying the loading
				});

			// Setting the owner so that the user is in the client, and since the client has logged it already
			// @ts-ignore
			this.owner = this.users.cache.get(config.ownerID);

			// @ts-ignore
			config.prefixes.push(`<@${this.user?.id}>`);
			// @ts-ignore
			config.prefixes.push(`<@!${this.user?.id}>`);
			// Getting the mention prefixes in. Since I agreed to take in string or string[] in config, I'm using @ts-ignore

			// @ts-ignore
			this.prefixes = config.prefixes;
			// Settings client.prefixes, but again that type thingy :\
		});
	}

	private _loadCommands(commandDir: string) {
		readdirSync(commandDir)
			.forEach(async (dir) => {
				const files = readdirSync(join(commandDir, dir));

				for(const file of files) {
					const pseudoPull = await import(join(commandDir, dir, file));
					// Imports the stuff exported from those files

					const pull: Command = pseudoPull.default;
					// Since I export the command as default export, I will get pseudoPull.default to get the default export

					pull.category = dir;
					// Setting the category

					// Credits handler
					if(!pull.credits) pull.credits = [];

					pull.credits.push({
						name: "Defective Detective",
						reason: "Code",
						mainURL: "https://github.com/SpiderMath",
						reasonURL: "https://github.com/SpiderMath/Gasper",
					});
					// Pushing the credit of mine 😸 because I need some credit for coding too 🙄

					// Setting the command 😀
					this.commands.set(pull.name.toLowerCase(), pull);

					// Check for Aliases -> If yes then loop through every single alias 🤔
					if(pull.aliases) for(const alias of pull.aliases) this.aliases.set(pull.name.toLowerCase(), alias.toLowerCase());

					// Notifying myself that it did load 😀
					this.logger.success("client/commands", `Loaded command ${pull.name.toLowerCase()} successfully! 💪`);
				}
			});
	}

	private _loadEvents(eventDir: string) {
		readdirSync(eventDir)
			.forEach(async (file) => {
				const pseudoPull = await import(join(eventDir, file));

				const pull: Event = pseudoPull.default;
				// Same reason for .default as the previous command stuff

				this.on(pull.name, pull.run.bind(null, this));
				// .bind to add client as an arg, a mandatory one

				this.logger.success("client/events", `Listening for event ${pull.name} 👂`);
				// Notifying myself that it did load 😀
			});
	}
};

export default GasperClient;