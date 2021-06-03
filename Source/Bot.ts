import { Intents } from "discord.js";
import { config } from "dotenv";
import { join } from "path";
import GasperClient from "./Base/Client";

config();

new GasperClient({
	disableMentions: "everyone",
	ws: {
		properties: {
			$browser: "Discord Android",
		},
		intents: Intents.ALL,
	},
})
	.start({
		eventDir: join(__dirname, "Events"),
		commandDir: join(__dirname, "Commands"),
	});