import { stripIndents } from "common-tags";
import { MessageEmbed } from "discord.js";
import { Command } from "../../Types/Command";

const PingCommand: Command = {
	name: "ping",
	description: "Gets the API Latency of the Bot",
	async run(client, message) {
		const msg = await message.channel.send("Pinging...");

		const PingEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setTitle("API Latency")
			.setDescription(stripIndents`
				The Websocket Ping of the Bot is: ${client.ws.ping} ms
				The Heartbeart 💝 of the bot is: ${msg.createdTimestamp - message.createdTimestamp} ms
			`)
			.setColor("GREEN");

		message.channel.send(PingEmbed)
			.then(() => msg.delete());
	},
};

export default PingCommand;