import { Client, Intents } from "discord.js";
import StartConfig from "../Types/StartConfig";

class ContrastingClient extends Client {
	constructor() {
		super({
			intents: Intents.ALL,
			ws: {
				properties: { $browser: "Discord Android" },
			},
			allowedMentions: {
				repliedUser: false,
				parse: [
					"everyone",
					"roles",
					"users",
				],
			},
		});
	}

	async start(config: StartConfig) {
		this.login(config.token);
	}
};

export default ContrastingClient;