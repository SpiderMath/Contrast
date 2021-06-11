import { Message } from "discord.js";
import { join } from "path";
import BaseCommand from "../../Base/BaseCommand";
import ContrastingClient from "../../Base/Client";
import { Log } from "../../Base/Logger";

export default class ViewLogCommand extends BaseCommand {
	constructor(client: ContrastingClient) {
		super(client, {
			name: "viewlog",
			devOnly: true,
			description: "View a log with ID",
			aliases: ["view-log"],
			minArgs: 1,
		});
	}

	async run(message: Message, args: string[]) {
		if(isNaN(Number(args[0])) || Number(args[0]) <= 0) return message.channel.send(`${this.client.emotes.error} Invalid ID provided`);

		const log = (this.client.loadJSON(join(__dirname, "../../../Server/Logs.json")) as Log[]).filter(l => l.id === Number(args[0]))[0];

		if(!log) {
			return this.client.sendEmbed(
				message,
				this.client.embed(message.author, "RED")
					.setDescription(`Log with ID: ${Number(args[0])} not found`),
			);
		}

		const logEmbed = this.client.embed(message.author)
			.setTitle(`Log ID: ${log.id}`)
			.addField("Timestamp", log.timestamp)
			.addField("Context", log.context)
			.addField("Message", log.message);

		switch (log.type) {
		case "error":
			logEmbed
				.setColor("RED");
		case "info":
			logEmbed
				.setColor("BLUE");
		case "success":
			logEmbed
				.setColor("GREEN");
		case "warn":
			logEmbed
				.setColor("YELLOW");
		}

		this.client.sendEmbed(message, logEmbed);
	}
};