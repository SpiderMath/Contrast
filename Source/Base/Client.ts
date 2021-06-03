import { Client, ClientOptions } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

class GasperClient extends Client {
	constructor(clientConfig?: ClientOptions) {
		super(clientConfig);
	}

	start(config: any) {
		this._loadCommands(config.commandDir);
		this._loadEvents(config.eventDir);
	}

	private _loadCommands(commandDir: string) {
		readdirSync(commandDir)
			.forEach(dir => {
				const files = readdirSync(join(commandDir, dir));

				for(const file of files) {
					console.log(file);
				}
			});
	}

	private _loadEvents(eventDir: string) {
		readdirSync(eventDir)
			.forEach(async file => {
				const pseudoPull = await import(join(eventDir, file));
				const pull = pseudoPull.default;

				console.log(pull);
			});
	}
};

export default GasperClient;