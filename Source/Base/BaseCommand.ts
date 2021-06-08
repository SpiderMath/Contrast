import { Message } from "discord.js";
import CommandConfig from "../Types/CommandConfig";
import ContrastingClient from "./Client";

abstract class BaseCommand {
	public client: ContrastingClient;
	public name: string;
	public description: string;
	public aliases: string[];

	// Takes in parameters
	constructor(client: ContrastingClient) {
		this.client = client;
		this.name = "";
		this.description = "";
		this.aliases = [];

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

		return this;
	}

	// eslint-disable-next-line
	public abstract run(message: Message, args: string[]): Promise<any>
};

export default BaseCommand;