import { Client, Intents } from "discord.js";

export default class GasperClient extends Client {
	constructor() {
		super({
			ws: {
				properties: { $browser: "Discord Android" },
				intents: Intents.ALL,
			},
		});
	}
};