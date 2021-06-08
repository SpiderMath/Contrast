import { Collection } from "discord.js";
import BaseCommand from "./BaseCommand";
import ContrastingClient from "./Client";

export default class CommandManager {
	public client: ContrastingClient;
	public cache: Collection<string, BaseCommand> = new Collection();
	public aliasCache: Collection<string, string> = new Collection();

	constructor(client: ContrastingClient) {
		this.client = client;
	}

	register(command: BaseCommand) {
		this.cache.set(command.config.name.toLowerCase(), command);
		command.config.aliases?.forEach(alias => this.registerAlias(
			command.config.name, alias,
		));
		return this;
	}

	registerAlias(name: string, alias: string) {
		this.aliasCache.set(alias.toLowerCase(), name.toLowerCase());
		return this;
	}

	unregister(name: string, mode: "alias" | "command" = "command") {
		if(mode === "command") return this.cache.delete(name);
		if(mode === "alias") return this.aliasCache.delete(name);
	}
};