import { Message } from "discord.js";

export default function ReactIfAble(message: Message, emoji: string) {
	// @ts-ignore
	if(message.guild && !message.channel.permissionsFor(message.client.user).has("ADD_REACTIONS")) return;

	message.react(emoji);
}