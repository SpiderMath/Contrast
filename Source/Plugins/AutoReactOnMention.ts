import { Message } from "discord.js";
import ReactIfAble from "../Helpers/ReactIfAble";

export default function AutoReactOnMention(message: Message) {
	// @ts-ignore
	if(!message.mentions.has(message.client.user)) return;

	ReactIfAble(message, "👀");
};