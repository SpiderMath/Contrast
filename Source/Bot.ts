import GasperClient from "./Classes/Client";
import { config } from "dotenv";
config();

new GasperClient()
	.start({
		token: process.env.TOKEN,
		commandDir: `${__dirname}/Commands`,
		eventDir: `${__dirname}/Events`,
		prefixes: ["`", "*"],
		emotes: {
			error: "840147176360378388",
			success: "840147155112165406",
			loading: "840147214193917963",
		},
	});