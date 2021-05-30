import GasperClient from "./Classes/Client";
import { config } from "dotenv";
config();

new GasperClient()
	.start({
		token: process.env.TOKEN,
		commandDir: `${__dirname}/Commands`,
		eventDir: `${__dirname}/Events`,
		prefixes: ["`", "*"],
	});