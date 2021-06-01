import { Message } from "discord.js";
import GasperClient from "../Classes/Client";
import ReactIfAble from "../Helpers/ReactIfAble";

export default function AutoReactOnMention(message: Message, client: GasperClient) {
	// @ts-ignore
	if(!message.mentions.has(message.client.user)) return;

	const userCooldown = client.autoReactOnMentionCooldown.get(message.author.id);
	const now = Date.now();

	if(!userCooldown) {
		client.autoReactOnMentionCooldown.set(message.author.id, Date.now());
		setTimeout(() => client.autoReactOnMentionCooldown.delete(message.author.id), 3000);
	}
	else {
		const timeElapsed = now - userCooldown;

		if(timeElapsed < 3000) return;
	}
	ReactIfAble(message, "👀");
};