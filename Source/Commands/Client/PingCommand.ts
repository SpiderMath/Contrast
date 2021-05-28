import { Command } from "../../Types/Command";

const PingCommand: Command = {
	name: "ping",
	description: "Gets the API Latency of the Bot",
	run(client, message) {
		return message.channel.send(client.ws.ping);
	},
};

export default PingCommand;