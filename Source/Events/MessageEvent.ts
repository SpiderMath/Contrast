import { Message } from "discord.js";
import { Event } from "../Types/Event";

const MessageEvent: Event = {
	name: "message",
	async run(client, message: Message) {
		return "Will work later, I'm lazy";
	},
};

export default MessageEvent;