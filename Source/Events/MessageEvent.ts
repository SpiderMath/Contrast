import { stripIndents } from "common-tags";
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
		const args = message.content.slice(prefix.length).split(/ +/g);
		// Using RegEx to remove extra spaces ^^^

		const commandName = args.shift()?.toLowerCase();

		// @ts-ignore
		const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

		if(!command) return;

		if(command.ownerOnly && client.owner.id === message.author.id) {
			return message.channel.send(stripIndents`
				${client.emotes.error} To use this command, you have to be as **crazy** & **nerdy** as my owner ${client.owner.tag}
			`);
		}

		try {
			command.run(client, message, args);
		}
		catch(err) {
			client.logger.error(`client/commands/${command.name}`, err.message);
			return message.channel.send(client.messages.error(err));
		}
	},
};

export default MessageEvent;