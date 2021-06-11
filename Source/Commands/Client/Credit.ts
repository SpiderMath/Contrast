import { Message } from "discord.js";
import BaseCommand from "../../Base/BaseCommand";
import ContrastingClient from "../../Base/Client";

export default class CreditCommand extends BaseCommand {
	constructor(client: ContrastingClient) {
		super(client, {
			name: "credit",
			aliases: ["credits"],
			description: "Shows the credits for a command",
			minArgs: 1,
		});
	}

	async run(message: Message, args: string[]) {
		const command = this.client.commands.get(args[0]);
		if(!command) return message.channel.send(`${this.client.emotes.error} Couldn't find ${args[0]}`);
		const credits = command.credits.map((credit, index) => `${index + 1}. ${credit.URL ? `[${credit.name}](${credit.URL})` : `${credit.name}`} (${credit.reasonURL ? `${credit.reason}` : `[${credit.reason}](${credit.reasonURL})`})`).join("\n");

		const creditsEmbed = this.client.embed(message.author)
			.setTitle(`Credits for ${command.name}`)
			.setDescription(credits);

		this.client.sendEmbed(message, creditsEmbed);
	}
};