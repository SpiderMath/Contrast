// Configuration stuff
import { config } from "dotenv";
import { join } from "path";
config();

import ContrastingClient from "./Base/Client";

new ContrastingClient()
	.start({
		token: process.env.TOKEN,
		commandDir: join(__dirname, "Commands"),
		eventDir: join(__dirname, "Events"),
		prefixes: ["`"],
		devs: [
			`${BigInt("839367177899737108")}`,
		],
	});