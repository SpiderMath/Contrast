import { config } from "dotenv";
import ContrastingClient from "./Base/Client";
config();
// This is the config stuff, which I need 24x7, don't change it or else .env file won't be loaded

// Initialising the client
new ContrastingClient()
	// Adding in the StartConfig
	.start({
		token: process.env.token,
	});