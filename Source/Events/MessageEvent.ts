import { Message } from "discord.js";
import BaseEvent from "../Base/BaseEvent";
import ContrastingClient from "../Base/Client";

export default class MessageEvent extends BaseEvent {
	constructor(client: ContrastingClient) {
		super("message", client);
	}

	async run(message: Message) {
		// Checking if author is a bot
		// if(message.author.bot) return;

		// Will be used soon™
		let prefix = "";

		for(const pref of this.client.prefixes) {
			if(message.content.toLowerCase().startsWith(pref.toLowerCase())) {
				prefix = pref;
				break;
			}
		}

		if(prefix.length === 0) return;

		const args = message.content.slice(prefix.length).split(/ +/g);

		const commandName = args.shift()?.toLowerCase();

		// @ts-ignore
		const command = this.client.commands.get(commandName);

		if(!command) return;

		try {
			command.run(message, args);
		}
		catch(err) {
			this.client.logger.error("client/commands", `Error on command: ${command.name}\nError: ${err.message}`);
		}
	}
};