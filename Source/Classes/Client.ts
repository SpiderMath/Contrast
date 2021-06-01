import { Client, Collection, Intents, User } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Command } from "../Types/Command";
import { Config } from "../Types/Config";
import Logger from "../Helpers/Logger";
import { Event } from "../Types/Event";
import { stripIndents } from "common-tags";

export default class GasperClient extends Client {
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public logger = Logger;
	// @ts-ignore
	public prefixes: string[];
	public messages = {
		error: (err: Error) => stripIndents`
		${this.emotes.error} Something went wrong while executing the command! Please try again later!
		Error: ${err.message}
		`,
	};
	// @ts-ignore
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
		this._loadCommands(config.commandDir);
		this._loadEvents(config.eventDir);

		// Prefix handler
		if(typeof config.prefixes === "string") config.prefixes = [config.prefixes];

		super.login(config.token);

		this.on("ready", () => {
			Object
				.keys(this.emotes)
				.forEach(emoteName => {
					// @ts-ignore
					const emojiID: string | undefined = config.emotes[emoteName];

					if(!emojiID) throw new Error(`Emoji ${emoteName} not provided`);

					// @ts-ignore
					this.emotes[emoteName] = this.emojis.cache.get(emojiID);

					this.logger.success("client/emotes", `Loaded emote: ${emoteName}`);
				});

			// @ts-ignore
			this.owner = this.users.cache.get(config.ownerID);

			// @ts-ignore
			config.prefixes.push(`<@${this.user?.id}>`);
			// @ts-ignore
			config.prefixes.push(`<@!${this.user?.id}>`);

			// @ts-ignore
			this.prefixes = config.prefixes;
		});
	}

	private _loadCommands(commandDir: string) {
		readdirSync(commandDir)
			.forEach(async (dir) => {
				const files = readdirSync(join(commandDir, dir));

				for(const file of files) {
					const pseudoPull = await import(join(commandDir, dir, file));

					const pull: Command = pseudoPull.default;

					pull.category = dir;

					this.commands.set(pull.name.toLowerCase(), pull);

					if(pull.aliases) for(const alias of pull.aliases) this.aliases.set(pull.name.toLowerCase(), alias.toLowerCase());

					this.logger.success("client/commands", `Loaded command ${pull.name.toLowerCase()} successfully!`);
				}
			});
	}

	private _loadEvents(eventDir: string) {
		readdirSync(eventDir)
			.forEach(async (file) => {
				const pseudoPull = await import(join(eventDir, file));

				const pull: Event = pseudoPull.default;

				this.on(pull.name, pull.run.bind(null, this));

				this.logger.success("client/events", `Listening for event ${pull.name} 👂`);
			});
	}
};