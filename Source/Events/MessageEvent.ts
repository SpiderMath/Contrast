import { Message } from "discord.js";
import { Event } from "../Types/Event";

const MessageEvent: Event = {
	name: "message",
	async run(client, message: Message) {
		// Filtering Bot Messages out
		if(message.author.bot) return;

		/* Plugins will go here*/

		// Checking if message starts with any of the prefixes
		let prefix: string = "";

		for(const testingPrefix of client.prefixes) {
			if(message.content.toLowerCase().startsWith(testingPrefix.toLowerCase())) {
				prefix = testingPrefix;
				break;
			}
		}

		if(!prefix.length) return;

		// Getting content APART from prefix
	},
};

export default MessageEvent;