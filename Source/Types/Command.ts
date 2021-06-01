import { Message } from "discord.js";
import GasperClient from "../Classes/Client";

interface Command {
	name: string,
	description: string,
	aliases?: string[],
	run: RunFunction,
	category?: string,
	ownerOnly?: boolean,
	guildOnly?: boolean,
	credits?: Credit[],
};

interface Credit {
	name: string,
	reason: string,
	mainURL: string,
	reasonURL?: string,
};

interface RunFunction {
	// eslint-disable-next-line
	(client: GasperClient, message: Message, args: string[]): Promise<any>,
};

export { Command };