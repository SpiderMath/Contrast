import { Message } from "discord.js";
import { join } from "path";
import BaseCommand from "../../Base/BaseCommand";
import ContrastingClient from "../../Base/Client";
import { Log } from "../../Base/Logger";

export default class ViewLogCountCommand extends BaseCommand {
	constructor(client: ContrastingClient) {
		super(client, {
			name: "viewlogcount",
			description: "Gets the log count of the bot",
			aliases: ["view-log-count", "log-count", "logcount"],
			devOnly: true,
		});
	}

	async run(message: Message) {
		const logs = this.client.loadJSON(join(__dirname, "../../../Server/Logs.json")) as Log[];

		return message.channel.send(`${this.client.emotes.success} There are currently ${logs.length} logs in Logs.json`);
	}
};