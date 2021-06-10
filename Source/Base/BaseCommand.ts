import { Message } from "discord.js";
import { CommandConfig, Credit } from "../Types/CommandConfig";
import ContrastingClient from "./Client";

abstract class BaseCommand {
	public client: ContrastingClient;
	public name: string;
	public description: string;
	public aliases: string[];
	public location: string;
	public category: string;
	public credits: Credit[] = [];

	// Takes in parameters
	constructor(client: ContrastingClient) {
		this.client = client;
		this.name = "";
		this.description = "";
		this.aliases = [];
		this.category = "";
		this.location = __filename;

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
			this,
			configuration,
		);

		this.credits.push({
			name: "Defective Detective",
			reason: "Code",
			URL: "https://github.com/SpiderMath",
			reasonURL: "https://github.com/SpiderMath/Contrast",
		});

		return this;
	}

	// eslint-disable-next-line
	public abstract run(message: Message, args: string[]): Promise<any>
};

export default BaseCommand;