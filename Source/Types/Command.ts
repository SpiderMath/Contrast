import { Message } from "discord.js";
import GasperClient from "../Classes/Client";

interface Command {
	name: string,
	description: string,
	aliases?: string[],
	run: RunFunction,
	category?: string,
	ownerOnly?: boolean,
};

interface RunFunction {
	// eslint-disable-next-line
	(client: GasperClient, message: Message, args: string[]): Promise<any>,
};

export { Command };