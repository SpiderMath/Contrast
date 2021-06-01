import { stripIndents } from "common-tags";
import { Command } from "../../Types/Command";

const PingCommand: Command = {
	name: "ping",
	description: "Gets the API Latency of the Bot",
	async run(client, message) {
		let PingEmbed = client
			.embed(message.author)
			.setTitle("API Latency")
			.setDescription(`${client.emotes.loading} Pinging...`);

		const msg = await message.channel.send(PingEmbed);

		PingEmbed = client
			.embed(message.author)
			.setTitle("API Latency")
			.setDescription(stripIndents`
				Websocket Ping 💻 : ${client.ws.ping} ms
				Heartbeart 💞: ${msg.createdTimestamp - message.createdTimestamp} ms
			`);

		msg.edit(PingEmbed);
	},
};

export default PingCommand;