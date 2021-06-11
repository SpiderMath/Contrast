import { stripIndents } from "common-tags";
import { Message } from "discord.js";
import { join } from "path";
import BaseCommand from "../../Base/BaseCommand";
import ContrastingClient from "../../Base/Client";
import { Log } from "../../Base/Logger";

export default class FetchLogsCommand extends BaseCommand {
	constructor(client: ContrastingClient) {
		super(client, {
			name: "fetchlogs",
			description: "Fetches the logs for the bot",
			aliases: ["fetch-logs"],
			devOnly: true,
			guildOnly: true,
		});
	}

	async run(message: Message, args: string[]) {
		if(args[0] && !Number(args[0])) return message.channel.send(`${this.client.emotes.error} Log count has to be a number`);
		const logCount = Number(args[0]) || 5;
		const logs = (this.client.loadJSON(join(__dirname, "../../../Server/Logs.json")) as Log[]).sort((a, b) => b.id - a.id).slice(0, logCount).reverse();

		const logsEmbed = this.client.embed(message.author)
			.setTitle("Bot Logs")
			.setDescription(
				logs
					.map((log) => {
						return stripIndents`
							・**ID:** ${log.id}
							**Context:** ${log.context}
							**Message:** ${log.message.length > 20 ? `${log.message.slice(0, 20)}..` : log.message}
						`;
					})
					.join("\n"),
			);

		message.channel.send({ embed: logsEmbed });
	}
};