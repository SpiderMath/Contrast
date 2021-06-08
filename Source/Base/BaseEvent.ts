import { ClientEvents } from "discord.js";
import ContrastingClient from "./Client";

abstract class BaseEvent {
	public name: keyof ClientEvents;
	public client: ContrastingClient;

	constructor(name: keyof ClientEvents, client: ContrastingClient) {
		this.client = client;
		this.name = name;

		Object.defineProperty(
			this,
			"client",
			{
				enumerable: false,
				configurable: true,
				writable: true,
			},
		);
	}

	// eslint-disable-next-line
	abstract run(...args: any[]): Promise<any>
};

export default BaseEvent;