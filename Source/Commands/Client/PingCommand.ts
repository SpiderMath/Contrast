import BaseCommand from "../../Base/BaseCommand";
import ContrastingClient from "../../Base/Client";

export default class PingCommand extends BaseCommand {
	constructor(client: ContrastingClient) {
		super(client);
		this.configure({
			name: "ping",
			description: "Gets API Latency of Bot",
			aliases: [
				"api-latency",
			],
		});
	}

	public async run() {
		console.log("Jello World 🍲");
	}
};