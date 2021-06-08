import CommandConfig from "../Types/CommandConfig";
import ContrastingClient from "./Client";

class BaseCommand {
	public client: ContrastingClient;
	public config: CommandConfig;

	// Takes in parameters
	constructor(client: ContrastingClient) {
		this.client = client;
		this.config = {
			name: "",
			description: "",
			aliases: [],
			location: `${__filename}`,
		};

		Object.defineProperty(
			this,
			"client",
			{
				writable: true,
				enumerable: false,
				configurable: true,
			},
		);
	}

	public configure(configuration: CommandConfig) {
		Object.assign(
			this.config,
			configuration,
		);

		return this;
	}
};

export default BaseCommand;