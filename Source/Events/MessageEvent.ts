import { Collection, Message, TextChannel } from "discord.js";
import BaseEvent from "../Base/BaseEvent";
import ContrastingClient from "../Base/Client";

const cooldowns: Collection<string, number> = new Collection();

export default class MessageEvent extends BaseEvent {
	constructor(client: ContrastingClient) {
		super("message", client);
	}

	async run(message: Message) {
		if(message.author.bot) return;

		let prefix: string;

		for(const pref of this.client.prefixes) {
			if(message.content.toLowerCase().startsWith(pref.toLowerCase())) {
				prefix = pref;
				break;
			}
		}

		// @ts-ignore
		if(!prefix) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const commandName = args.shift()?.toLowerCase();

		// @ts-ignore
		const command = this.client.commands.get(commandName);

		if(!command) return;

		if(command.guildOnly && !message.guild) return message.channel.send(`${this.client.emotes.error} This command can only be run in a server`);

		// @ts-ignore
		if(command.nsfw) if(!message.guild || !message.channel.nsfw) return message.channel.send(`${this.client.emotes.error} This command can only be run in a NSFW Channel`);

		if(command.devOnly && !this.client.devs.has(message.author.id)) return message.channel.send(`${this.client.emotes.error} This command is developer only.`);

		if(command.minArgs !== 0 && !args[command.minArgs - 1]) return message.channel.send(`${this.client.emotes.error} Expected ${command.minArgs} arguments, received ${args.length}`);

		for(const perm of command.clientPermissions) {
			if(!message.guild) break;

			// @ts-ignore
			const permissions = (message.channel as TextChannel).permissionsFor(message.guild.me);

			if(!permissions.has(perm)) return message.channel.send(`${this.client.emotes.error} The bot is missing the permission ${perm} to run this command!`);
		}

		for(const perm of command.userPermissions) {
			if(!message.guild) break;

			const permissions = (message.channel as TextChannel).permissionsFor(message.author);

			if(!permissions?.has(perm)) return message.channel.send(`${this.client.emotes.error} You need ${perm} permission to execute this command!`);
		}

		const now = Date.now();
		const timestamp = cooldowns.get(`${message.author.id}-${command.name}`);

		if(timestamp) {
			const timeElapsed = timestamp - now;

			if(timeElapsed < (command.cooldown * 1000)) return message.channel.send(`${this.client.emotes.error} Please wait for ${(timeElapsed / 1000).toFixed(2)} seconds before trying \`${command.name}\` again.`);
		}

		cooldowns.set(`${message.author.id}-${command.name}`, now);
		setTimeout(() => cooldowns.delete(`${message.author.id}-${command.name}`), command.cooldown * 1000);

		try {
			await command.run(message, args);
		}
		catch(err) {
			console.log("something happened");
		}
	}
};