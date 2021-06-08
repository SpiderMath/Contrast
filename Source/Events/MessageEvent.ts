import { Message } from "discord.js";
import BaseEvent from "../Base/BaseEvent";
import ContrastingClient from "../Base/Client";

export default class MessageEvent extends BaseEvent {
	constructor(client: ContrastingClient) {
		super("message", client);
	}

	async run(message: Message) {
		// Checking if author is a bot
		if(message.author.bot) return;
	}
};