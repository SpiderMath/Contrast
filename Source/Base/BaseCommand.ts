import { Message, PermissionResolvable } from "discord.js";
import { CommandConfig, Credit } from "../Types/CommandConfig";
import ContrastingClient from "./Client";

export default abstract class BaseCommand {
	public client: ContrastingClient;
	// @ts-ignore
	public name: string;
	// @ts-ignore
	public description: string;
	public credits: Credit[] = [];
	public guildOnly: boolean = true;
	public devOnly: boolean = true;
	public cooldown: number = 3;
	public minArgs: number = 0;
	public clientPermissions: PermissionResolvable[] = [];
	public userPermissions: PermissionResolvable[] = [];
	public aliases: string[] = [];
	public nsfw: boolean = false;
	public category: string = "";

	constructor(client: ContrastingClient, config: CommandConfig) {
		this.client = client;

		Object.defineProperty(
			this,
			"client",
			{
				enumerable: false,
				writable: true,
				configurable: true,
			},
		);

		Object
			.assign(
				this,
				config,
			);
	}

	// eslint-disable-next-line
	abstract run(message: Message, args: string[]): Promise<any>;
};